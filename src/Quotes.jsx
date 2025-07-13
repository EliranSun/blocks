import { QuotesIcon } from "@phosphor-icons/react";
import { useMemo } from "react";

const QuotesArray = [
    "We carry on as if our experience has meaning — as if our activities have transcendent value—but we are unable to justify this belief intellectually",
    "'Men have forgotten this truth,' said the fox. 'But you must not forget it. You become responsible, forever, for what you have tamed. You are responsible for your rose...'",
    "Having a romantic partner who reacts actively and constructively to your good fortune is actually more conducive to a happy marriage than having a partner who can soothe you in the bad times.",
    "The known is explored territory, a place of stability and familiarity; it is the “city of God,”",
    "In every man, of course, a demon lies hidden—the demon of rage, the demon of lustful heat at the screams of the tortured victim, the demon of lawlessness let off the chain, the demon of diseases that follow on vice, gout, kidney disease, and so on.",
    "As a general rule, people, even the wicked, are much more naïve and simple-hearted than we suppose. And we ourselves are, too.",
    "A thirteen-year study of marriages showed that idealization of the partner not only helps sustain love, it also lessens the likelihood of divorce. [...] It may mean focusing on the still beautiful smile instead of the cellulite or the thinning hair, or recognizing the way he shows his love by scraping the ice off your car, even if he could be better at using words to express his feelings.",
    "She thought that being entirely on her own would be just what she needed. In fact, what she needed was not less social connection, but connection that felt more meaningful—a level of connection that matched her genetically biased predisposition.",
    "It's touching to know that there's no sin in them, for all, all except man, is sinless, and Christ has been with them before us. [...] It cannot but be so, since the Word is for all. All creation and all creatures, every leaf is striving to the Word, singing glory to God, weeping to Christ, unconsciously accomplishing this by the mystery of their sinless life. ”"
];

export const Quotes = () => {
    const quote = useMemo(() => {
        return QuotesArray[Math.floor(Math.random() * QuotesArray.length)];
    }, []);

    return (
        <div className="opacity-50 rounded-xl merriweather-500 py-4 px-2 space-y-2
        flex flex-col items-center justify-between">
            <QuotesIcon size={50} style={{ transform: "scaleX(-1)" }} />
            <h1 className="text-2xl font-bold italic text-justify">
                {quote}
            </h1>
        </div>
    )
}