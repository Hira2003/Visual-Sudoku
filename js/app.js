class App {

    constructor() {

        this.game = new Game();


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


        this.difficultySelect =
            document.getElementById(
                "difficulty"
            );


        this.themeSelect =
            document.getElementById(
                "theme"
            );


        this.bindEvents();

        this.newGame();
    }


    bindEvents() {

        document
            .getElementById(
                "newGameBtn"
            )
            .addEventListener(
                "click",
                () => this.newGame()
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


        this.difficultySelect
            .addEventListener(
                "change",
                () => {

                    this.game.difficulty =
                        this.difficultySelect.value;

                    this.newGame();
                }
            );


        this.themeSelect
            .addEventListener(
                "change",
                () => {

                    this.game.theme =
                        this.themeSelect.value;

                    this.render();
                }
            );


        /*
            Keyboard support for desktop.

            Users can press 1-9 to enter
            numbers without clicking the palette.
        */

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


    newGame() {

        this.game.difficulty =
            this.difficultySelect.value;


        this.game.theme =
            this.themeSelect.value;


        this.game.start();


        this.render();


        this.message("");
    }


    restart() {

        this.game.restart();


        this.render();


        this.message(
            "Puzzle restarted."
        );
    }


    render() {

        this.renderBoard();

        this.renderPalette();

        this.updateTimer();
    }


    renderBoard() {

        this.boardElement.innerHTML = "";


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


                if (value !== null) {

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


                this.boardElement.appendChild(
                    cell
                );
            }
        }
    }


    renderPalette() {

        this.paletteElement.innerHTML = "";


        const theme =
            getTheme(
                this.game.theme
            );


        theme.symbols.forEach(
            (symbol, index) => {

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


                this.paletteElement.appendChild(
                    button
                );
            }
        );
    }


    selectCell(row, col) {

        this.game.selectCell(
            row,
            col
        );


        this.render();
    }


    enterValue(value) {

        const selected =
            this.game.selectedCell;


        if (!selected) {

            this.message(
                "Select an empty cell first."
            );

            return;
        }


        const correct =
            this.game.setValue(
                value
            );


        if (!correct) {

            this.markError(
                selected.row,
                selected.col
            );


            this.message(
                "That's not the correct symbol."
            );


            return;
        }


        this.message("");


        this.render();


        if (
            this.game.isFinished()
        ) {

            this.game.stopTimer();

            this.showWin();
        }
    }


    markError(row, col) {

        const index =
            row * 9 + col;


        const cell =
            this.boardElement
                .children[index];


        if (!cell) {
            return;
        }


        cell.classList.add(
            "error"
        );


        setTimeout(
            () => {

                cell.classList.remove(
                    "error"
                );

            },
            400
        );
    }


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


    updateTimer() {

        this.timerElement.textContent =
            this.game.getTimeString();
    }


    message(text) {

        this.messageElement.textContent =
            text;
    }


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

}


window.addEventListener(
    "DOMContentLoaded",
    () => {

        window.app =
            new App();

    }
);
