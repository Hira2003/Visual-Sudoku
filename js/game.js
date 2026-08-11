class Game {

    constructor() {

        this.difficulty = "medium";

        this.theme = "numbers";

        this.solution = [];

        this.puzzle = [];

        this.board = [];

        this.selectedCell = null;

        this.startTime = null;

        this.elapsedTime = 0;

        this.timerInterval = null;

    }


    start() {

        window.currentDifficulty =
            this.difficulty;


        const generator =
            new SudokuGenerator();


        const result =
            generator.generate();


        this.solution =
            result.solution;


        this.puzzle =
            result.puzzle;


        this.board =
            this.puzzle.map(
                row => [...row]
            );


        this.selectedCell =
            null;


        this.startTimer();

    }


    restart() {

        this.board =
            this.puzzle.map(
                row => [...row]
            );


        this.selectedCell =
            null;


        this.elapsedTime =
            0;


        this.startTimer();

    }


    selectCell(row, col) {

        if (
            this.puzzle[row][col] !== 0
        ) {

            this.selectedCell = null;

            return;

        }

        this.selectedCell = {
            row: row,
            col: col
        };

    }


    setValue(value) {

        if (!this.selectedCell) {

            return {
                success: false,
                reason: "no-cell"
            };

        }

        const row =
            this.selectedCell.row;

        const col =
            this.selectedCell.col;


        // Don't allow changing
        // original puzzle cells.

        if (
            this.puzzle[row][col] !== 0
        ) {

            return {
                success: false,
                reason: "given"
            };

        }


        /*
         * Check the solution.
         */

        if (
            this.solution[row][col] !== value
        ) {

            this.board[row][col] =
                value;

            return {
                success: false,
                reason: "mistake"
            };

        }


        this.board[row][col] =
            value;


        return {
            success: true
        };

    }


    isMistake(row, col) {

        if (
            this.puzzle[row][col] !== 0
        ) {

            return false;

        }


        const value =
            this.board[row][col];


        if (!value) {
            return false;
        }


        return (
            value !==
            this.solution[row][col]
        );

    }


    giveHint() {

        if (!this.selectedCell) {
            return null;
        }


        const row =
            this.selectedCell.row;

        const col =
            this.selectedCell.col;


        if (
            this.puzzle[row][col] !== 0
        ) {

            return null;

        }


        const correctValue =
            this.solution[row][col];


        this.board[row][col] =
            correctValue;


        return {
            row: row,
            col: col,
            value: correctValue
        };

    }


    isFinished() {

        for (let row = 0; row < 9; row++) {

            for (let col = 0; col < 9; col++) {

                if (
                    this.board[row][col] !==
                    this.solution[row][col]
                ) {

                    return false;

                }

            }

        }

        return true;

    }


    startTimer() {

        this.stopTimer();


        this.startTime =
            Date.now() -
            this.elapsedTime * 1000;


        this.timerInterval =
            setInterval(
                () => {

                    this.elapsedTime =
                        Math.floor(
                            (
                                Date.now() -
                                this.startTime
                            ) / 1000
                        );

                    if (window.app) {
                        window.app.updateTimer();
                    }

                },
                1000
            );

    }


    stopTimer() {

        if (this.timerInterval) {

            clearInterval(
                this.timerInterval
            );

            this.timerInterval =
                null;

        }

    }


    getTimeString() {

        const minutes =
            Math.floor(
                this.elapsedTime / 60
            );


        const seconds =
            this.elapsedTime % 60;


        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0")
        );

    }

}
