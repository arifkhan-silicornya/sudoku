import { solveSudoku } from "./solveSudoku";

export const generateSudoku = (difficulty) => {
  // Create an empty board
  let board = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  // Generate a solved board using the solveSudoku function
  solveSudoku(board);

  // Depending on difficulty, remove numbers to create a puzzle
  let numbersToKeep;
  if (difficulty === "easy") {
    numbersToKeep = getRandomInt(40, 50);
  } else if (difficulty === "medium") {
    numbersToKeep = getRandomInt(34, 38);
  } else {
    numbersToKeep = getRandomInt(30, 31);
  }

  return removeNumbers(board, numbersToKeep); // function to remove numbers from solved board
};

// Utility function to generate a random integer between min and max
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

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

const hasUniqueSolution = (board) => {
  let solutionCount = 0;

  const countSolutions = (b) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (b[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(b, row, col, num)) {
              b[row][col] = num;
              countSolutions(b);
              b[row][col] = 0; // Backtrack
            }
          }
          return;
        }
      }
    }
    solutionCount++;
  };

  countSolutions(board);
  return solutionCount === 1;
};

const removeNumbers = (board, numbersToKeep) => {
  const newBoard = board.map((row) => [...row]);
  let removedCount = 81 - numbersToKeep;

  while (removedCount > 0) {
    const row = getRandomInt(0, 8);
    const col = getRandomInt(0, 8);

    if (newBoard[row][col] !== 0) {
      const temp = newBoard[row][col];
      newBoard[row][col] = 0;

      if (!hasUniqueSolution(newBoard)) {
        newBoard[row][col] = temp; // Restore if it doesn't have a unique solution
      } else {
        removedCount--;
      }
    }
  }

  return newBoard;
};
