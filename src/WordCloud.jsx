import { useMemo } from "react";
import classNames from "classnames";

const getThoughtsFromStorage = () => {
    return Object.keys(localStorage)
        .filter(key => key.includes("thought_"))
        .map(key => localStorage.getItem(key))
        .filter(Boolean);
};

const analyzeWords = (thoughts) => {
    const allText = thoughts.join(" ").toLowerCase();

    // Remove punctuation and split into words
    const words = allText
        .replace(/[^\w\s]/g, " ")
        .split(/\s+/)
        .filter(word => word.length > 2) // Filter out very short words
        .filter(word => ![
            // Articles & Determiners
            "a", "an", "the", "this", "that", "these", "those", "each", "every", "any", "some", "all",

            // Pronouns
            "i", "me", "my", "mine", "we", "us", "our", "ours", "you", "your", "yours",
            "he", "him", "his", "she", "her", "hers", "it", "its", "they", "them", "their", "theirs",

            // Common Verbs (to be, to have, modals, etc.)
            "am", "is", "are", "was", "were", "be", "being", "been",
            "have", "has", "had", "having", "do", "does", "did", "doing", "done",
            "can", "could", "may", "might", "will", "would", "shall", "should", "must",

            // Prepositions
            "about", "above", "across", "after", "against", "along", "among", "around", "as", "at",
            "before", "behind", "below", "beneath", "beside", "between", "by", "down", "during",
            "for", "from", "in", "into", "near", "of", "off", "on", "onto", "out", "over",
            "through", "to", "under", "up", "upon", "with", "within", "without",

            // Conjunctions & Connectors
            "and", "but", "or", "nor", "so", "yet", "because", "since", "although", "though",
            "while", "whereas", "if", "unless", "until", "when", "whenever", "where", "wherever",
            "however", "therefore", "thus", "hence", "moreover", "furthermore", "nevertheless",

            // Question Words
            "what", "when", "where", "why", "how", "who", "whom", "whose", "which",

            // Common Adverbs
            "very", "really", "quite", "pretty", "fairly", "rather", "somewhat", "mostly",
            "nearly", "almost", "hardly", "barely", "only", "also", "too", "even", "still",
            "yet", "already", "again", "back", "away", "here", "there", "now", "then",
            "just", "more", "most", "less", "least", "much", "many", "few", "little",

            // Common Verbs (action/movement/perception)
            "go", "goes", "going", "went", "gone", "come", "comes", "coming", "came",
            "get", "gets", "getting", "got", "gotten", "take", "takes", "taking", "took", "taken",
            "make", "makes", "making", "made", "see", "sees", "seeing", "saw", "seen",
            "look", "looks", "looking", "looked", "say", "says", "saying", "said",
            "tell", "tells", "telling", "told", "think", "thinks", "thinking", "thought",
            "know", "knows", "knowing", "knew", "known", "want", "wants", "wanting", "wanted",
            "feel", "feels", "feeling", "felt", "seem", "seems", "seeming", "seemed",
            "become", "becomes", "becoming", "became", "try", "tries", "trying", "tried",

            // Numbers & Quantity
            "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
            "first", "second", "third", "last", "next", "another", "other", "others",

            // Time-related (generic)
            "day", "time", "year", "today", "tomorrow", "yesterday", "morning", "afternoon", "evening",

            // Common Adjectives (vague/filler)
            "good", "bad", "great", "big", "small", "large", "little", "old", "new", "young",
            "long", "short", "high", "low", "right", "wrong", "same", "different", "easy", "hard",

            // Other Common Words
            "well", "sure", "okay", "yes", "no", "maybe", "perhaps", "probably", "definitely",
            "actually", "basically", "literally", "totally", "completely", "absolutely",
            "thing", "things", "stuff", "way", "ways", "part", "parts", "place", "places",
            "people", "person", "man", "woman", "boy", "girl", "kind", "type", "sort"
        ].includes(word)); // Filter out common stop words

    const wordCount = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    return Object.entries(wordCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 50); // Top 50 words
};

