#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CALENDAR_PATH = process.argv[2] || '/root/.claude/uploads/049383d2-f0b2-4806-939d-fd1e73c3eb7a/f52f73ef-calendardata20251023.json';
const BACKUP_PATH   = process.argv[3] || '/root/.claude/uploads/049383d2-f0b2-4806-939d-fd1e73c3eb7a/11674f4e-tagjournalbackup20260601.json';
const OUT_PATH      = process.argv[4] || path.join(__dirname, 'tagjournal-merged.json');

const DATE_RE = /^(\d{4}-\d{2}-\d{2})$/;
const KEY_RE = /^(.*)_(\d{4}-\d{2}-\d{2})$/;

// Habit -> tag config
// shape: { tag, group, levels? }  OR  { byIndex: [{tag, group}, ...] } for things like `mood`
const HABITS = {
  mood:          { byIndex: [{tag:'Great',group:'Mood'},{tag:'Good',group:'Mood'},{tag:'OK',group:'Mood'},{tag:'Bad',group:'Mood'},{tag:'Awful',group:'Mood'}] },
  giving:        { tag:'Giving',         group:'Mood' },
  loneliness:    { tag:'Loneliness',     group:'Mood',      levels:['lonely','neutral','belong','giving'] },
  REM:           { tag:'REM',            group:'Health',    levels:['0m','30m','100m','130m','200m','230m'] },
  Deep:          { tag:'Deep',           group:'Health',    levels:['0m','15m','30m','45m','100m','115m'] },
  Weight:        { tag:'Weight',         group:'Health',    levels:['70kg','71kg','72kg','73kg','74kg','75kg','76kg','77kg','78kg'] },
  keto:          { tag:'Keto',           group:'Health' },
  'no snore':    { tag:'No snore',       group:'Health',    levels:['no snore','a little','a lot'] },
  physiotherapy: { tag:'Physiotherapy',  group:'Health',    levels:['Pita','SS','WS','plank','D&C','combo','all','Hand'] },
  workout:       { tag:'Workout',        group:'Health',    levels:['power','cardio','yoga'] },
  css:           { tag:'CSS',            group:'Creative' },
  read:          { tag:'Read',           group:'Creative' },
  write:         { tag:'Write',          group:'Creative' },
  draw:          { tag:'Draw',           group:'Creative' },
  cinema:        { tag:'Cinema',         group:'Creative', levels:['TV','Movie'] },
  games:         { tag:'Games',          group:'Creative' },
  date:          { tag:'Date',           group:'Wife' },
  sex:           { tag:'Sex',            group:'Wife' },
  trip:          { tag:'Trip',           group:'Wife' },
  gestures:      { tag:'Gestures',       group:'Wife' },
  house:         { tag:'House',          group:'Household', levels:['floor','clean','towels','organize','dishes'] },
  laundry:       { tag:'Laundry',        group:'Household', levels:['wash','dry','fold','all'] },
  groceries:     { tag:'Groceries',      group:'Household' },
  cooking:       { tag:'Cook',           group:'Household' },
  sheets:        { tag:'Sheets',         group:'Household', levels:['sheets','pillows'] },
  Dad:           { tag:'Dad',            group:'Family' },
  Mom:           { tag:'Mom',            group:'Family' },
  Grandma:       { tag:'Grandma',        group:'Family' },
  grandpa:       { tag:'Grandpa',        group:'Family' },
  Or:            { tag:'Or',             group:'Family' },
  Sahar:         { tag:'Sahar',          group:'Family' },
  Shachar:       { tag:'Shachar',        group:'Family' },
  Ofek:          { tag:'Ofek',           group:'Family' },
  Yahel:         { tag:'Yahel',          group:'Family' },
  Modav:         { tag:'Modav',          group:'Family' },
  Rotem:         { tag:'Rotem',          group:'Family' },
  Shirly:        { tag:'Shirly',         group:'Family' },
  Maya:          { tag:'Maya',           group:'Friends' },
  Ofir:          { tag:'Ofir',           group:'Friends' },
  David:         { tag:'David',          group:'Friends' },
  Julia:         { tag:'Julia',          group:'Friends' },
  Friends:       { tag:'Friends',        group:'Friends', levels:['maya','rotem','nimrod','ofir','david'] },
  sibs:          { tag:'Sibs',           group:'Family',  levels:['sahar','shachar','ofek','or','yahel'] },
  lie:           { tag:'Lie',            group:'Avoid' },
  scroll:        { tag:'Scroll',         group:'Avoid' },
  'pron/mast':   { tag:'Porn',           group:'Avoid',   levels:['pron','mast','abstain'] },
  abstain:       { tag:'Abstain',        group:'Avoid' },
};

