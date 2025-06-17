
import React from 'react';
import { RocketLaunchIcon } from './icons/RocketLaunchIcon'; // Assuming you'll create this

interface LaunchButtonProps {
  onLaunch: () => void;
  disabled: boolean;
}

const LaunchButton: React.FC<LaunchButtonProps> = ({ onLaunch, disabled }) => {
  return (
    <button
      onClick={onLaunch}
      disabled={disabled}
      className={`
        mt-4 px-8 py-4 bg-green-500 text-white text-xl font-bold rounded-lg shadow-lg
        hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75
        disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none
        transition-all duration-150 ease-in-out
        flex items-center justify-center space-x-2
      `}
    >
      <RocketLaunchIcon className="w-6 h-6" />
      <span>Launch Car</span>
    </button>
  );
};

export default LaunchButton;
