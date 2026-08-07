class Game {

    constructor() {

        this.difficulty = "medium";
        this.theme = "fruits";

        this.puzzle = null;
        this.solution = null;
        this.board = null;

        this.selectedCell = null;

        this.elapsedSeconds = 0;
        this.timerInterval = null;

        this.isRunning = false;
    }


    start() {

        const generated =
            Sudoku.generatePuzzle(
                this.difficulty
            );


        this.puzzle =
            generated.puzzle;

        this.solution =
            generated.solution;


        this.board =
            this.puzzle.map(row => [...row]);


        this.selectedCell = null;

        this.elapsedSeconds = 0;

        this.startTimer();
    }


    startTimer() {

        this.stopTimer();

        this.isRunning = true;

        this.timerInterval =
            setInterval(() => {

                this.elapsedSeconds++;

                if (window.app) {
                    window.app.updateTimer();
                }

            }, 1000);
    }


    stopTimer() {

        if (this.timerInterval) {

            clearInterval(
                this.timerInterval
            );

            this.timerInterval = null;
        }

        this.isRunning = false;
    }


    restart() {

        this.board =
            this.puzzle.map(row => [...row]);

        this.elapsedSeconds = 0;

        this.startTimer();
    }


    selectCell(row, col) {

        if (
            this.puzzle[row][col] !== null
        ) {
            return;
        }

        this.selectedCell = {
            row,
            col
        };
    }


    setValue(value) {

        if (!this.selectedCell) {
            return false;
        }


        const {
            row,
            col
        } = this.selectedCell;


        if (
            this.puzzle[row][col] !== null
        ) {
            return false;
        }


        if (
            value !== this.solution[row][col]
        ) {

            return false;
        }


        this.board[row][col] = value;

        return true;
    }


    giveHint() {

        if (!this.selectedCell) {
            return null;
        }


        const {
            row,
            col
        } = this.selectedCell;


        if (
            this.puzzle[row][col] !== null
        ) {
            return null;
        }


        const value =
            this.solution[row][col];


        this.board[row][col] = value;


        return {
            row,
            col,
            value
        };
    }


    isFinished() {

        return Sudoku.isCorrect(
            this.board,
            this.solution
        );
    }


    getTimeString() {

        const minutes =
            Math.floor(
                this.elapsedSeconds / 60
            );

        const seconds =
            this.elapsedSeconds % 60;


        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
}
