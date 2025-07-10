import { QuotesIcon } from "@phosphor-icons/react";
import { useMemo } from "react";

const QuotesArray = [
    "We carry on as if our experience has meaning — as if our activities have transcendent value—but we are unable to justify this belief intellectually",
    "'Men have forgotten this truth,' said the fox. 'But you must not forget it. You become responsible, forever, for what you have tamed. You are responsible for your rose...'",
    "Having a romantic partner who reacts actively and constructively to your good fortune is actually more conducive to a happy marriage than having a partner who can soothe you in the bad times.",
    "The known is explored territory, a place of stability and familiarity; it is the “city of God,”",
    "In every man, of course, a demon lies hidden—the demon of rage, the demon of lustful heat at the screams of the tortured victim, the demon of lawlessness let off the chain, the demon of diseases that follow on vice, gout, kidney disease, and so on.",
    "As a general rule, people, even the wicked, are much more naïve and simple-hearted than we suppose. And we ourselves are, too.",
];

export const Quotes = () => {
    const quote = useMemo(() => {
        return QuotesArray[Math.floor(Math.random() * QuotesArray.length)];
    }, []);

    return (
        <div className="opacity-50 rounded-xl merriweather-500 py-4 px-2 w-full">
            <div className="float-left pr-4 pt-4 flex items-center justify-center">
                <QuotesIcon size={40} style={{ transform: "scaleX(-1)" }} />
            </div>
            <h1 className="text-2xl font-bold italic">
                {quote}
            </h1>
        </div>
    )
}