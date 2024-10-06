import React, { useEffect, useState } from "react";
import NumberPad from "./NumberPad";
import SudokuBoard from "./SudokuBoard";
import { generateSudoku } from "./generateSudoku";

const Modal = ({ finalTime, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-green-600">Congratulations!</h2>
        <p className="mt-4 text-gray-700">
          You have successfully completed the puzzle!
        </p>
        <p className=" font-semibold">
          Time required : <span>{finalTime}</span>m
        </p>
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [board, setBoard] = useState(null); // Don't generate board until game starts
  const [initialBoard, setInitialBoard] = useState(null); // Track the initial board for non-editable cells
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null); // Track selected number
  const [history, setHistory] = useState([]);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // Start game when button is clicked
  const [difficulty, setDifficulty] = useState("");
  const [showModal, setShowModal] = useState(false); // To control the modal visibility
  const [firstLoad, setFirstLoad] = useState(true); // To control the modal visibility

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (gameStarted) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }

    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    setTimeout(() => {
      setFirstLoad(false);
    }, 3000);
  }, []);

  // Handle clicks outside the board
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".sudoku-board")) {
        setSelectedCell(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const startGame = (difficultyLevel) => {
    const newBoard = generateSudoku(difficultyLevel);
    setBoard(newBoard);
    setInitialBoard(newBoard);
    setDifficulty(difficultyLevel);
    setGameStarted(true);
    setTimer(0);
    setHistory([]);
    setShowModal(false); // Ensure modal is not showing when game starts
  };

  const isValidMove = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] === num) return false;
      if (i !== row && board[i][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const r = startRow + i;
        const c = startCol + j;
        if ((r !== row || c !== col) && board[r][c] === num) return false;
      }
    }
    return true;
  };

  const isBoardComplete = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cellValue = board[row][col];
        if (cellValue === 0 || !isValidMove(board, row, col, cellValue)) {
          return false; // Return false if a cell is empty or violates Sudoku rules
        }
      }
    }
    return true;
  };

  const handleNumberInput = (num) => {
    if (
      selectedCell &&
      initialBoard[selectedCell.row][selectedCell.col] === 0
    ) {
      const newBoard = board.map((row) => [...row]); // Clone the board immutably
      newBoard[selectedCell.row][selectedCell.col] = num;
      setHistory([...history, board]);
      setBoard(newBoard);

      if (isBoardComplete(newBoard)) {
        setShowModal(true); // Show the modal instead of alert
        setGameStarted(false); // Stop the game
      }
    }
    setSelectedNumber(num); // Track the selected number for highlighting
  };

  const resetGame = () => {
    setBoard(initialBoard); // Reset to initial board
    setHistory([]);
    setSelectedCell(null);
    setSelectedNumber(null);
    setTimer(0);
  };

  const cancelGame = () => {
    setBoard(null);
    setInitialBoard(null);
    setGameStarted(false);
    setTimer(0);
    setHistory([]);
    setSelectedCell(null);
    setSelectedNumber(null);
  };

  const undo = () => {
    if (history.length > 0) {
      const previousBoard = history[history.length - 1];
      setBoard(previousBoard);
      setHistory(history.slice(0, -1));
    }
  };

  // Format the timer display
  let min = String((parseInt(timer) - (parseInt(timer) % 60)) / 60);
  let sec = String(parseInt(timer) % 60);
  const finalTime =
    timer > 60
      ? (min.length === 1 ? "0" + min : min) +
        ":" +
        (sec?.length === 1 ? "0" + sec : sec)
      : "00:" +
        (String(timer)?.length === 1 ? "0" + String(timer) : String(timer));

  return (
    <div
      className={`min-h-screen z-10 relative bg-white py-4 flex flex-col justify-center items-center `}
    >
      {!gameStarted && firstLoad && (
        <div className="absolute z-50 inset-0 bg-[url('/mv2.png')] bg-center w-max-[500px] bg-no-repeat animate-fadeIn"></div>
      )}

      {!gameStarted && !firstLoad && (
        <div className="absolute z-20 w-full inset-0 bg-[url('/texture.jpg')] bg-cover bg-center  opacity-30"></div>
      )}
      {!gameStarted && !firstLoad && (
        <div className="absolute z-40">
          <h1 className="text-4xl text-center font-bold text-blue-800 mb-6">
            Sudoku Game
          </h1>
          <div className="flex flex-col mb-4 border-2 border-slate-300/10 shadow-md bg-white pt-4 px-12 pb-8 bg-opacity-90">
            <button
              className="text-sky-500 w-full border-sky-500 border bg-sky-500/5 mt-4 px-4 py-2 rounded-md"
              onClick={() => startGame("easy")}
            >
              Start Easy
            </button>
            <button
              className="text-green-500 w-full border-green-500 border bg-green-500/5 mt-4 px-4 py-2 rounded-md"
              onClick={() => startGame("medium")}
            >
              Start Medium
            </button>
            <button
              className="text-green-500 w-full border-green-500 border bg-green-500/5 mt-4 px-4 py-2 rounded-md"
              onClick={() => startGame("hard")}
            >
              Start Hard
            </button>
          </div>
        </div>
      )}

      {gameStarted && (
        <div className="absolute z-40 flex flex-col justify-center items-center">
          <div className="text-lg text-gray-700 mb-2">
            Current Mode:{" "}
            <span className="font-bold">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>

          <div className="flex space-x-4 mb-4 font-bold">
            <button
              className="text-teal-800 border-teal-500 border bg-teal-500/20 mt-4 px-4 py-2 rounded-md"
              onClick={resetGame}
            >
              Reset Game
            </button>
            <button
              className="text-slate-950 border-slate-950 border bg-slate-950/20 mt-4 px-4 py-2 rounded-md"
              onClick={cancelGame}
            >
              Cancel Game
            </button>
            <button
              className="text-red-900 border-red-500 border bg-red-500/20 mt-4 px-4 py-2 rounded-md"
              onClick={undo}
            >
              Undo
            </button>
          </div>

          <div className="text-lg text-gray-700 mb-4">Time: {finalTime} m</div>

          <div className="sudoku-board">
            <SudokuBoard
              board={board}
              setSelectedCell={setSelectedCell}
              selectedCell={selectedCell}
              isValidMove={isValidMove}
              selectedNumber={selectedNumber} // Pass the selected number to SudokuBoard
              initialBoard={initialBoard} // Pass the initial board to disable generated cells
            />
          </div>

          <NumberPad handleNumberInput={handleNumberInput} />
        </div>
      )}

      {showModal && (
        <Modal finalTime={finalTime} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default App;
