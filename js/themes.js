const THEMES = {

    fruits: {

        name: "Fruits",

        symbols: [
            "🍎",
            "🍊",
            "🍋",
            "🍇",
            "🍓",
            "🍉",
            "🥝",
            "🍑",
            "🍒"
        ]

    },


    flowers: {

        name: "Flowers",

        symbols: [
            "🌸",
            "🌷",
            "🌻",
            "🌹",
            "🌺",
            "🪻",
            "🌼",
            "🏵️",
            "💮"
        ]

    }

};


function getTheme(name) {

    return THEMES[name] || THEMES.fruits;
}
