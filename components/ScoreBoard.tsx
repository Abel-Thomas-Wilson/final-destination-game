
import React from 'react';
import { HeartIcon } from './icons/HeartIcon'; // Assuming you'll create this

interface ScoreBoardProps {
  score: number;
  lives: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, lives }) => {
  return (
    <div className="flex justify-between items-center w-full max-w-md p-4 bg-gray-700 text-white rounded-lg shadow-xl mb-2">
      <div className="text-2xl font-bold">
        Score: <span className="text-yellow-400">{score}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold">Lives:</span>
        <div className="flex">
        {Array.from({ length: lives }).map((_, index) => (
          <HeartIcon key={index} className="w-8 h-8 text-red-500" />
        ))}
        {Array.from({ length: Math.max(0, 3 - lives) }).map((_, index) => (
          <HeartIcon key={`empty-${index}`} className="w-8 h-8 text-gray-500" />
        ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
