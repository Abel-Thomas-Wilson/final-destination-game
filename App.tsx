import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Position, PlayerCarState, GameObject } from './types';
import {
  GAME_WIDTH, GAME_HEIGHT, INITIAL_LIVES,
  CAR_A_WIDTH, CAR_A_HEIGHT, CAR_A_Y_POSITION, CAR_A_COLOR,
  CAR_B_WIDTH, CAR_B_HEIGHT, CAR_B_Y_POSITION, CAR_B_COLOR,
  PLAYER_CAR_TARGET_Y, // This constant now means car's top edge is at -PLAYER_CAR_HEIGHT
  PLAYER_CAR_SPEED,
  INITIAL_CAR_A_SPEED, INITIAL_CAR_B_SPEED, SPEED_INCREASE_FACTOR,
  POINTS_FOR_SUCCESS, POINTS_LOST_ON_COLLISION, INITIAL_PLAYER_CAR_STATE
} from './constants';
import Road from './components/Road';
import Car from './components/Car';
import ScoreBoard from './components/ScoreBoard';
import LaunchButton from './components/LaunchButton';
import GameOverModal from './components/GameOverModal';

interface MovingCarState extends GameObject {
  keySuffix: number;
}

const initialCarAPos: Position = { x: -CAR_A_WIDTH, y: CAR_A_Y_POSITION };
const INITIAL_CAR_A_STATE: MovingCarState = {
  id: 'A',
  pos: initialCarAPos,
  width: CAR_A_WIDTH,
  height: CAR_A_HEIGHT,
  color: CAR_A_COLOR,
  keySuffix: 0,
};

const initialCarBPos: Position = { x: GAME_WIDTH, y: CAR_B_Y_POSITION };
const INITIAL_CAR_B_STATE: MovingCarState = {
  id: 'B',
  pos: initialCarBPos,
  width: CAR_B_WIDTH,
  height: CAR_B_HEIGHT,
  color: CAR_B_COLOR,
  keySuffix: 0,
};

const checkCollision = (car1: GameObject, car2: GameObject): boolean => {
  return (
    car1.pos.x < car2.pos.x + car2.width &&
    car1.pos.x + car1.width > car2.pos.x &&
    car1.pos.y < car2.pos.y + car2.height &&
    car1.pos.y + car1.height > car2.pos.y
  );
};

