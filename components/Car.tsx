import React from 'react';
import { GameObject } from '../types';

interface CarProps {
  gameObject: GameObject;
  flashOn: boolean;
}

const Car: React.FC<CarProps> = ({ gameObject, flashOn }) => {
  const isPlayer = gameObject.id === 'player';
  const isCarA = gameObject.id === 'A'; // Moves right
  const isCarB = gameObject.id === 'B'; // Moves left

  const carBodyStyle = `absolute ${gameObject.color} border-black shadow-md rounded-md`;

  const lightOnClass = 'opacity-100';
  const lightOffClass = 'opacity-40';
  const currentLightClass = flashOn ? lightOnClass : lightOffClass;

  return (
    <div
      className={carBodyStyle}
      style={{
        left: `${gameObject.pos.x}px`,
        top: `${gameObject.pos.y}px`,
        width: `${gameObject.width}px`,
        height: `${gameObject.height}px`,
        zIndex: isPlayer ? 10 : 5, 
        borderWidth: isPlayer ? '2px' : '1px',
      }}
      aria-label={`Car ${gameObject.id}`}
      role="img"
    >
      {/* Player Car Details (Top-Down View) */}
      {isPlayer && (
        <>
          <div className="absolute bg-cyan-300 opacity-80 rounded-sm" style={{width: '60%', height: '20%', top: '6%', left: '20%'}}></div>
          <div className="absolute bg-black bg-opacity-10 rounded" style={{width: '70%', height: '50%', top: '28%', left: '15%'}}></div>
          
          {/* Headlights */}
          <div className={`absolute bg-yellow-200 rounded-full ${currentLightClass} transition-opacity duration-100`} style={{width: '8px', height: '8px', top: '7%', left: '23%'}}></div>
          <div className={`absolute bg-yellow-200 rounded-full ${currentLightClass} transition-opacity duration-100`} style={{width: '8px', height: '8px', top: '7%', right: '23%'}}></div>
          {/* Taillights */}
          <div className={`absolute bg-red-700 rounded-full ${currentLightClass} transition-opacity duration-100`} style={{width: '7px', height: '7px', bottom: '7%', left: '28%'}}></div>
          <div className={`absolute bg-red-700 rounded-full ${currentLightClass} transition-opacity duration-100`} style={{width: '7px', height: '7px', bottom: '7%', right: '28%'}}></div>
        </>
      )}

      {/* NPC Car Details (Top-Down View) */}
      {(isCarA || isCarB) && (
        <>
          <div className="absolute bg-black bg-opacity-25 rounded-sm" style={{
            width: 'calc(100% - 8px)', height: 'calc(100% - 4px)', top: '2px', left: '4px',
          }}></div>
          <div className="absolute bg-cyan-300 opacity-70 rounded-sm" style={{
            width: isCarA ? '25%' : '22%', height: '60%', top: '20%', 
            ...(isCarA && { right: '5%' }), ...(isCarB && { left: '5%' }),
          }}></div>
           <div className="absolute bg-cyan-200 opacity-60 rounded-sm" style={{
            width: isCarA ? '18%' : '15%', height: '50%', top: '25%',
            ...(isCarA && { left: '6%' }), ...(isCarB && { right: '6%' }),
          }}></div>

          {/* Headlights */}
          <div className={`absolute bg-yellow-100 rounded-sm ${currentLightClass} transition-opacity duration-100`} style={{
            width: '6px', height: '10px', top: '18%', 
            ...(isCarA && { right: '2px' }), ...(isCarB && { left: '2px' }),
          }}></div>
          <div className={`absolute bg-yellow-100 rounded-sm ${currentLightClass} transition-opacity duration-100`} style={{
            width: '6px', height: '10px', bottom: '18%', 
            ...(isCarA && { right: '2px' }), ...(isCarB && { left: '2px' }),
          }}></div>

          {/* Taillights */}
          <div className={`absolute bg-red-700 rounded-sm ${currentLightClass} transition-opacity duration-100`} style={{
            width: '6px', height: '10px', top: '18%', 
            ...(isCarA && { left: '2px' }), ...(isCarB && { right: '2px' }),
          }}></div>
           <div className={`absolute bg-red-700 rounded-sm ${currentLightClass} transition-opacity duration-100`} style={{
            width: '6px', height: '10px', bottom: '18%', 
            ...(isCarA && { left: '2px' }), ...(isCarB && { right: '2px' }),
          }}></div>

          <div className="absolute bg-gray-800 rounded-full" style={{width: '10px', height: '10px', bottom: '-2px', left: '15%', opacity: 0.8}}></div>
          <div className="absolute bg-gray-800 rounded-full" style={{width: '10px', height: '10px', bottom: '-2px', right: '15%', opacity: 0.8}}></div>
        </>
      )}
    </div>
  );
};

export default Car;