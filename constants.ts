import { Position, PlayerCarState } from './types';

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const ROAD_Y_OFFSET = GAME_HEIGHT / 2 - 75; // Top edge of the entire road area (including grass verges)
export const GRASS_VERGE_HEIGHT = 25;
export const ACTUAL_ROAD_Y_OFFSET = ROAD_Y_OFFSET + GRASS_VERGE_HEIGHT;
export const ACTUAL_ROAD_HEIGHT = 100; // Height of the drivable road surface

export const CAR_A_WIDTH = 70;
export const CAR_A_HEIGHT = 35;
export const CAR_A_Y_POSITION = ACTUAL_ROAD_Y_OFFSET + (ACTUAL_ROAD_HEIGHT / 4) - (CAR_A_HEIGHT / 2);

export const CAR_B_WIDTH = 70;
export const CAR_B_HEIGHT = 35;
export const CAR_B_Y_POSITION = ACTUAL_ROAD_Y_OFFSET + (ACTUAL_ROAD_HEIGHT * 3 / 4) - (CAR_B_HEIGHT / 2);

export const PLAYER_CAR_WIDTH = 35;
export const PLAYER_CAR_HEIGHT = 70;
export const PLAYER_CAR_INITIAL_X = (GAME_WIDTH - PLAYER_CAR_WIDTH) / 2;

// Player Start Zone constants
export const PLAYER_CAR_START_ZONE_PADDING = 10; // Pixels around the car in its start zone
export const PLAYER_START_ZONE_HEIGHT = PLAYER_CAR_HEIGHT + (2 * PLAYER_CAR_START_ZONE_PADDING);
export const PLAYER_CAR_INITIAL_Y = GAME_HEIGHT - PLAYER_CAR_HEIGHT - PLAYER_CAR_START_ZONE_PADDING - 5; // Adjusted to sit nicely in start zone
export const PLAYER_START_ZONE_Y_OFFSET = GAME_HEIGHT - PLAYER_START_ZONE_HEIGHT - 5; // Start zone at very bottom minus small offset
export const PLAYER_START_ZONE_COLOR = 'bg-zinc-700'; // Color for the player's starting area

// Player car success: Y position becomes negative (top edge of car is above screen top) + its height
export const PLAYER_CAR_TARGET_Y = 0 - PLAYER_CAR_HEIGHT; 

// Player Car Vertical Lane Constants
export const PLAYER_CAR_VERTICAL_LANE_TOTAL_WIDTH = 120; // New wider width for the player's entire vertical lane
export const PLAYER_CAR_VERTICAL_LANE_X_OFFSET = (GAME_WIDTH - PLAYER_CAR_VERTICAL_LANE_TOTAL_WIDTH) / 2; // X offset for the entire vertical path element
export const PLAYER_CAR_VERTICAL_LANE_COLOR = 'bg-gray-600'; // Color for the player's vertical lane background

// Player Car Lane Center Divider Constants
export const PLAYER_CAR_LANE_CENTER_DIVIDER_WIDTH = 4; // Width of the central divider line
export const PLAYER_CAR_LANE_CENTER_DIVIDER_COLOR = 'bg-yellow-500'; // Color of the central divider line
export const PLAYER_CAR_LANE_CENTER_DIVIDER_DASH_LENGTH = 25; // Length of a dash
export const PLAYER_CAR_LANE_CENTER_DIVIDER_DASH_GAP = 20; // Gap between dashes


export const INITIAL_LIVES = 3;
export const POINTS_FOR_SUCCESS = 10;
export const POINTS_LOST_ON_COLLISION = 5;

export const INITIAL_CAR_A_SPEED = 2;
export const INITIAL_CAR_B_SPEED = 2.5;
export const PLAYER_CAR_SPEED = 6;
export const SPEED_INCREASE_FACTOR = 0.03; // Speed increases by this factor * score

export const CAR_A_COLOR = 'bg-red-600';
export const CAR_B_COLOR = 'bg-blue-600';
export const PLAYER_CAR_COLOR = 'bg-yellow-400';

export const INITIAL_PLAYER_CAR_STATE: PlayerCarState = {
  id: 'player',
  pos: { x: PLAYER_CAR_INITIAL_X, y: PLAYER_CAR_INITIAL_Y },
  width: PLAYER_CAR_WIDTH,
  height: PLAYER_CAR_HEIGHT,
  color: PLAYER_CAR_COLOR,
  isLaunched: false,
  isVisible: true,
};