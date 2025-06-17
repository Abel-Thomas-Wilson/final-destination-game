
import React from 'react';
import { ArrowPathIcon } from './icons/ArrowPathIcon'; // Assuming you'll create this

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl text-center text-white space-y-6">
        <h2 className="text-5xl font-extrabold text-red-500">Game Over!</h2>
        <p className="text-3xl">
          Final Score: <span className="text-yellow-400 font-bold">{score}</span>
        </p>
        <button
          onClick={onRestart}
          className="
            px-8 py-4 bg-blue-500 text-white text-xl font-semibold rounded-lg shadow-lg
            hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
            transition-colors duration-150 ease-in-out
            flex items-center justify-center space-x-2 mx-auto
          "
        >
          <ArrowPathIcon className="w-6 h-6" />
          <span>Restart Game</span>
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
