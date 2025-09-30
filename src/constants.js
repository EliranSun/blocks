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
    HeartHalfIcon,
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

export const Colors = {
    AMBER: "amber",
    ORANGE: "orange",
    RED: "red",
    BLUE: "blue",
    PURPLE: "purple",
    CYAN: "cyan",
    GREEN: "green",
    LIME: "lime",
    TEAL: "teal",
    INDIGO: "indigo",
    SKY: "sky",
    VIOLET: "violet",
    PINK: "pink",
    EMERALD: "emerald",
    YELLOW: "yellow",
    GRAY: "gray",
    NEUTRAL: "neutral",
    STONE: "stone",
}

export const Calendars = [
    {
        name: "mood",
        icon: SmileyIcon,
        cols: 3,
        category: CategoryNames.MOOD,
        colors: [
            { color: Colors.AMBER, name: "great" },
            { color: Colors.ORANGE, name: "good" },
            { isDark: true, color: Colors.RED, name: "ok" },
            { isDark: true, color: Colors.BLUE, name: "bad" },
            { isDark: true, color: Colors.PURPLE, name: "awful" },
        ]
    },
    {
        name: "giving",
        icon: HeartHalfIcon,
        cols: 1,
        showTimeAgo: true,
        isHidden: true,
        category: CategoryNames.MOOD,
        colors: [
            { color: Colors.CYAN },
        ]
    },
    {
        name: "loneliness",
        icon: HeartBreakIcon,
        cols: 1,
        isHidden: true,
        category: CategoryNames.MOOD,
        colors: [
            { color: Colors.CYAN, name: "lonely" },
            { color: Colors.CYAN, name: "neutral" },
            { color: Colors.CYAN, name: "belong" },
            { color: Colors.SKY, name: "giving" },
        ]
    },
    {
        name: "REM",
        icon: BrainIcon,
        isHidden: true,
        category: CategoryNames.HEALTH,
        colors: [
            { color: Colors.BLUE, name: "0" },
            { color: Colors.BLUE, name: "30" },
            { color: Colors.BLUE, name: "100" },
            { color: Colors.BLUE, name: "130" },
            { isDark: true, color: Colors.BLUE, name: "200" },
            { isDark: true, color: Colors.BLUE, name: "230" },
        ]
    },
    {
        name: "Deep",
        icon: PersonIcon,
        isHidden: true,
        category: CategoryNames.HEALTH,
        colors: [
            { color: Colors.INDIGO, name: "0" },
            { color: Colors.INDIGO, name: "15" },
            { color: Colors.INDIGO, name: "30" },
            { color: Colors.INDIGO, name: "45" },
            { isDark: true, color: Colors.INDIGO, name: "100" },
            { isDark: true, color: Colors.INDIGO, name: "115" },
        ]
    },
    {
        name: "Weight",
        icon: ScalesIcon,
        cols: 1,
        isHidden: false,
        category: CategoryNames.HEALTH,
        colors: [
            { color: Colors.PINK, name: "70" },
            { color: Colors.PURPLE, name: "71" },
            { color: Colors.INDIGO, name: "72" },
            { color: Colors.SKY, name: "73" },
            { color: Colors.TEAL, name: "74" },
            { color: Colors.GREEN, name: "75" },
            { color: Colors.LIME, name: "76" },
            { color: Colors.AMBER, name: "77" },
            { color: Colors.RED, name: "78" }
        ]
    },
    {
        name: "keto",
        icon: FishSimpleIcon,
        showTimeAgo: true,
        isGamified: true,
        isHidden: true,
        primaryColor: "red",
        category: CategoryNames.HEALTH,
        colors: [
            { color: Colors.RED }
        ],
    },
    {
        name: "no snore",
        icon: SpeakerSlashIcon,
        showTimeAgo: true,
        isGamified: true,
        isHidden: true,
        category: CategoryNames.HEALTH,
        primaryColor: "red",
        colors: [
            { color: Colors.GREEN, name: "no snore" },
            { color: Colors.YELLOW, name: "a little snore" },
            { color: Colors.RED, name: "a lot snore" }
        ],
    },
    {
        name: "physiotherapy",
        icon: FirstAidKitIcon,
        showTimeAgo: true,
        isGamified: true,
        category: CategoryNames.HEALTH,
        description:
            "3min pita" +
            "\n3 cats " +
            "\n3 dogs " +
            "\n30s sit squat " +
            "\n30s hero pose (sit)" +
            "\n30s plank " +
            "\n30s wall squat " +
            "\n30s deadhang ",
        colors: [
            { color: Colors.RED, name: "Pita" },
            { color: Colors.PINK, name: "SS" },
            { color: Colors.ORANGE, name: "WS" },
            { color: Colors.YELLOW, name: "plank" },
            { color: Colors.GREEN, name: "D&C" },
            { color: Colors.PURPLE, name: "combo" },
            { color: Colors.PURPLE, name: "all" },
            { color: Colors.CYAN, name: "Hand" },
        ],
    },
    {
        name: "workout",
        icon: BarbellIcon,
        showTimeAgo: true,
        isGamified: false,
        category: CategoryNames.HEALTH,
        colors: [
            { color: Colors.RED, name: "power" },
            { color: Colors.ORANGE, name: "cardio" },
            { color: Colors.YELLOW, name: "yoga" },
        ],
    },
    {
        name: "css",
        cols: 2,
        isGamified: true,
        primaryColor: "amber",
        icon: MaskHappyIcon,
        category: CategoryNames.CREATIVE,
        colors: [{ color: Colors.AMBER }],
    },
    {
        name: "read",
        primaryColor: "green",
        cols: 1,
        isGamified: true,
        category: CategoryNames.CREATIVE,
        icon: BookOpenIcon,
        colors: [{ color: Colors.GREEN }],
    },

    {
        name: "write",
        icon: PencilLineIcon,
        category: CategoryNames.CREATIVE,
        showTimeAgo: true,
        colors: [{ color: Colors.GREEN }],
    },
    {
        name: "draw",
        icon: PaintBrushIcon,
        category: CategoryNames.CREATIVE,
        showTimeAgo: true,
        colors: [{ color: Colors.GREEN }],
    },
    {
        name: "cinema",
        icon: FilmSlateIcon,
        category: CategoryNames.CREATIVE,
        showTimeAgo: true,
        colors: [
            { color: Colors.GREEN, name: "TV" },
            { color: Colors.PURPLE, name: "Movie" },
        ],
    },
    {
        name: "games",
        icon: GameControllerIcon,
        category: CategoryNames.CREATIVE,
        showTimeAgo: true,
        colors: [{ color: Colors.GREEN }],
    },
    {
        name: "date",
        icon: WineIcon,
        category: CategoryNames.WIFE,
        showTimeAgo: true,
        colors: [{ color: Colors.PURPLE }],
    },
    {
        name: "sex",
        icon: HeartIcon,
        category: CategoryNames.WIFE,
        showTimeAgo: true,
        colors: [{ color: Colors.PURPLE }],
    },
    {
        name: "trip",
        category: CategoryNames.WIFE,
        icon: GlobeIcon,
        showTimeAgo: true,
        colors: [{ color: Colors.PURPLE }],
    },
    {
        name: "gestures",
        cols: 2,
        icon: GiftIcon,
        category: CategoryNames.WIFE,
        showTimeAgo: true,
        colors: [{ color: Colors.PURPLE }],
    },
    {
        name: "house",
        icon: HouseIcon,
        category: CategoryNames.HOUSE,
        showTimeAgo: true,
        colors: [
            { color: Colors.RED, name: "floor" },
            { color: Colors.ORANGE, name: "clean" },
            { color: Colors.YELLOW, name: "towels" },
            { color: Colors.GREEN, name: "organize" },
            { color: Colors.BLUE, name: "dishes" },
        ]
    },
    {
        name: "laundry",
        icon: TShirtIcon,
        category: CategoryNames.HOUSE,
        showTimeAgo: true,
        colors: [
            { color: Colors.BLUE, name: "wash" },
            { color: Colors.GREEN, name: "dry" },
            { color: Colors.RED, name: "fold" },
            { color: Colors.PURPLE, name: "all" },
        ],
    },
    {
        name: "groceries",
        icon: ShoppingCartIcon,
        showTimeAgo: true,
        category: CategoryNames.HOUSE,
        colors: [{ color: Colors.EMERALD }],
    },
    {
        name: "cooking",
        cols: 2,
        icon: CookingPotIcon,
        category: CategoryNames.HOUSE,
        showTimeAgo: true,
        colors: [{ color: Colors.ORANGE }],
    },
    {
        name: "sheets",
        icon: BedIcon,
        category: CategoryNames.HOUSE,
        showTimeAgo: true,
        colors: [
            { color: Colors.BLUE, name: "sheets" },
            { color: Colors.ORANGE, name: "pillows" }
        ],
    },
    {
        name: "Friends",
        icon: BeerSteinIcon,
        showTimeAgo: true,
        isHidden: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.PURPLE, name: "maya" },
            { color: Colors.PINK, name: "rotem" },
            { color: Colors.RED, name: "nimrod" },
            { color: Colors.ORANGE, name: "ofir" },
            { color: Colors.CYAN, name: "david" },
        ]
    },
    {
        name: "Ofir",
        icon: BeerSteinIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.CYAN },
        ]
    },
    {
        name: "David",
        icon: BeerSteinIcon,
        showTimeAgo: true,
        cols: 2,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.CYAN },
        ]
    },
    {
        name: "Maya",
        icon: BeerSteinIcon,
        showTimeAgo: true,
        cols: 1,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.CYAN },
        ]
    },

    {
        name: "Shirly",
        icon: BeerSteinIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.CYAN },
        ]
    },
    {
        name: "Rotem",
        icon: BeerSteinIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.CYAN },
        ]
    },
    {
        name: "family",
        icon: TreeIcon,
        showTimeAgo: true,
        isHidden: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.PINK, name: "mom" },
            { color: Colors.BLUE, name: "dad" },
            { color: Colors.RED, name: "grandma" },
            { color: Colors.VIOLET, name: "modav" },
        ]
    },
    {
        name: "Mom",
        icon: TreeIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.RED }
        ]
    },
    {
        name: "Dad",
        icon: TreeIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.RED }
        ]
    },
    {
        name: "Grandma",
        icon: TreeIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.RED }
        ]
    },
    {
        name: "grandpa",
        icon: TreeIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.RED }
        ]
    },
    {
        name: "Modav",
        icon: TreeIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.RED }
        ]
    },
    {
        name: "sibs",
        icon: SunIcon,
        showTimeAgo: true,
        isHidden: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.PURPLE, name: "sahar" },
            { color: Colors.PINK, name: "shachar" },
            { color: Colors.GREEN, name: "ofek" },
            { color: Colors.BLUE, name: "or" },
            { color: Colors.INDIGO, name: "yahel" },
        ]
    },

    {
        name: "Or",
        icon: SunIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.AMBER }
        ]
    },
    {
        name: "Sahar",
        icon: SunIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.AMBER }
        ]
    },
    {
        name: "Shachar",
        icon: SunIcon,
        showTimeAgo: true,
        cols: 1,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.AMBER }
        ]
    },
    {
        name: "Ofek",
        icon: SunIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.AMBER }
        ]
    },
    {
        name: "Yahel",
        icon: SunIcon,
        showTimeAgo: true,
        category: CategoryNames.SOCIAL,
        colors: [
            { color: Colors.AMBER }
        ]
    },
    // {
    //     name: "abstain",
    //     icon: EyeIcon,
    //     showTimeAgo: true,
    //     category: CategoryNames.AVOID,
    //     cols: 3,
    //     colors: [
    //         { className: "bg-green-400" },
    //     ],
    // },
    {
        name: "lie",
        icon: SmileyXEyesIcon,
        cols: 1,
        showTimeAgo: true,
        category: CategoryNames.AVOID,
        colors: [{ color: Colors.LIME }],
    },
    {
        name: "scroll",
        icon: ScrollIcon,
        showTimeAgo: true,
        category: CategoryNames.AVOID,
        colors: [{ color: Colors.YELLOW }],
    },
    {
        name: "pron/mast",
        icon: EyeIcon,
        showTimeAgo: true,
        category: CategoryNames.AVOID,
        cols: 2,
        colors: [
            { color: Colors.RED, name: "pron" },
            { color: Colors.YELLOW, name: "mast" },
            { color: Colors.GREEN, name: "abstain" },
        ],
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
    HABIT: "habit",
    NOTES: "notes",
    CALENDAR: "calendar",
    WORDCLOUD: "wordcloud",
    SETTINGS: "settings",
    ATLY: "atly",
};
