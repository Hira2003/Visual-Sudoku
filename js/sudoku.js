class Sudoku {

    static SIZE = 9;
    static BOX_SIZE = 3;


    static createEmptyBoard() {

        return Array.from(
            { length: this.SIZE },
            () => Array(this.SIZE).fill(null)
        );
    }


    static shuffle(array) {

        const result = [...array];

        for (let i = result.length - 1; i > 0; i--) {

            const j = Math.floor(
                Math.random() * (i + 1)
            );

            [result[i], result[j]] =
                [result[j], result[i]];
        }

        return result;
    }


    static generateSolvedBoard() {

        const board = this.createEmptyBoard();

        this.solve(board);

        return board;
    }


    static solve(board) {

        const empty = this.findEmptyCell(board);

        if (!empty) {
            return true;
        }

        const [row, col] = empty;

        const numbers = this.shuffle(
            [1, 2, 3, 4, 5, 6, 7, 8, 9]
        );


        for (const number of numbers) {

            if (
                this.isValid(
                    board,
                    row,
                    col,
                    number
                )
            ) {

                board[row][col] = number;


                if (this.solve(board)) {
                    return true;
                }


                board[row][col] = null;
            }
        }

        return false;
    }


    static findEmptyCell(board) {

        for (let row = 0; row < this.SIZE; row++) {

            for (let col = 0; col < this.SIZE; col++) {

                if (board[row][col] === null) {
                    return [row, col];
                }
            }
        }

        return null;
    }


    static isValid(
        board,
        row,
        col,
        number
    ) {

        // Row

        for (let c = 0; c < this.SIZE; c++) {

            if (
                c !== col &&
                board[row][c] === number
            ) {
                return false;
            }
        }


        // Column

        for (let r = 0; r < this.SIZE; r++) {

            if (
                r !== row &&
                board[r][col] === number
            ) {
                return false;
            }
        }


        // 3x3 box

        const startRow =
            Math.floor(row / 3) * 3;

        const startCol =
            Math.floor(col / 3) * 3;


        for (
            let r = startRow;
            r < startRow + 3;
            r++
        ) {

            for (
                let c = startCol;
                c < startCol + 3;
                c++
            ) {

                if (
                    (r !== row || c !== col) &&
                    board[r][c] === number
                ) {
                    return false;
                }
            }
        }

        return true;
    }


    static generatePuzzle(difficulty = "medium") {

        const solution =
            this.generateSolvedBoard();


        const puzzle =
            solution.map(row => [...row]);


        const cellsToRemove = {

            easy: 38,
            medium: 48,
            hard: 55

        }[difficulty];


        const positions = [];

        for (let row = 0; row < 9; row++) {

            for (let col = 0; col < 9; col++) {

                positions.push([row, col]);
            }
        }


        const shuffledPositions =
            this.shuffle(positions);


        for (
            let i = 0;
            i < cellsToRemove;
            i++
        ) {

            const [row, col] =
                shuffledPositions[i];

            puzzle[row][col] = null;
        }


        return {
            puzzle,
            solution
        };
    }


    static isComplete(board) {

        for (let row = 0; row < 9; row++) {

            for (let col = 0; col < 9; col++) {

                if (board[row][col] === null) {
                    return false;
                }
            }
        }

        return true;
    }


    static isCorrect(
        board,
        solution
    ) {

        for (let row = 0; row < 9; row++) {

            for (let col = 0; col < 9; col++) {

                if (
                    board[row][col] !==
                    solution[row][col]
                ) {
                    return false;
                }
            }
        }

        return true;
    }
}
