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
    UsersThreeIcon,
    UsersFourIcon,
    ScrollIcon,
    EyeIcon,
    SmileyXEyesIcon,
    WineIcon,
    PersonIcon,
    GiftIcon,
    ScalesIcon,
    BeerSteinIcon,
    TreeIcon,
    SunIcon
} from "@phosphor-icons/react";

export const Calendars = [
    {
        name: "mood",
        icon: SmileyIcon,
        cols: 2,
        colors: [
            { colorClassName: "text-amber-500", className: "bg-amber-500", name: "great" },
            { colorClassName: "text-orange-600", className: "bg-orange-600", name: "good" },
            { colorClassName: "text-red-700", className: "bg-red-700", name: "ok" },
            { colorClassName: "text-blue-800", className: "bg-blue-800", name: "bad" },
            { colorClassName: "text-purple-900", className: "bg-purple-900", name: "awful" },
        ]
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
        name: "Weight",
        icon: ScalesIcon,
        colors: [
            { className: "bg-green-400", name: "70" },
            { className: "bg-lime-400", name: "71" },
            { className: "bg-yellow-400", name: "72" },
            { className: "bg-amber-400", name: "73" },
            { className: "bg-orange-400", name: "74" },
            { className: "bg-orange-500", name: "75" },
            { className: "bg-red-400", name: "76" },
            { className: "bg-red-500", name: "77" },
            { className: "bg-red-600", name: "78" }
        ]
    },
    {
        name: "physiotherapy",
        icon: FirstAidKitIcon,
        showTimeAgo: true,
        colors: [
            { className: "bg-pink-400", name: "SS" },
            { className: "bg-orange-400", name: "WS" },
            { className: "bg-yellow-400", name: "plank" },
            { className: "bg-green-400", name: "D&C" },
            { className: "bg-purple-400", name: "combo" },
            { className: "bg-purple-600", name: "all" },
        ],
    },
    {
        name: "workout",
        icon: BarbellIcon,
        showTimeAgo: true,
        colors: [
            { className: "bg-red-500", name: "power" },
            { className: "bg-orange-500", name: "cardio" },
            { className: "bg-yellow-500", name: "yoga" },
        ],
    },
    {
        name: "css",
        cols: 2,
        isGamified: true,
        primaryColor: "amber",
        icon: MaskHappyIcon,
        colors: [{ className: "bg-amber-500" }],
    },
    {
        name: "read",
        primaryColor: "green",
        isGamified: true,
        icon: BookOpenIcon,
        colors: [{ className: "bg-green-500" }],
    },

    {
        name: "write",
        icon: PencilLineIcon,
        showTimeAgo: true,
        colors: [{ className: "bg-green-500" }],
    },
    {
        name: "draw",
        icon: PaintBrushIcon,
        showTimeAgo: true,
        colors: [{ className: "bg-green-500" }],
    },
    {
        name: "cinema",
        icon: FilmSlateIcon,
        showTimeAgo: true,
        colors: [{ className: "bg-green-500" }],
    },
    {
        name: "games",
        icon: GameControllerIcon,
        showTimeAgo: true,
        colors: [{ className: "bg-green-500" }],
    },
    {
        name: "date",
        icon: WineIcon,
        showTimeAgo: true,
        colors: [{ className: "bg-purple-500" }],
    },
    {
        name: "sex",
        icon: HeartIcon,
        showTimeAgo: true,
        colors: [{ className: "bg-purple-500" }],
    },
    {
        name: "trip",
        icon: GlobeIcon,
        showTimeAgo: true,
        colors: [{ className: "bg-purple-500" }],
    },
    {
        name: "gestures",
        cols: 3,
        icon: GiftIcon,
        showTimeAgo: true,
        colors: [{ className: "bg-purple-500" }],
    },
    {
        name: "house",
        icon: HouseIcon,
        showTimeAgo: true,
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
        showTimeAgo: true,
        colors: [
            { className: "bg-blue-500", name: "wash" },
            { className: "bg-green-500", name: "dry" },
            { className: "bg-red-500", name: "fold" },
            { className: "bg-purple-500", name: "all" },
        ],
    },
    {
        name: "groceries",
        icon: ShoppingCartIcon,
        showTimeAgo: true,
        colors: [{ className: "bg-emerald-500" }],
    },
    {
        name: "cooking",
        cols: 2,
        icon: CookingPotIcon,
        showTimeAgo: true,
        colors: [{ className: "bg-orange-500" }],
    },
    {
        name: "sheets",
        icon: BedIcon,
        showTimeAgo: true,
        colors: [{ className: "bg-blue-500" }],
    },
    {
        name: "Friends",
        icon: BeerSteinIcon,
        showTimeAgo: true,
        colors: [
            { className: "bg-purple-500", name: "maya" },
            { className: "bg-pink-500", name: "rotem" },
            { className: "bg-red-500", name: "nimrod" },
            { className: "bg-orange-500", name: "ofir" },
        ]
    },
    {
        name: "family",
        icon: TreeIcon,
        showTimeAgo: true,
        colors: [
            { className: "bg-pink-400", name: "mom" },
            { className: "bg-blue-500", name: "dad" },
            { className: "bg-red-400", name: "grandma" },
            { className: "bg-violet-400", name: "modav" },
        ]
    },
    {
        name: "sibs",
        icon: SunIcon,
        showTimeAgo: true,
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
        showTimeAgo: true,
        colors: [{ className: "bg-yellow-900" }],
    },
    {
        name: "pron/mast",
        icon: EyeIcon,
        showTimeAgo: true,
        colors: [
            { className: "bg-orange-900", name: "pron" },
            { className: "bg-red-900", name: "mast" },
        ],
    },
    {
        name: "lie",
        icon: SmileyXEyesIcon,
        showTimeAgo: true,
        colors: [{ className: "bg-lime-900" }],
    }
];
export const Categories = [
    {
        name: "Health",
        calendars: Calendars.slice(0, 7),
    },
    {
        name: "Creative",
        calendars: Calendars.slice(7, 13),
    },
    {
        name: "Wife",
        calendars: Calendars.slice(13, 17),
    },
    {
        name: "House",
        calendars: Calendars.slice(17, 22),
    },
    {
        name: "Social",
        calendars: Calendars.slice(22, 25),
    },
    {
        name: "Avoid",
        calendars: Calendars.slice(25, 28),
    }
];
