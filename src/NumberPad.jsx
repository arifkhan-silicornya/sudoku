import React from "react";

const NumberPad = ({ handleNumberInput }) => {
  return (
    <div className="mt-4 grid grid-cols-3 gap-4 border-4 border-slate-400 p-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          className="w-12 h-12 bg-blue-500 text-white font-bold rounded-sm shadow-md hover:bg-blue-600"
          onClick={() => handleNumberInput(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default NumberPad;
