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
    SunIcon,
    FishSimpleIcon,
    SpeakerSlashIcon,
} from "@phosphor-icons/react";

export const CategoryNames = {
    MOOD: "mood",
    HEALTH: "health",
    CREATIVE: "creative",
    WIFE: "wife",
    HOUSE: "house",
    SOCIAL: "social",
    AVOID: "avoid"
};

export const Calendars = [
    {
        name: "mood",
        icon: SmileyIcon,
        cols: 3,
        category: CategoryNames.MOOD,
        colors: [
            { colorClassName: "text-amber-500", className: "bg-amber-500", name: "great" },
            { colorClassName: "text-orange-600", className: "bg-orange-600", name: "good" },
            { isDark: true, colorClassName: "text-red-700", className: "bg-red-700", name: "ok" },
            { isDark: true, colorClassName: "text-blue-800", className: "bg-blue-800", name: "bad" },
            { isDark: true, colorClassName: "text-purple-900", className: "bg-purple-900", name: "awful" },
        ]
    },
    {
        name: "loneliness",
        icon: HeartBreakIcon,
        cols: 3,
        category: CategoryNames.MOOD,
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
        category: CategoryNames.HEALTH,
        colors: [
            { className: "bg-blue-50", name: "0" },
            { className: "bg-blue-100", name: "30" },
            { className: "bg-blue-300", name: "100" },
            { className: "bg-blue-500", name: "130" },
            { isDark: true, className: "bg-blue-700", name: "200" },
            { isDark: true, className: "bg-blue-950", name: "230" },
        ]
    },
    {
        name: "Deep",
        icon: PersonIcon,
        category: CategoryNames.HEALTH,
        colors: [
            { className: "bg-indigo-50", name: "0" },
            { className: "bg-indigo-100", name: "15" },
            { className: "bg-indigo-300", name: "30" },
            { className: "bg-indigo-500", name: "45" },
            { isDark: true, className: "bg-indigo-700", name: "100" },
            { isDark: true, className: "bg-indigo-950", name: "115" },
        ]
    },
    {
        name: "Weight",
        icon: ScalesIcon,
        category: CategoryNames.HEALTH,
        colors: [
            { className: "bg-pink-400", name: "70" },
            { className: "bg-purple-400", name: "71" },
            { className: "bg-indigo-400", name: "72" },
            { className: "bg-sky-400", name: "73" },
            { className: "bg-teal-400", name: "74" },
            { className: "bg-green-400", name: "75" },
            { className: "bg-lime-400", name: "76" },
            { className: "bg-amber-400", name: "77" },
            { className: "bg-red-400", name: "78" }
        ]
    },
    {
        name: "keto",
        icon: FishSimpleIcon,
        showTimeAgo: true,
        isGamified: true,
        primaryColor: "red",
        category: CategoryNames.HEALTH,
        colors: [
            { className: "bg-red-500" }
        ],
    },
    {
        name: "no snore",
        icon: SpeakerSlashIcon,
        showTimeAgo: true,
        isGamified: true,
        category: CategoryNames.HEALTH,
        primaryColor: "red",
        colors: [
            { className: "bg-green-500", name: "no snore" },
            { className: "bg-yellow-500", name: "a little snore" },
            { className: "bg-red-500", name: "a lot snore" }
        ],
    },
    {
        name: "physiotherapy",
        icon: FirstAidKitIcon,
        showTimeAgo: true,
        category: CategoryNames.HEALTH,
        colors: [
            { className: "bg-red-500", name: "Pita" },
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
        category: CategoryNames.HEALTH,
        colors: [
            { className: "bg-red-500", name: "power" },
            { className: "bg-orange-500", name: "cardio" },
            { className: "bg-yellow-500", name: "yoga" },
        ],
    },
    {
        name: "css",
        cols: 3,
        isGamified: true,
        primaryColor: "amber",
        icon: MaskHappyIcon,
        category: CategoryNames.CREATIVE,
        colors: [{ className: "bg-amber-500" }],
    },
    {
        name: "read",
        primaryColor: "green",
        cols: 2,
        isGamified: true,
        category: CategoryNames.CREATIVE,
        icon: BookOpenIcon,
        colors: [{ className: "bg-green-500" }],
    },

    {
        name: "write",
        icon: PencilLineIcon,
        category: CategoryNames.CREATIVE,
        showTimeAgo: true,
        colors: [{ className: "bg-green-500" }],
    },
    {
        name: "draw",
        icon: PaintBrushIcon,
        category: CategoryNames.CREATIVE,
        showTimeAgo: true,
        colors: [{ className: "bg-green-500" }],
    },
    {
        name: "cinema",
        icon: FilmSlateIcon,
        category: CategoryNames.CREATIVE,
        showTimeAgo: true,
        colors: [{ className: "bg-green-500" }],
    },
    {
        name: "games",
        icon: GameControllerIcon,
        category: CategoryNames.CREATIVE,
        showTimeAgo: true,
        colors: [{ className: "bg-green-500" }],
    },
    {
        name: "date",
        icon: WineIcon,
        category: CategoryNames.WIFE,
        showTimeAgo: true,
        colors: [{ className: "bg-purple-500" }],
    },
    {
        name: "sex",
        icon: HeartIcon,
        category: CategoryNames.WIFE,
        showTimeAgo: true,
        colors: [{ className: "bg-purple-500" }],
    },
    {
        name: "trip",
        category: CategoryNames.WIFE,
        icon: GlobeIcon,
        showTimeAgo: true,
        colors: [{ className: "bg-purple-500" }],
    },
    {
        name: "gestures",
        cols: 3,
        icon: GiftIcon,
        category: CategoryNames.WIFE,
        showTimeAgo: true,
        colors: [{ className: "bg-purple-500" }],
    },
    {
        name: "house",
        icon: HouseIcon,
        category: CategoryNames.HOUSE,
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
        category: CategoryNames.HOUSE,
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
        category: CategoryNames.HOUSE,
        colors: [{ className: "bg-emerald-500" }],
    },
    {
        name: "cooking",
        cols: 2,
        icon: CookingPotIcon,
        category: CategoryNames.HOUSE,
        showTimeAgo: true,
        colors: [{ className: "bg-orange-500" }],
    },
    {
        name: "sheets",
        icon: BedIcon,
        category: CategoryNames.HOUSE,
        showTimeAgo: true,
        colors: [{ className: "bg-blue-500" }],
    },
    {
        name: "Friends",
        icon: BeerSteinIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { className: "bg-purple-500", name: "maya" },
            { className: "bg-pink-500", name: "rotem" },
            { className: "bg-red-500", name: "nimrod" },
            { className: "bg-orange-500", name: "ofir" },
            { className: "bg-cyan-500", name: "david" },
        ]
    },
    {
        name: "Shirly",
        icon: BeerSteinIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { className: "bg-cyan-500" },
        ]
    },
    {
        name: "family",
        icon: TreeIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
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
        category: CategoryNames.SOCIAL,
        colors: [
            { className: "bg-purple-400", name: "sahar" },
            { className: "bg-pink-300", name: "shachar" },
            { className: "bg-green-400", name: "ofek" },
            { className: "bg-blue-600", name: "or" },
            { className: "bg-indigo-500", name: "yahel" },
        ]
    },
    {
        name: "abstain",
        icon: EyeIcon,
        showTimeAgo: true,
        category: CategoryNames.AVOID,
        cols: 3,
        colors: [
            { className: "bg-green-400" },
        ],
    },
    {
        name: "pron/mast",
        icon: EyeIcon,
        showTimeAgo: true,
        category: CategoryNames.AVOID,
        cols: 3,
        colors: [
            { className: "bg-orange-600", name: "pron" },
            { className: "bg-red-600", name: "mast" },
        ],
    },
    {
        name: "lie",
        icon: SmileyXEyesIcon,
        cols: 2,
        showTimeAgo: true,
        category: CategoryNames.AVOID,
        colors: [{ className: "bg-lime-600" }],
    },
    {
        name: "scroll",
        icon: ScrollIcon,
        showTimeAgo: true,
        category: CategoryNames.AVOID,
        colors: [{ className: "bg-yellow-600" }],
    },
];

export const Categories = [
    {
        name: "Mood",
        calendars: Calendars.filter(item => item.category === CategoryNames.MOOD)
    },
    {
        name: "Health",
        calendars: Calendars.filter(item => item.category === CategoryNames.HEALTH)
    },
    {
        name: "Creative",
        calendars: Calendars.filter(item => item.category === CategoryNames.CREATIVE)
    },
    {
        name: "Wife",
        calendars: Calendars.filter(item => item.category === CategoryNames.WIFE)
    },
    {
        name: "House",
        calendars: Calendars.filter(item => item.category === CategoryNames.HOUSE)
    },
    {
        name: "Social",
        calendars: Calendars.filter(item => item.category === CategoryNames.SOCIAL)
    },
    {
        name: "Avoid",
        calendars: Calendars.filter(item => item.category === CategoryNames.AVOID)
    }
];
export const Views = {
    HOME: "home",
    HABITS: "habits",
    NOTES: "notes",
    CALENDAR: "calendar",
    WORDCLOUD: "wordcloud",
    SETTINGS: "settings",
    ATLY: "atly",
};
