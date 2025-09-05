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
