const Menu = {

    difficulty: "medium",

    theme: "numbers",


    init() {

        this.bindMainButtons();

        this.bindChoices();

    },


    bindMainButtons() {

        document
            .getElementById("playButton")
            .addEventListener(
                "click",
                () => this.show("playSettings")
            );


        document
            .getElementById("howToPlayButton")
            .addEventListener(
                "click",
                () => this.show("howToPlay")
            );


        document
            .getElementById("aboutButton")
            .addEventListener(
                "click",
                () => this.show("about")
            );


        document
            .getElementById("backFromPlay")
            .addEventListener(
                "click",
                () => this.show("mainMenu")
            );


        document
            .getElementById("backFromHowToPlay")
            .addEventListener(
                "click",
                () => this.show("mainMenu")
            );


        document
            .getElementById("backFromAbout")
            .addEventListener(
                "click",
                () => this.show("mainMenu")
            );


        document
            .getElementById("startGameButton")
            .addEventListener(
                "click",
                () => this.startGame()
            );

    },


    bindChoices() {

        document
            .querySelectorAll(
                ".difficulty-choice"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            document
                                .querySelectorAll(
                                    ".difficulty-choice"
                                )
                                .forEach(
                                    item =>
                                        item.classList
                                            .remove(
                                                "selected"
                                            )
                                );


                            button.classList
                                .add(
                                    "selected"
                                );


                            this.difficulty =
                                button.dataset.value;

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                ".theme-choice"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            document
                                .querySelectorAll(
                                    ".theme-choice"
                                )
                                .forEach(
                                    item =>
                                        item.classList
                                            .remove(
                                                "selected"
                                            )
                                );


                            button.classList
                                .add(
                                    "selected"
                                );


                            this.theme =
                                button.dataset.value;

                        }
                    );

                }
            );

    },


    show(sectionId) {

        const sections = [
            "mainMenu",
            "playSettings",
            "howToPlay",
            "about"
        ];


        sections.forEach(
            id => {

                document
                    .getElementById(id)
                    .classList
                    .add("hidden");

            }
        );


        document
            .getElementById(sectionId)
            .classList
            .remove("hidden");

    },


    startGame() {

        /*
            Save the player's choices
            temporarily.

            sessionStorage means these
            settings belong to this
            current game session.
        */

        sessionStorage.setItem(
            "visualSudokuDifficulty",
            this.difficulty
        );


        sessionStorage.setItem(
            "visualSudokuTheme",
            this.theme
        );


        window.location.href =
            "game.html";

    }

};


document.addEventListener(
    "DOMContentLoaded",
    () => Menu.init()
);