const App: React.FC = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [gameOver, setGameOver] = useState(false);

  const [carAState, setCarAState] = useState<MovingCarState>(INITIAL_CAR_A_STATE);
  const [carBState, setCarBState] = useState<MovingCarState>(INITIAL_CAR_B_STATE);
  const [playerCar, setPlayerCar] = useState<PlayerCarState>(INITIAL_PLAYER_CAR_STATE);

  const [carASpeed, setCarASpeed] = useState(INITIAL_CAR_A_SPEED);
  const [carBSpeed, setCarBSpeed] = useState(INITIAL_CAR_B_SPEED);

  const carAPosRef = useRef<Position>(initialCarAPos);
  const carBPosRef = useRef<Position>(initialCarBPos);
  const carASpeedRef = useRef(carASpeed);
  const carBSpeedRef = useRef(carBSpeed);
  
  const [flashOn, setFlashOn] = useState(true);
  const frameCountRef = useRef(0);


  useEffect(() => { carAPosRef.current = carAState.pos; }, [carAState.pos]);
  useEffect(() => { carBPosRef.current = carBState.pos; }, [carBState.pos]);
  useEffect(() => { carASpeedRef.current = carASpeed; }, [carASpeed]);
  useEffect(() => { carBSpeedRef.current = carBSpeed; }, [carBSpeed]);
  
  const handleLaunchCar = useCallback(() => {
    if (!playerCar.isLaunched && !gameOver) {
      setPlayerCar(prev => ({ ...prev, isLaunched: true, isVisible: true }));
    }
  }, [playerCar.isLaunched, gameOver]);

  const handleRestartGame = useCallback(() => {
    setScore(0);
    setLives(INITIAL_LIVES);
    setGameOver(false);
    setCarAState(INITIAL_CAR_A_STATE);
    setCarBState(INITIAL_CAR_B_STATE);
    setPlayerCar(INITIAL_PLAYER_CAR_STATE);
    setCarASpeed(INITIAL_CAR_A_SPEED);
    setCarBSpeed(INITIAL_CAR_B_SPEED);
    setFlashOn(true);
    frameCountRef.current = 0;
  }, []);

  useEffect(() => {
    if (!gameOver) {
      setCarASpeed(INITIAL_CAR_A_SPEED + score * SPEED_INCREASE_FACTOR);
      setCarBSpeed(INITIAL_CAR_B_SPEED + score * SPEED_INCREASE_FACTOR);
    }
  }, [score, gameOver]);

  useEffect(() => {
    if (gameOver) return;

    let animationFrameId: number;
    const gameTick = () => {
      frameCountRef.current += 1;
      if (frameCountRef.current % 20 === 0) { // Flash lights approx every 333ms at 60fps
        setFlashOn(prev => !prev);
      }

      setCarAState(prev => {
        let newX = prev.pos.x + carASpeedRef.current;
        let newKeySuffix = prev.keySuffix;
        if (newX > GAME_WIDTH) {
          newX = -CAR_A_WIDTH;
          newKeySuffix = prev.keySuffix + 1;
        }
        return { ...prev, pos: { ...prev.pos, x: newX }, keySuffix: newKeySuffix };
      });

      setCarBState(prev => {
        let newX = prev.pos.x - carBSpeedRef.current;
        let newKeySuffix = prev.keySuffix;
        if (newX < -CAR_B_WIDTH) {
          newX = GAME_WIDTH;
          newKeySuffix = prev.keySuffix + 1;
        }
        return { ...prev, pos: { ...prev.pos, x: newX }, keySuffix: newKeySuffix };
      });
      
      setPlayerCar(prevPlayerCar => {
        if (!prevPlayerCar.isLaunched || !prevPlayerCar.isVisible) {
          return prevPlayerCar;
        }

        const newPlayerCarY = prevPlayerCar.pos.y - PLAYER_CAR_SPEED;

        const tempPlayerCarObject: GameObject = {
          ...prevPlayerCar,
          pos: { x: prevPlayerCar.pos.x, y: newPlayerCarY },
        };
        
        const tempCarAObject: GameObject = {
          id: 'A', 
          pos: { x: carAPosRef.current.x + carASpeedRef.current, y: CAR_A_Y_POSITION },
          width: CAR_A_WIDTH, height: CAR_A_HEIGHT, color: CAR_A_COLOR,
        };
        const tempCarBObject: GameObject = {
          id: 'B', 
          pos: { x: carBPosRef.current.x - carBSpeedRef.current, y: CAR_B_Y_POSITION },
          width: CAR_B_WIDTH, height: CAR_B_HEIGHT, color: CAR_B_COLOR,
        };

        // Success condition: Player car is completely off the top of the screen
        if (newPlayerCarY < PLAYER_CAR_TARGET_Y) { 
          setScore(s => s + POINTS_FOR_SUCCESS);
          return { ...INITIAL_PLAYER_CAR_STATE, isVisible: true, isLaunched: false }; 
        } else if (checkCollision(tempPlayerCarObject, tempCarAObject) || checkCollision(tempPlayerCarObject, tempCarBObject)) { 
          setScore(s => Math.max(0, s - POINTS_LOST_ON_COLLISION));
          setLives(l => {
            const newLives = l - 1;
            if (newLives <= 0) {
              setGameOver(true);
              return 0;
            }
            return newLives;
          });
          return { ...INITIAL_PLAYER_CAR_STATE, isVisible: true, isLaunched: false }; 
        }
        return { ...prevPlayerCar, pos: { ...prevPlayerCar.pos, y: newPlayerCarY } };
      });
      animationFrameId = requestAnimationFrame(gameTick);
    };

    animationFrameId = requestAnimationFrame(gameTick);
    return () => cancelAnimationFrame(animationFrameId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]); 

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <ScoreBoard score={score} lives={lives} />
      <div
        className="relative bg-gray-800 border-4 border-gray-700 shadow-2xl overflow-hidden"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        <Road />
        <Car key={`car-a-${carAState.keySuffix}`} gameObject={carAState} flashOn={flashOn} />
        <Car key={`car-b-${carBState.keySuffix}`} gameObject={carBState} flashOn={flashOn} />
        {playerCar.isVisible && <Car gameObject={playerCar} flashOn={flashOn} />}
      </div>
      <LaunchButton onLaunch={handleLaunchCar} disabled={playerCar.isLaunched || gameOver} />
      {gameOver && <GameOverModal score={score} onRestart={handleRestartGame} />}
    </div>
  );
};

export default App;