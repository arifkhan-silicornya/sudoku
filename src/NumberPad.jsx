import React from "react";

const NumberPad = ({ handleNumberInput }) => {
  return (
    <div className="mt-4 grid grid-cols-9 md:grid-cols-3 gap-2 lg:gap-4 border-4 rounded-md border-slate-400 p-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 text-white text-lg font-bold rounded-full shadow-md hover:bg-blue-600"
          onClick={() => handleNumberInput(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default NumberPad;