const analyzePhrases = (thoughts) => {
    const phraseCount = {};

    thoughts.forEach(thought => {
        const text = thought.toLowerCase().replace(/[^\w\s]/g, " ");
        const words = text.split(/\s+/).filter(word => word.length > 2);

        // Generate 2-word and 3-word phrases
        for (let i = 0; i < words.length - 1; i++) {
            const twoWordPhrase = words.slice(i, i + 2).join(" ");
            if (twoWordPhrase.length > 5) {
                phraseCount[twoWordPhrase] = (phraseCount[twoWordPhrase] || 0) + 1;
            }

            if (i < words.length - 2) {
                const threeWordPhrase = words.slice(i, i + 3).join(" ");
                if (threeWordPhrase.length > 8) {
                    phraseCount[threeWordPhrase] = (phraseCount[threeWordPhrase] || 0) + 1;
                }
            }
        }
    });

    return Object.entries(phraseCount)
        .filter(([, count]) => count > 1) // Only show phrases that appear more than once
        .sort(([, a], [, b]) => b - a)
        .slice(0, 30); // Top 30 phrases
};

export const WordCloud = () => {
    const thoughts = useMemo(() => getThoughtsFromStorage(), []);
    const words = useMemo(() => analyzeWords(thoughts), [thoughts]);
    const phrases = useMemo(() => analyzePhrases(thoughts), [thoughts]);

    const getWordSize = (count, maxCount) => {
        const ratio = count / maxCount;
        if (ratio > 0.8) return "text-4xl";
        if (ratio > 0.6) return "text-3xl";
        if (ratio > 0.4) return "text-2xl";
        if (ratio > 0.2) return "text-xl";
        return "text-lg";
    };

    const getWordColor = (count, maxCount) => {
        const ratio = count / maxCount;
        if (ratio > 0.8) return "text-amber-600 dark:text-amber-400";
        if (ratio > 0.6) return "text-orange-600 dark:text-orange-400";
        if (ratio > 0.4) return "text-red-600 dark:text-red-400";
        if (ratio > 0.2) return "text-purple-600 dark:text-purple-400";
        return "text-blue-600 dark:text-blue-400";
    };

    const maxWordCount = words.length > 0 ? words[0][1] : 1;
    const maxPhraseCount = phrases.length > 0 ? phrases[0][1] : 1;

    if (thoughts.length === 0) {
        return (
            <div className="merriweather-500 flex flex-col items-center justify-center h-64 text-gray-500">
                <p className="text-xl">No thoughts found</p>
                <p className="text-sm mt-2">Start adding some thoughts to see your word cloud!</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold merriweather-500 mb-2">Word Cloud</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Analyzing {thoughts.length} thoughts
                </p>
            </div>

            <div>
                <div className="flex flex-wrap gap-3 justify-center">
                    {words.map(([word, count]) => (
                        <span
                            key={word}
                            className={classNames(
                                "font-medium merriweather-500 transition-all duration-200 hover:scale-110 cursor-default",
                                getWordSize(count, maxWordCount),
                                getWordColor(count, maxWordCount)
                            )}
                            title={`"${word}" appears ${count} times`}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </div>

            {phrases.length > 0 && (
                <div>
                    <h3 className="text-2xl font-semibold mb-4 merriweather-500">Popular Phrases</h3>
                    <div className="space-y-2">
                        {phrases.map(([phrase, count]) => (
                            <div
                                key={phrase}
                                className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                <span className="font-medium">{phrase}</span>
                                <span className={classNames(
                                    "px-2 py-1 rounded-full text-sm",
                                    getWordColor(count, maxPhraseCount),
                                    "bg-white dark:bg-gray-900"
                                )}>
                                    {count}x
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="text-center text-sm text-gray-500 mt-8">
                <p>Words and phrases are ranked by frequency</p>
                <p>Common stop words are filtered out</p>
            </div>
        </div>
    );
}; 