const TAG_GROUP_FROM_PREFIX = {
  wife: 'Wife',
  social: 'Friends',
  health: 'Health',
  house: 'Household',
  creative: 'Creative',
  avoid: 'Avoid',
};

const CATEGORY_ORDER = ['Mood','Health','Wife','Creative','Family','Friends','Household','Avoid'];

function newId(existing) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  while (true) {
    let id = '';
    for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
    if (!existing.has(id)) { existing.add(id); return id; }
  }
}

function main() {
  const calendar = JSON.parse(fs.readFileSync(CALENDAR_PATH, 'utf8'));
  const backup   = JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf8'));

  const out = JSON.parse(JSON.stringify(backup));
  out.logs  = out.logs  || {};
  out.tags  = out.tags  || [];
  out.groups = out.groups || [];
  out.usage = out.usage || {};

  // ---- index existing
  const idSet = new Set(out.tags.map(t => t.id).concat(out.groups.map(g => g.id)));
  const groupByName = new Map();
  for (const g of out.groups) groupByName.set(g.name.toLowerCase(), g);
  // ensure all referenced groups exist
  const defaultGroupColors = {
    Mood:'#e5484d', Health:'#2fa56a', Wife:'#6e56cf', Creative:'#f76b15',
    Family:'#4f7cf7', Friends:'#c9a800', Household:'#0d9aa8', Avoid:'#889098',
  };
  function ensureGroup(name) {
    const k = name.toLowerCase();
    if (groupByName.has(k)) return groupByName.get(k);
    const g = { id: newId(idSet), name, color: defaultGroupColors[name] || '#888888' };
    out.groups.push(g);
    groupByName.set(k, g);
    return g;
  }
  for (const n of CATEGORY_ORDER) ensureGroup(n);

  const tagByKey = new Map(); // groupId|lowercaseName -> tag
  for (const t of out.tags) tagByKey.set(t.groupId + '|' + t.name.toLowerCase(), t);
  // also a name->tag map for cross-group reuse when group is wrong/ambiguous
  const tagByName = new Map();
  for (const t of out.tags) if (!tagByName.has(t.name.toLowerCase())) tagByName.set(t.name.toLowerCase(), t);

  function ensureTag(name, groupName) {
    const group = ensureGroup(groupName);
    const k = group.id + '|' + name.toLowerCase();
    if (tagByKey.has(k)) return tagByKey.get(k);
    // reuse by name if exists in another group
    if (tagByName.has(name.toLowerCase())) return tagByName.get(name.toLowerCase());
    const t = { id: newId(idSet), name, groupId: group.id };
    out.tags.push(t);
    tagByKey.set(k, t);
    tagByName.set(name.toLowerCase(), t);
    return t;
  }

  // ---- parse calendar
  const thoughts = {};   // date -> [text...]
  const tagArrays = {};  // date -> [{group, names}]
  const habits = {};     // date -> [{habit, value}]

  for (const [key, rawValue] of Object.entries(calendar.data || {})) {
    const m = key.match(KEY_RE);
    if (!m) continue;
    const prefix = m[1];
    const date = m[2];
    if (!DATE_RE.test(date)) continue;
    const value = typeof rawValue === 'string' ? rawValue : String(rawValue);

    if (prefix.startsWith('thought_')) {
      const cat = prefix.slice('thought_'.length);
      if (value && value.trim() !== '') {
        (thoughts[date] = thoughts[date] || []).push({ category: cat, text: value });
      }
      continue;
    }
    const tagsMatch = prefix.match(/^(wife|social|health|house|creative|avoid)_tags$/);
    if (tagsMatch) {
      let arr;
      try { arr = JSON.parse(value); } catch { arr = null; }
      if (Array.isArray(arr) && arr.length) {
        (tagArrays[date] = tagArrays[date] || []).push({ group: TAG_GROUP_FROM_PREFIX[tagsMatch[1]], names: arr });
      }
      continue;
    }
    if (value === '-1' || value === -1) continue; // skipped entries
    (habits[date] = habits[date] || []).push({ habit: prefix, value });
  }

  // ---- emit
  const allDates = new Set([
    ...Object.keys(thoughts),
    ...Object.keys(tagArrays),
    ...Object.keys(habits),
  ]);

  for (const date of allDates) {
    const dayTags = []; // { tag, levelText? }

    // habits
    for (const { habit, value } of habits[date] || []) {
      const cfg = HABITS[habit];
      if (!cfg) continue;
      const idx = parseInt(value, 10);
      if (cfg.byIndex) {
        const choice = cfg.byIndex[idx];
        if (!choice) continue;
        const t = ensureTag(choice.tag, choice.group);
        dayTags.push({ tag: t });
      } else {
        const t = ensureTag(cfg.tag, cfg.group);
        let levelText = null;
        if (cfg.levels && !Number.isNaN(idx) && cfg.levels[idx] !== undefined) {
          levelText = cfg.levels[idx];
        }
        dayTags.push({ tag: t, levelText });
      }
    }

    // _tags_ arrays
    for (const { group, names } of tagArrays[date] || []) {
      for (const n of names) {
        if (typeof n !== 'string' || !n.trim()) continue;
        const t = ensureTag(n.trim(), group);
        dayTags.push({ tag: t });
      }
    }

    // de-dupe by tag id (keep first, prefer one with levelText if any)
    const seen = new Map();
    for (const e of dayTags) {
      const prev = seen.get(e.tag.id);
      if (!prev) seen.set(e.tag.id, e);
      else if (!prev.levelText && e.levelText) seen.set(e.tag.id, e);
    }
    const dedup = [...seen.values()];

    // sort tags by group order
    const groupIndex = new Map(CATEGORY_ORDER.map((n, i) => [ensureGroup(n).id, i]));
    dedup.sort((a, b) => {
      const ai = groupIndex.has(a.tag.groupId) ? groupIndex.get(a.tag.groupId) : 999;
      const bi = groupIndex.has(b.tag.groupId) ? groupIndex.get(b.tag.groupId) : 999;
      if (ai !== bi) return ai - bi;
      return a.tag.name.localeCompare(b.tag.name);
    });

    // build tag string
    const tagStr = dedup
      .map(e => '@' + e.tag.name + (e.levelText ? ' ' + e.levelText : ''))
      .join(' ');

    // thought text
    const thoughtText = (thoughts[date] || []).map(t => t.text).join('\n\n').trim();

    // compose log
    const existingLog = out.logs[date] ? String(out.logs[date]).trim() : '';
    const parts = [];
    if (existingLog) parts.push(existingLog);
    if (thoughtText) parts.push(thoughtText);
    if (tagStr) parts.push(tagStr);
    const composed = parts.join('\n\n');
    if (composed) out.logs[date] = composed;

    // usage
    if (dedup.length) {
      const u = out.usage[date] = out.usage[date] || {};
      for (const e of dedup) {
        u[e.tag.id] = (u[e.tag.id] || 0) + 1;
      }
    }
  }

  out.exportedAt = new Date().toISOString();

  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2));

  // ---- summary
  const newTags = out.tags.length - backup.tags.length;
  const newGroups = out.groups.length - backup.groups.length;
  const newLogDates = Object.keys(out.logs).length - Object.keys(backup.logs || {}).length;
  console.log(`Wrote ${OUT_PATH}`);
  console.log(`  groups: ${backup.groups.length} -> ${out.groups.length} (+${newGroups})`);
  console.log(`  tags:   ${backup.tags.length} -> ${out.tags.length} (+${newTags})`);
  console.log(`  logs:   ${Object.keys(backup.logs||{}).length} -> ${Object.keys(out.logs).length} (+${newLogDates})`);
  console.log(`  usage dates: ${Object.keys(out.usage).length}`);
}

main();
