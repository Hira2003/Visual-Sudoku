class App {

    constructor() {

        this.boardElement =
            document.getElementById(
                "sudokuBoard"
            );


        this.paletteElement =
            document.getElementById(
                "symbolPalette"
            );


        this.timerElement =
            document.getElementById(
                "timer"
            );


        this.messageElement =
            document.getElementById(
                "message"
            );


        this.winModal =
            document.getElementById(
                "winModal"
            );


        this.finalTime =
            document.getElementById(
                "finalTime"
            );


        this.gameThemeName =
            document.getElementById(
                "gameThemeName"
            );


        this.gameDifficulty =
            document.getElementById(
                "gameDifficulty"
            );


        this.difficultyDisplay =
            document.getElementById(
                "difficultyDisplay"
            );


        this.darkModeButton =
            document.getElementById(
                "darkMode"
            );


        this.modeIcon =
            document.getElementById(
                "modeIcon"
            );


        this.modeText =
            document.getElementById(
                "modeText"
            );


        /*
            Get the settings chosen
            from the main menu.
        */

        this.loadGameSettings();


        this.game =
            new Game();


        this.bindEvents();


        this.loadAppearance();


        this.newGame();

    }


    /* =====================================
       LOAD SETTINGS
    ===================================== */

    loadGameSettings() {

        this.selectedDifficulty =
            sessionStorage.getItem(
                "visualSudokuDifficulty"
            );


        this.selectedTheme =
            sessionStorage.getItem(
                "visualSudokuTheme"
            );


        /*
            If somebody opens game.html
            directly without using the
            menu, give them safe defaults.
        */

        if (
            ![
                "easy",
                "medium",
                "hard"
            ].includes(
                this.selectedDifficulty
            )
        ) {

            this.selectedDifficulty =
                "medium";

        }


        if (
            ![
                "numbers",
                "fruits",
                "flowers"
            ].includes(
                this.selectedTheme
            )
        ) {

            this.selectedTheme =
                "numbers";

        }

    }


    /* =====================================
       EVENTS
    ===================================== */

    bindEvents() {

        document
            .getElementById(
                "exitButton"
            )
            .addEventListener(
                "click",
                () => this.exitGame()
            );


        document
            .getElementById(
                "restartBtn"
            )
            .addEventListener(
                "click",
                () => this.restart()
            );


        document
            .getElementById(
                "hintBtn"
            )
            .addEventListener(
                "click",
                () => this.hint()
            );


        document
            .getElementById(
                "nextGameBtn"
            )
            .addEventListener(
                "click",
                () => {

                    this.closeWinModal();

                    this.newGame();

                }
            );


        document
            .getElementById(
                "winExitButton"
            )
            .addEventListener(
                "click",
                () => this.exitGame()
            );


        this.darkModeButton
            .addEventListener(
                "click",
                () => this.toggleDarkMode()
            );


        document.addEventListener(
            "keydown",
            event => {

                const key =
                    event.key;


                if (
                    key >= "1" &&
                    key <= "9"
                ) {

                    this.enterValue(
                        Number(key)
                    );

                }


                if (
                    key === "Escape"
                ) {

                    this.game.selectedCell =
                        null;

                    this.render();

                }

            }
        );

    }


    /* =====================================
       NEW GAME
    ===================================== */

    newGame() {

        this.game.difficulty =
            this.selectedDifficulty;


        this.game.theme =
            this.selectedTheme;


        this.game.start();


        this.updateGameInformation();


        this.render();


        this.message("");

    }


    /* =====================================
       GAME INFORMATION
    ===================================== */

    updateGameInformation() {

        const difficultyName =
            this.selectedDifficulty
                .charAt(0)
                .toUpperCase() +
            this.selectedDifficulty
                .slice(1);


        const theme =
            getTheme(
                this.selectedTheme
            );


        this.gameThemeName.textContent =
            theme.name;


        this.gameDifficulty.textContent =
            difficultyName;


        this.difficultyDisplay.textContent =
            difficultyName;

    }


    /* =====================================
       EXIT
    ===================================== */

    exitGame() {

        this.game.stopTimer();


        window.location.href =
            "index.html";

    }


    /* =====================================
       RENDER
    ===================================== */

    render() {

        this.renderBoard();

        this.renderPalette();

        this.updateTimer();

    }


    /* =====================================
       BOARD
    ===================================== */

    renderBoard() {

        this.boardElement.innerHTML =
            "";


        const theme =
            getTheme(
                this.game.theme
            );


        for (
            let row = 0;
            row < 9;
            row++
        ) {

            for (
                let col = 0;
                col < 9;
                col++
            ) {

                const cell =
                    document.createElement(
                        "div"
                    );


                cell.classList.add(
                    "cell"
                );


                const value =
                    this.game.board[row][col];


                const isGiven =
                    this.game.puzzle[row][col] !== null;


                if (isGiven) {

                    cell.classList.add(
                        "given"
                    );

                }


                if (
                    this.game.selectedCell &&
                    this.game.selectedCell.row === row &&
                    this.game.selectedCell.col === col
                ) {

                    cell.classList.add(
                        "selected"
                    );

                }


                if (
                    this.game.isMistake(
                        row,
                        col
                    )
                ) {

                    cell.classList.add(
                        "error"
                    );

                }


                if (
                    value !== null
                ) {

                    cell.textContent =
                        theme.symbols[
                            value - 1
                        ];

                }


                cell.setAttribute(
                    "role",
                    "button"
                );


                cell.setAttribute(
                    "aria-label",
                    `Row ${row + 1}, Column ${col + 1}`
                );


                cell.addEventListener(
                    "click",
                    () => {

                        this.selectCell(
                            row,
                            col
                        );

                    }
                );


                this.boardElement
                    .appendChild(
                        cell
                    );

            }

        }

    }


    /* =====================================
       PALETTE
    ===================================== */

    renderPalette() {

        this.paletteElement.innerHTML =
            "";


        const theme =
            getTheme(
                this.game.theme
            );


        theme.symbols.forEach(
            (
                symbol,
                index
            ) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    "symbol-button";


                button.type =
                    "button";


                button.textContent =
                    symbol;


                button.setAttribute(
                    "aria-label",
                    `Symbol ${index + 1}`
                );


                button.addEventListener(
                    "click",
                    () => {

                        this.enterValue(
                            index + 1
                        );

                    }
                );


                this.paletteElement
                    .appendChild(
                        button
                    );

            }
        );

    }


    /* =====================================
       CELL SELECTION
    ===================================== */

    selectCell(
        row,
        col
    ) {

        this.game.selectCell(
            row,
            col
        );


        this.render();

    }


    /* =====================================
       VALUE
    ===================================== */

    enterValue(value) {

        const selected =
            this.game.selectedCell;


        if (!selected) {

            this.message(
                "Select an empty cell first."
            );

            return;

        }


        const result =
            this.game.setValue(
                value
            );


        if (
            result.reason ===
            "mistake"
        ) {

            this.render();


            this.message(
                "Oops! That's not correct. ❌"
            );


            return;

        }


        if (
            result.success
        ) {

            this.message("");


            this.render();


            if (
                this.game.isFinished()
            ) {

                this.game.stopTimer();

                this.showWin();

            }

        }

    }


    /* =====================================
       HINT
    ===================================== */

    hint() {

        const result =
            this.game.giveHint();


        if (!result) {

            this.message(
                "Select an empty cell first."
            );

            return;

        }


        this.render();


        const index =
            result.row * 9 +
            result.col;


        const cell =
            this.boardElement
                .children[index];


        if (cell) {

            cell.classList.add(
                "hint"
            );


            setTimeout(
                () => {

                    cell.classList.remove(
                        "hint"
                    );

                },
                800
            );

        }


        this.message(
            "A little help from the garden 🌱"
        );


        if (
            this.game.isFinished()
        ) {

            this.game.stopTimer();

            this.showWin();

        }

    }


    /* =====================================
       RESTART
    ===================================== */

    restart() {

        this.game.restart();


        this.render();


        this.message(
            "Puzzle restarted."
        );

    }


    /* =====================================
       TIMER
    ===================================== */

    updateTimer() {

        this.timerElement.textContent =
            this.game.getTimeString();

    }


    /* =====================================
       MESSAGE
    ===================================== */

    message(text) {

        this.messageElement.textContent =
            text;

    }


    /* =====================================
       WIN
    ===================================== */

    showWin() {

        this.finalTime.textContent =
            this.game.getTimeString();


        this.winModal.classList.remove(
            "hidden"
        );

    }


    closeWinModal() {

        this.winModal.classList.add(
            "hidden"
        );

    }


    /* =====================================
       DARK MODE
    ===================================== */

    loadAppearance() {

        const savedMode =
            localStorage.getItem(
                "visualSudokuMode"
            );


        const isDark =
            savedMode === "dark";


        document.body.classList.toggle(
            "dark-mode",
            isDark
        );


        this.updateModeButton(
            isDark
        );

    }


    toggleDarkMode() {

        const isDark =
            document.body.classList.toggle(
                "dark-mode"
            );


        localStorage.setItem(
            "visualSudokuMode",
            isDark
                ? "dark"
                : "light"
        );


        this.updateModeButton(
            isDark
        );

    }


    updateModeButton(isDark) {

        this.darkModeButton
            .setAttribute(
                "aria-pressed",
                String(isDark)
            );


        this.modeIcon.textContent =
            isDark
                ? "☀️"
                : "🌙";


        this.modeText.textContent =
            isDark
                ? "Light"
                : "Dark";

    }

}


window.addEventListener(
    "DOMContentLoaded",
    () => {

        window.app =
            new App();

    }
);
