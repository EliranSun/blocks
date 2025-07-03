import {
    SmileyIcon,
    BrainIcon,
    MaskHappyIcon,
    BookOpenIcon,
    HeartBreakIcon,
    PencilLineIcon,
    PaintBrushIcon,
    FilmSlateIcon,
    GameControllerIcon,
    HeartIcon,
    GlobeIcon,
    HouseIcon,
    TShirtIcon,
    CookingPotIcon,
    ShoppingCartIcon,
    BedIcon,
    FirstAidKitIcon,
    BarbellIcon,
    UsersIcon,
    UsersThreeIcon,
    UsersFourIcon,
    ScrollIcon,
    EyeIcon,
    SmileyXEyesIcon,
    WineIcon,
    PersonIcon,
    GiftIcon
} from "@phosphor-icons/react";

export const Calendars = [
    {
        name: "mood",
        icon: SmileyIcon,
        colors: [
            { className: "bg-amber-500", name: "great" },
            { className: "bg-orange-600", name: "good" },
            { className: "bg-red-700", name: "ok" },
            { className: "bg-blue-800", name: "bad" },
            { className: "bg-purple-900", name: "awful" },
        ]
    },
    {
        name: "REM",
        icon: BrainIcon,
        colors: [
            { className: "bg-blue-50", name: "0" },
            { className: "bg-blue-100", name: "30" },
            { className: "bg-blue-300", name: "100" },
            { className: "bg-blue-500", name: "130" },
            { className: "bg-blue-700", name: "200" },
            { className: "bg-blue-950", name: "230" },
        ]
    },
    {
        name: "Deep",
        icon: PersonIcon,
        colors: [
            { className: "bg-indigo-50", name: "0" },
            { className: "bg-indigo-100", name: "15" },
            { className: "bg-indigo-300", name: "30" },
            { className: "bg-indigo-500", name: "45" },
            { className: "bg-indigo-700", name: "100" },
            { className: "bg-indigo-950", name: "115" },
        ]
    },
    {
        name: "css",
        isGamified: true,
        icon: MaskHappyIcon,
        colors: [{ className: "bg-amber-500" }],
    },
    {
        name: "read",
        isGamified: true,
        icon: BookOpenIcon,
        colors: [{ className: "bg-green-500" }],
    },
    {
        name: "loneliness",
        icon: HeartBreakIcon,
        colors: [
            { className: "bg-cyan-100", name: "lonely" },
            { className: "bg-cyan-300", name: "neutral" },
            { className: "bg-cyan-500", name: "belong" },
            { className: "bg-sky-500", name: "giving" },
        ]
    },
    {
        name: "write",
        icon: PencilLineIcon,
        colors: [{ className: "bg-green-500" }],
    },
    {
        name: "draw",
        icon: PaintBrushIcon,
        colors: [{ className: "bg-green-500" }],
    },
    {
        name: "cinema",
        icon: FilmSlateIcon,
        colors: [{ className: "bg-green-500" }],
    },
    {
        name: "games",
        icon: GameControllerIcon,
        colors: [{ className: "bg-green-500" }],
    },
    {
        name: "date",
        icon: WineIcon,
        colors: [{ className: "bg-purple-500" }],
    },
    {
        name: "sex",
        icon: HeartIcon,
        colors: [{ className: "bg-purple-500" }],
    },
    {
        name: "trip",
        icon: GlobeIcon,
        colors: [{ className: "bg-purple-500" }],
    },
    {
        name: "gestures",
        icon: GiftIcon,
        colors: [{ className: "bg-purple-500" }],
    },
    {
        name: "house",
        icon: HouseIcon,
        colors: [
            { className: "bg-red-500", name: "floor" },
            { className: "bg-orange-500", name: "clean" },
            { className: "bg-yellow-500", name: "towels" },
            { className: "bg-green-500", name: "organize" },
            { className: "bg-blue-500", name: "dishes" },
        ]
    },
    {
        name: "laundry",
        icon: TShirtIcon,
        colors: [
            { className: "bg-blue-500", name: "wash" },
            { className: "bg-green-500", name: "dry" },
            { className: "bg-red-500", name: "fold" },
            { className: "bg-purple-500", name: "all" },
        ],
    },
    {
        name: "cooking",
        icon: CookingPotIcon,
        colors: [{ className: "bg-orange-500" }],
    },
    {
        name: "groceries",
        icon: ShoppingCartIcon,
        colors: [{ className: "bg-emerald-500" }],
    },
    {
        name: "sheets",
        icon: BedIcon,
        colors: [{ className: "bg-blue-500" }],
    },
    {
        name: "physiotherapy",
        icon: FirstAidKitIcon,
        colors: [
            { className: "bg-red-200", name: "knee" },
            { className: "bg-red-500", name: "ankle" },
            { className: "bg-red-700", name: "all" },
        ],
    },
    {
        name: "workout",
        icon: BarbellIcon,
        colors: [
            { className: "bg-red-500", name: "power" },
            { className: "bg-orange-500", name: "cardio" },
            { className: "bg-yellow-500", name: "yoga" },
        ],
    },
    {
        name: "Friends",
        icon: UsersIcon,
        colors: [
            { className: "bg-purple-500", name: "maya" },
            { className: "bg-pink-500", name: "rotem" },
            { className: "bg-red-500", name: "nimrod" },
            { className: "bg-orange-500", name: "ofir" },
        ]
    },
    {
        name: "family",
        icon: UsersThreeIcon,
        colors: [
            { className: "bg-pink-400", name: "mom" },
            { className: "bg-blue-500", name: "dad" },
            { className: "bg-red-400", name: "grandma" },
            { className: "bg-violet-400", name: "modav" },
        ]
    },
    {
        name: "sibs",
        icon: UsersFourIcon,
        colors: [
            { className: "bg-purple-400", name: "sahar" },
            { className: "bg-pink-300", name: "shachar" },
            { className: "bg-green-400", name: "ofek" },
            { className: "bg-blue-600", name: "or" },
            { className: "bg-indigo-500", name: "yahel" },
        ]
    },
    {
        name: "scroll",
        icon: ScrollIcon,
        colors: [{ className: "bg-yellow-900" }],
    },
    {
        name: "pron/mast",
        icon: EyeIcon,
        colors: [
            { className: "bg-orange-900", name: "pron" },
            { className: "bg-red-900", name: "mast" },
        ],
    },
    {
        name: "lie",
        icon: SmileyXEyesIcon,
        colors: [{ className: "bg-lime-900" }],
    }
];
