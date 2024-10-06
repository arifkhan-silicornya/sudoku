// Helper function to check if placing a number is valid
const isValid = (board, row, col, num) => {
  // Check the row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
  }

  // Check the column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }

  // Check the 3x3 sub-grid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
};

// Sudoku solver using backtracking
export const solveSudoku = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      // Find an empty cell (denoted by 0)
      if (board[row][col] === 0) {
        // Try numbers 1-9
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            // Place the number
            board[row][col] = num;

            // Recursively attempt to solve the rest of the board
            if (solveSudoku(board)) {
              return true;
            }

            // If placing num leads to a dead end, reset the cell and try another number
            board[row][col] = 0;
          }
        }

        // If no valid number can be placed, backtrack
        return false;
      }
    }
  }

  // If the board is completely filled, return true
  return true;
};
