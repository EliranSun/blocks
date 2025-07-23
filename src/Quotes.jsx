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
];

export const Quotes = () => {
    const quote = useMemo(() => {
        return QuotesArray[Math.floor(Math.random() * QuotesArray.length)];
    }, []);

    return (
        <div className="opacity-40 merriweather-500 px-2 text-2xl font-bold italic">
            <span className="text-2xl pr-2">❝</span>
            {quote}
            <span className="text-2xl pl-2">❞</span>
        </div>
    )
}
