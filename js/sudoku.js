class SudokuGenerator {

    constructor() {
        this.solution = [];
        this.puzzle = [];
    }

    generate() {
        this.solution = this.createSolvedBoard();
        this.puzzle = this.createPuzzle(this.solution);

        return {
            solution: this.solution,
            puzzle: this.puzzle
        };
    }

    createSolvedBoard() {

        const board = Array.from(
            { length: 9 },
            () => Array(9).fill(0)
        );

        this.fillBoard(board);

        return board;
    }

    fillBoard(board) {

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

                if (this.fillBoard(board)) {
                    return true;
                }

                board[row][col] = 0;
            }
        }

        return false;
    }

    findEmptyCell(board) {

        for (let row = 0; row < 9; row++) {

            for (let col = 0; col < 9; col++) {

                if (board[row][col] === 0) {
                    return [row, col];
                }

            }

        }

        return null;
    }

    isValid(board, row, col, number) {

        // Row
        for (let c = 0; c < 9; c++) {

            if (
                board[row][c] === number
            ) {
                return false;
            }

        }

        // Column
        for (let r = 0; r < 9; r++) {

            if (
                board[r][col] === number
            ) {
                return false;
            }

        }

        // 3x3 box
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

    createPuzzle(solution) {

        const puzzle =
            solution.map(
                row => [...row]
            );

        let cellsToRemove;

        switch (window.currentDifficulty || "medium") {

            case "easy":
                cellsToRemove = 38;
                break;

            case "hard":
                cellsToRemove = 58;
                break;

            default:
                cellsToRemove = 48;
        }

        const positions = [];

        for (let row = 0; row < 9; row++) {

            for (let col = 0; col < 9; col++) {

                positions.push({
                    row: row,
                    col: col
                });

            }

        }

        this.shuffle(positions);

        for (
            let i = 0;
            i < cellsToRemove;
            i++
        ) {

            const position = positions[i];

            puzzle[position.row][position.col] = 0;
        }

        return puzzle;
    }

    shuffle(array) {

        const result = [...array];

        for (
            let i = result.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
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
