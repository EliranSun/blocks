import { QuotesIcon } from "@phosphor-icons/react";

const QuotesArray = [
    "We carry on as if our experience has meaning — as if our activities have transcendent value—but we are unable to justify this belief intellectually",
    "Having a romantic partner who reacts actively and constructively to your good fortune is actually more conducive to a happy marriage than having a partner who can soothe you in the bad times."
]

export const Quotes = () => {
    return (
        <div className="bg-white opacity-70 rounded-xl playfair-display-500 p-4 w-full">
            <div className="float-left mr-4 mb-0">
                <QuotesIcon size={60} />
            </div>
            <h1 className="text-2xl font-bold italic tracking-wide leading-tight">
                {QuotesArray[Math.floor(Math.random() * QuotesArray.length)]}
            </h1>
        </div>
    )
}