import { useMemo } from "react";

const QuotesArray = [
    "We carry on as if our experience has meaning — as if our activities have transcendent value—but we are unable to justify this belief intellectually",
    "'Men have forgotten this truth,' said the fox. 'But you must not forget it. You become responsible, forever, for what you have tamed. You are responsible for your rose...'",
    "Having a romantic partner who reacts actively and constructively to your good fortune is actually more conducive to a happy marriage than having a partner who can soothe you in the bad times.",
    "The known is explored territory, a place of stability and familiarity; it is the “city of God”",
    "In every man, of course, a demon lies hidden—the demon of rage, the demon of lustful heat at the screams of the tortured victim, the demon of lawlessness let off the chain, the demon of diseases that follow on vice, gout, kidney disease, and so on.",
    "As a general rule, people, even the wicked, are much more naïve and simple-hearted than we suppose. And we ourselves are, too.",
    "Idealization of the partner not only helps sustain love, it also lessens the likelihood of divorce. [...] It may mean focusing on the still beautiful smile instead of the cellulite or the thinning hair, or recognizing the way he shows his love by scraping the ice off your car, even if he could be better at using words to express his feelings.",
    "She thought that being entirely on her own would be just what she needed. In fact, what she needed was not less social connection, but connection that felt more meaningful—a level of connection that matched her genetically biased predisposition.",
    "...It's touching to know that there's no sin in them, for all, all except man, is sinless, and Christ has been with them before us. [...] It cannot but be so, since the Word is for all. All creation and all creatures, every leaf is striving to the Word, singing glory to God, weeping to Christ, unconsciously accomplishing this by the mystery of their sinless life.”",
    "God is the voice that tells Abraham: The call of adventure will be a blessing to yourself. That is the meaning of life. It's a reason to get up in the morning, even if you're in pain.",
    "At some point you got to decide if you are serious about things. If you are doing something of sufficiant worth - you let go of the things that interfere with it.",
    "In his fervent prayer he did not beseech God to lighten his darkness but only thirsted for the joyous emotion, which always visited his sould after the praise aboration, of which his evening prayer usually consisted. That joy always brough him light untroubled sleep.",
    "When Mrs. Lincoln and others spoke harshly of the southern people, Lincoln replied: “Don’t criticize them; they are just what we would be under similar circumstances.",
    "There you are; human nature in action, wrongdoers, blaming everybody but themselves. We are all like that.",
    "Criticism is futile because it puts a person on the defensive and usually makes him strive to justify himself.",
    "If that laudable soldier's exploit was so very great there would have been no sin in it if he had on such an emergency renounced, so to speak, the name of Christ and his own christening, to save by that same his life, for good deeds, by which, in the course of years to expiate his cowardice.",
    "When he realizes that he is not only worse than others, but that he is responsible to all men for all and everything, for all human sins, national and individual, only then the aim of our seclusion is attained. For know, dear ones, that every one of us is undoubtedly responsible for all men and everything on earth, not merely through the general sinfulness of creation, but each one personally for all mankind and every individual man. This knowledge is the crown of life for the monk and for every man.",
    "For our children—not your children, but ours—the children of the poor gentlemen looked down upon by every one—know what justice means, sir, even at nine years old. How should the rich know? They don't explore such depths once in their lives. But at that moment in the square when he kissed his hand, at that moment my Ilusha had grasped all that justice means",
    "After this cruel analysis the learned of this world have nothing left of all that was sacred of old. But they have only analyzed the parts and overlooked the whole, and indeed their blindness is marvelous. Yet the whole still stands steadfast before their eyes, and the gates of hell shall not prevail against it. Has it not lasted nineteen centuries, is it not still a living, a moving power in the individual soul and in the masses of people?",
    "Addiction, so they say, lies at the sharp edge of procrastination.",
    "Put simply, we engage in self-defeating behaviors because, on some level, we believe they help us. My OCD is a kind of coping mechanism. Lounging in front of the screen and drinking wine on a dry day is a pause from productivity laced with self-reproach. Snow days, train strikes, and pandemic lockdowns give us permission to let ourselves off the hook without punishment—even when we still feel resistance.",
    "They will let them go for six days, and six weeks, and sometimes sixty years without giving them the hearty appreciation that they crave almost as much as they crave food",
    "We provide them with roast beef and potatoes to build energy, but we neglect to give them kind words of appreciation that would sing in their memories for years like the music of the morning stars.",
    "The next time you enjoy filet mignon at the club, send word to the chef that it was excellently prepared, and when a tired salesperson shows you unusual courtesy, please mention it.",
    "Try leaving a friendly trail of little sparks of gratitude on your daily trips. You will be surprised how they will set small flames of friendship that will be rose beacons on your next visit.",
    "I shall pass this way but once; any good, therefore, that I can do or any kindness that I can show to any human being, let me do it now. Let me not defer nor neglect it, for I shall not pass this way again.",
    "Be “hearty in your approbation and lavish in your praise,” and people will cherish your words and treasure them and repeat them over a lifetime – repeat them years after you have forgotten them.",
    "So the only way on earth to influence other people is to talk about what they want and show them how to get it.",
    "Thinking also and more fundamentally is specification of value, specification of implication for behavior.",
    "All those who know the rules, and accept them, can play the game—without fighting over the rules of the game. This makes for peace, stability, and potential prosperity—a good game.",
    "The Way is specifically the “way of the valley,” the direction taken by humility, self-effacement, and the kind of relaxation, or non-action, that makes all action effective",
    "Emotion provides us with an initial guide when we don't know what we are doing",
    "Fear is the a priori position, the natural response to everything for which no structure of behavioral adaptation has been designed and inculcated",
    "Behavior is imitated, then abstracted into play, formalized into drama and story, crystallized into myth and codified into religion - action, imitation, play, ritual, drama, narrative, myth, religion, philosophy, rationality",
    "It is certainly not uncommon for the same 'stimulus' to possess competing valences. Otherwise, as I said before, we would never have to think",
    "A good story has a universal quality, which means that it speaks a language we all understand. Any universally comprehensible language must have universal referents, and this means that a good",
    "A good story must speak to us about those aspects of experience that we all share.",
    "We are all, in consequence, imitating a story that we don't understand",
    "A good theory about the structure of myth should let you see how a story you couldn't even understand previously might shed new and useful light on the meaning of your life.",
    "Secure territory is that place where we know how to act.",
    "The unknown is yang, cold, dark and feminine; the known, yin, warm, bright and masculine; the knower is the man living in Tao, on the razor's edge, on the straight and narrow path, on the proper road",
    "The question of the proper ordering of those forces (“who, or what, should rule?”) is the central problem of morality, and the primary problem facing human individuals and social organizations",
    "Everything unknown is simultaneously horrifying and promising; it is courage and genius (and the grace of God) that determines which aspect dominates.",
    "Every explorer is therefore, by necessity, a revolutionary—and every successful revolutionary is a peacemaker.",
    "The hero, product of divine parentage and miraculous birth, survivor of a dangerous childhood, faces the Terrible Mother in single combat and is devoured. He is swallowed by a great fish, or snake, or whale.",
    "Spirit is thus elevated over dogma.",
    "It is more frequently the case that it manifests itself as a struggle between “beliefs.” In the latter case, it loss of faith, rather than life, that determines the outcome of the battle.",
    "Genuine myths are capable of representing the totality of conflicting forces",
    "Successful transition from childhood to adolescence means identification with the group, rather than continued dependency upon the parents.",
    "Our capacity for abstraction is capable of disrupting our “unconscious”—that is, imagistic and procedural—social identity, upsetting our emotional stability, and undermining our integrity. Such disruption leaves us vulnerable to possession by simplistic ideologies, and susceptible to cynicism, existential despair, and weakness in the face of threat.",
    "Our tendency to personally identify with our respective countries, say—to foster and be proud of our patriotism—reflects “knowledge” that our personal integrity and security is integrally bound up, for better or worse, with the destiny of our cultures.",
    "To those who have sold their souls to the group, however, the Word is indistinguishable from the enemy",
    "In an age of disintegration that mixes races indiscriminately, human beings have in their bodies the heritage of multiple origins, that is, opposite, and often not merely opposite, drives and value standards that fight each other and rarely permit each other any rest. Such human beings of late cultures and refracted lights will on the average be weaker human beings: their most profound desire is that the war they are should come to an end.",
    "Identification of an individual with a group means that individual psychological stability is staked on maintenance of group welfare.",
    "As long as I do not know the reason why, I cannot do anything.",
    "morality: description of unbearable present, ideal future and means of transformation",
    "This means that it is primarily those persons who have sold their soul to the group who cannot distinguish between the hero and the dragon of chaos (between the hero and the environmental disaster, the death of the king, the dangerous stranger or the heretical idea).",
    "“Not doing” is therefore the simplest and most common lie: the individual can just “not act,” “not investigate,” and the pitfalls of error will remain unmanifest, at least temporarily.",
    "The fascist wants to crush everything different, and then everything; the decadent immolates himself, and builds the fascist from his ashes",
    "Ideally, the hero character tends toward harmonious balance between tradition and adaptation, and the needs of self and other. It is the constant attempt to accurately represent such character that constitutes the “aim” of the stories of humanity.",
    "Narrative provides semantic description of action in image, back-translatable into imaginary episodic events, capable of eliciting imitative behavior. Mythic narrative offers dramatic presentation of morality, which is the study of what should be",
    "Life without law remains chaotic, affectively intolerable. Life that is pure law becomes sterile, equally unbearable. The domination of chaos or sterility equally breeds murderous resentment and hatred.",
    "Law provides the borders that limit chaos",
    "What principle is rule of spirit, rather than law, predicated upon? Respect for the innately heroic nature of man.",
    "Science is predicated upon the axiomatic presupposition that it is worthwhile to analyze the material or collectively apprehensible sensory world and its transformations.",
    "Face what you reject, accept what you refuse to acknowledge, and you will find the treasure that the dragon guards.",
    "Where is what you most want to be found? Where you are least likely to look.",
    "Their devoted concentration upon the nature of this problem set in motion fantasies associated with the archetype of the way, which always emerges of its own accord, when individuals face their limitations and come into contact with the unknown.",
    "The mask each person wears in society is based upon the pretence that the individual is identical with his culture",
    "After all, dedication to an ideal necessitates development of self-discipline",
    "Acting out, slaying dragons, stepping and comforting unknowns - requires ordered subjective state",
    "The “eternal child” in man is an indescribable experience, an incongruity, a handicap, and a divine prerogative; an imponderable that determines the ultimate worth or worthlessness of a personality.",
    "Myths of redemption had true power when they were incorporated, and acted out, rather than believed",
    "Sufficient expression meant the attempt to live out the myth of the hero, within the confines of individual personality",
    "Who can argue with a Solzhenitsyn when he states: “One man who stops lying can bring down a tyranny”?",
    "You see, it is true that people don't want the truth, because the truth destroys what lack of faith erects, and the false comfort it contains",
    "It is not the pursuit of empirical truth, however, that has wreaked havoc upon the Christian worldview. It is confusion of empirical fact with moral truth that has proved of great detriment to the latter",
    "The most dangerous lie of all is devoted to denial of individual responsibility—denial of individual divinity.",
    "positive affect can be generated through contact with novelty, in the absence of any conditioning whatsover",
    "The phenomenon of meaning occurs when information can be translated from one “level” of memory to another, or to all others.",
    "Each individual, constitutionally unique, finds meaning in different pursuits, if he has the courage to maintain his difference",
    "To the extent that the emotions become organized, they emerge as regulations whose final form of equilibrium is none other than the will"


];

export const Quotes = () => {
    const quote = useMemo(() => {
        // Use the current day of the month to select a quote deterministically
        const today = new Date();
        // Day of month is 1-31, so subtract 1 for 0-based index
        const index = today.getDate() % QuotesArray.length;
        return QuotesArray[index];
    }, []);

    return (
        <div className="opacity-40 merriweather-500 px-2 text-2xl font-bold italic">
            <span className="text-2xl pr-2">❝</span>
            {quote}
            <span className="text-2xl pl-2">❞</span>
        </div>
    )
}
