import { QuotesIcon } from "@phosphor-icons/react";

const QuotesArray = [
    "We carry on as if our experience has meaning — as if our activities have transcendent value—but we are unable to justify this belief intellectually",
    "'Men have forgotten this truth,' said the fox. 'But you must not forget it. You become responsible, forever, for what you have tamed. You are responsible for your rose...'",
    "Having a romantic partner who reacts actively and constructively to your good fortune is actually more conducive to a happy marriage than having a partner who can soothe you in the bad times.",
]

export const Quotes = () => {
    return (
        <div className="opacity-50 rounded-xl playfair-display-500 py-4 px-2 w-full">
            <div className="float-left pr-4 pt-4 flex items-center justify-center">
                <QuotesIcon size={40} />
            </div>
            <h1 className="text-2xl font-bold italic">
                {QuotesArray[Math.floor(Math.random() * QuotesArray.length)]}
            </h1>
        </div>
    )
}