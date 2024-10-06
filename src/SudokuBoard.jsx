import React, { useEffect } from "react";

const SudokuBoard = ({
  board,
  setSelectedCell,
  selectedCell,
  isValidMove,
  selectedNumber,
  initialBoard,
}) => {
  // Handle keyboard navigation for cell selection
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedCell) {
        const { row, col } = selectedCell;
        let newRow = row;
        let newCol = col;

        switch (e.key) {
          case "ArrowUp":
            newRow = row > 0 ? row - 1 : row;
            break;
          case "ArrowDown":
            newRow = row < 8 ? row + 1 : row;
            break;
          case "ArrowLeft":
            newCol = col > 0 ? col - 1 : col;
            break;
          case "ArrowRight":
            newCol = col < 8 ? col + 1 : col;
            break;
          default:
            break;
        }

        setSelectedCell({ row: newRow, col: newCol });
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedCell, setSelectedCell]);

  return (
    <div className="grid grid-cols-9 border border-gray-950 bg-gray-200 p-4 rounded-lg shadow-lg w-full max-w-[420px] md:max-w-[440px] lg:max-w-[460px] mx-auto">
      {board.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((cell, colIndex) => {
            const isSelected =
              selectedCell &&
              selectedCell.row === rowIndex &&
              selectedCell.col === colIndex;

            const isGenerated = initialBoard[rowIndex][colIndex] !== 0; // Check if the cell is part of the initial generated board
            const isValid =
              cell === 0 || isValidMove(board, rowIndex, colIndex, cell);

            const marginRightClass =
              (colIndex + 1) % 3 === 0 && colIndex !== 8 ? " !border-r-4 " : "";
            const marginBottomClass =
              (rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? " !border-b-4 " : "";

            const isSameNumber = cell !== 0 && cell === selectedNumber; // Check if the cell matches the selected number

            return (
              <div
                key={colIndex}
                className={`flex justify-center items-center h-8 w-8 lg:h-12 lg:w-12 border border-gray-950 text-2xl lg:text-3xl font-bold cursor-pointer
                ${cell === 0 ? " bg-white text-blue-600 " : " bg-gray-300 "}
                ${!isValid ? " bg-red-500 text-white " : " text-black "}
                ${isSelected ? " bg-yellow-300 " : ""}
                ${
                  isSameNumber ? " bg-green-300 " : ""
                }  // Highlight cells with the same number
                ${marginRightClass} ${marginBottomClass}
                ${
                  isGenerated
                    ? " bg-gray-300 text-gray-600 cursor-not-allowed "
                    : ""
                }`} // Disable system-generated cells
                onClick={
                  () =>
                    !isGenerated &&
                    setSelectedCell({ row: rowIndex, col: colIndex }) // Allow selection only for editable cells
                }
              >
                {cell !== 0 ? cell : ""}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SudokuBoard;
