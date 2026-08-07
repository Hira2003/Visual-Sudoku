const THEMES = {

    numbers: {

        name: "Numbers",

        symbols: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9"
        ]

    },


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

    return (
        THEMES[name] ||
        THEMES.numbers
    );

}
