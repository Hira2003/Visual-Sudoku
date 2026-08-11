class SudokuGenerator {

    constructor() {
        this.solution = [];
        this.puzzle = [];
    }

    generate(difficulty = "medium") {

        // Generate a completely random solved Sudoku.
        this.solution = this.createSolvedBoard();

        // Create the puzzle from the solution.
        this.puzzle = this.createPuzzle(
            this.solution,
            difficulty
        );

        return {
            solution: this.solution,
            puzzle: this.puzzle
        };
    }


    // =====================================================
    // CREATE SOLVED BOARD
    // =====================================================

    createSolvedBoard() {

        const board = Array.from(
            { length: 9 },
            () => Array(9).fill(0)
        );

        this.fillBoard(board);

        return board;
    }


    fillBoard(board) {

        const emptyCell =
            this.findEmptyCell(board);

        if (!emptyCell) {
            return true;
        }

        const [row, col] =
            emptyCell;


        // Randomize the numbers before
        // trying them.
        const numbers = this.shuffle([
            1, 2, 3,
            4, 5, 6,
            7, 8, 9
        ]);


        for (const number of numbers) {

            if (
                this.isValid(
                    board,
                    row,
                    col,
                    number
                )
            ) {

                board[row][col] =
                    number;


                if (
                    this.fillBoard(board)
                ) {
                    return true;
                }


                // Backtracking
                board[row][col] = 0;
            }
        }

        return false;
    }


    // =====================================================
    // FIND EMPTY CELL
    // =====================================================

    findEmptyCell(board) {

        /*
         * Instead of always filling the board
         * from top-left to bottom-right,
         * choose a random empty cell.
         *
         * This increases variation between
         * generated solutions.
         */

        const emptyCells = [];


        for (let row = 0; row < 9; row++) {

            for (let col = 0; col < 9; col++) {

                if (
                    board[row][col] === 0
                ) {

                    emptyCells.push([
                        row,
                        col
                    ]);

                }
            }
        }


        if (emptyCells.length === 0) {
            return null;
        }


        return emptyCells[
            Math.floor(
                Math.random() *
                emptyCells.length
            )
        ];
    }


    // =====================================================
    // CHECK VALIDITY
    // =====================================================

    isValid(
        board,
        row,
        col,
        number
    ) {

        // Check row

        for (
            let c = 0;
            c < 9;
            c++
        ) {

            if (
                board[row][c] === number
            ) {
                return false;
            }
        }


        // Check column

        for (
            let r = 0;
            r < 9;
            r++
        ) {

            if (
                board[r][col] === number
            ) {
                return false;
            }
        }


        // Check 3x3 box

        const boxRow =
            Math.floor(row / 3) * 3;

        const boxCol =
            Math.floor(col / 3) * 3;


        for (
            let r = boxRow;
            r < boxRow + 3;
            r++
        ) {

            for (
                let c = boxCol;
                c < boxCol + 3;
                c++
            ) {

                if (
                    board[r][c] === number
                ) {
                    return false;
                }
            }
        }


        return true;
    }


    // =====================================================
    // CREATE PUZZLE
    // =====================================================

    createPuzzle(
        solution,
        difficulty
    ) {

        const puzzle =
            solution.map(
                row => [...row]
            );


        /*
         * Number of cells removed.
         */

        let cellsToRemove;


        switch (difficulty) {

            case "easy":
                cellsToRemove = 38;
                break;

            case "hard":
                cellsToRemove = 58;
                break;

            case "medium":
            default:
                cellsToRemove = 48;
                break;
        }


        /*
         * Create all 81 positions.
         */

        const positions = [];


        for (let row = 0; row < 9; row++) {

            for (let col = 0; col < 9; col++) {

                positions.push({
                    row: row,
                    col: col
                });

            }
        }


        /*
         * IMPORTANT:
         *
         * shuffle() returns a NEW array.
         * We must store it.
         */

        const shuffledPositions =
            this.shuffle(positions);


        /*
         * Remove random cells.
         */

        for (
            let i = 0;
            i < cellsToRemove;
            i++
        ) {

            const position =
                shuffledPositions[i];


            puzzle[
                position.row
            ][
                position.col
            ] = 0;
        }


        return puzzle;
    }


    // =====================================================
    // SHUFFLE
    // =====================================================

    shuffle(array) {

        const result =
            [...array];


        for (
            let i = result.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() *
                    (i + 1)
                );


            [
                result[i],
                result[j]
            ] = [
                result[j],
                result[i]
            ];
        }


        return result;
    }

}
