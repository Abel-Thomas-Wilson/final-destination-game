import React from 'react';
import {
  GAME_WIDTH, GAME_HEIGHT, ROAD_Y_OFFSET, GRASS_VERGE_HEIGHT,
  ACTUAL_ROAD_HEIGHT, ACTUAL_ROAD_Y_OFFSET,
  PLAYER_START_ZONE_Y_OFFSET, PLAYER_START_ZONE_HEIGHT, PLAYER_START_ZONE_COLOR,
  PLAYER_CAR_VERTICAL_LANE_X_OFFSET, PLAYER_CAR_VERTICAL_LANE_TOTAL_WIDTH, PLAYER_CAR_VERTICAL_LANE_COLOR,
  PLAYER_CAR_LANE_CENTER_DIVIDER_WIDTH, PLAYER_CAR_LANE_CENTER_DIVIDER_COLOR,
  PLAYER_CAR_LANE_CENTER_DIVIDER_DASH_LENGTH, PLAYER_CAR_LANE_CENTER_DIVIDER_DASH_GAP
} from '../constants';

interface RoadProps {
  // flashOn prop removed as road no longer has flashing elements
}

const Road: React.FC<RoadProps> = () => {
  const laneMarkingWidth = 40;
  const laneMarkingGap = 30;
  const laneMarkingTotalSegment = laneMarkingWidth + laneMarkingGap;

  const leftRoadSegmentWidth = PLAYER_CAR_VERTICAL_LANE_X_OFFSET;
  const rightRoadSegmentXStart = PLAYER_CAR_VERTICAL_LANE_X_OFFSET + PLAYER_CAR_VERTICAL_LANE_TOTAL_WIDTH;
  const rightRoadSegmentWidth = GAME_WIDTH - rightRoadSegmentXStart;

  const numMarkingsLeft = Math.floor(leftRoadSegmentWidth / laneMarkingTotalSegment);
  const numMarkingsRight = Math.floor(rightRoadSegmentWidth / laneMarkingTotalSegment);

  const centerDividerTotalSegment = PLAYER_CAR_LANE_CENTER_DIVIDER_DASH_LENGTH + PLAYER_CAR_LANE_CENTER_DIVIDER_DASH_GAP;
  const numCenterDividerDashes = Math.floor(GAME_HEIGHT / centerDividerTotalSegment);

  return (
    <>
      {/* Player Car's Vertical Path Container - zIndex: 1 */}
      <div
        className={`absolute ${PLAYER_CAR_VERTICAL_LANE_COLOR}`}
        style={{
          width: PLAYER_CAR_VERTICAL_LANE_TOTAL_WIDTH,
          height: GAME_HEIGHT,
          top: 0,
          left: PLAYER_CAR_VERTICAL_LANE_X_OFFSET,
          zIndex: 1,
        }}
        aria-label="Player car vertical path"
      >
        {/* Central Dashed Divider - zIndex: 2 (relative to parent) */}
        {Array.from({ length: numCenterDividerDashes }).map((_, index) => (
          <div
            key={`center-divider-dash-${index}`}
            className={`absolute ${PLAYER_CAR_LANE_CENTER_DIVIDER_COLOR}`}
            style={{
              width: PLAYER_CAR_LANE_CENTER_DIVIDER_WIDTH,
              height: PLAYER_CAR_LANE_CENTER_DIVIDER_DASH_LENGTH,
              top: index * centerDividerTotalSegment + (PLAYER_CAR_LANE_CENTER_DIVIDER_DASH_GAP / 2),
              left: (PLAYER_CAR_VERTICAL_LANE_TOTAL_WIDTH - PLAYER_CAR_LANE_CENTER_DIVIDER_WIDTH) / 2,
              // zIndex will be implicitly higher than parent's background if parent has zIndex 1
            }}
            aria-hidden="true" 
          />
        ))}
      </div>


      {/* Player Car Start Zone (Launch Pad) - zIndex: 2 */}
      <div
        className={`absolute ${PLAYER_START_ZONE_COLOR} rounded-md shadow-inner`}
        style={{
          width: PLAYER_CAR_VERTICAL_LANE_TOTAL_WIDTH, 
          height: PLAYER_START_ZONE_HEIGHT,
          top: PLAYER_START_ZONE_Y_OFFSET,
          left: PLAYER_CAR_VERTICAL_LANE_X_OFFSET, 
          zIndex: 2,
        }}
        aria-label="Player car launch area"
      />
      
      {/* Horizontal Road Surface (Part of Crossroads) - zIndex: 1 */}
      <div
        className="absolute bg-gray-600" 
        style={{
          width: GAME_WIDTH,
          height: ACTUAL_ROAD_HEIGHT,
          top: ACTUAL_ROAD_Y_OFFSET,
          left: 0,
          zIndex: 1, 
        }}
        aria-label="Horizontal road surface"
      >
        {/* Center Lane Markings - Left Segment - zIndex: 2 */}
        <div
          className="absolute flex"
          style={{
            width: leftRoadSegmentWidth,
            top: ACTUAL_ROAD_HEIGHT / 2 - 2, 
            left: 0,
            overflow: 'hidden',
            zIndex: 2, 
          }}
        >
          {Array.from({ length: numMarkingsLeft }).map((_, index) => (
            <div
              key={`left-mark-${index}`}
              className="bg-yellow-400"
              style={{
                height: '4px',
                width: `${laneMarkingWidth}px`,
                marginRight: `${laneMarkingGap}px`,
              }}
            />
          ))}
        </div>

        {/* Center Lane Markings - Right Segment - zIndex: 2 */}
        <div
          className="absolute flex"
          style={{
            width: rightRoadSegmentWidth,
            top: ACTUAL_ROAD_HEIGHT / 2 - 2, 
            left: rightRoadSegmentXStart,
            overflow: 'hidden',
            zIndex: 2, 
          }}
        >
          {Array.from({ length: numMarkingsRight }).map((_, index) => (
            <div
              key={`right-mark-${index}`}
              className="bg-yellow-400"
              style={{
                height: '4px',
                width: `${laneMarkingWidth}px`,
                marginRight: `${laneMarkingGap}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Grass Verges - Quadrants - zIndex: 3 */}
      {/* Top-Left Verge */}
      <div
        className="absolute bg-green-700"
        style={{
          width: PLAYER_CAR_VERTICAL_LANE_X_OFFSET, 
          height: GRASS_VERGE_HEIGHT,
          top: ROAD_Y_OFFSET,
          left: 0,
          zIndex: 3, 
        }}
      />
      {/* Top-Right Verge */}
      <div
        className="absolute bg-green-700"
        style={{
          width: GAME_WIDTH - (PLAYER_CAR_VERTICAL_LANE_X_OFFSET + PLAYER_CAR_VERTICAL_LANE_TOTAL_WIDTH), 
          height: GRASS_VERGE_HEIGHT,
          top: ROAD_Y_OFFSET,
          left: PLAYER_CAR_VERTICAL_LANE_X_OFFSET + PLAYER_CAR_VERTICAL_LANE_TOTAL_WIDTH, 
          zIndex: 3, 
        }}
      />
      {/* Bottom-Left Verge */}
      <div
        className="absolute bg-green-700"
        style={{
          width: PLAYER_CAR_VERTICAL_LANE_X_OFFSET, 
          height: GRASS_VERGE_HEIGHT,
          top: ACTUAL_ROAD_Y_OFFSET + ACTUAL_ROAD_HEIGHT,
          left: 0,
          zIndex: 3, 
        }}
      />
      {/* Bottom-Right Verge */}
      <div
        className="absolute bg-green-700"
        style={{
          width: GAME_WIDTH - (PLAYER_CAR_VERTICAL_LANE_X_OFFSET + PLAYER_CAR_VERTICAL_LANE_TOTAL_WIDTH), 
          height: GRASS_VERGE_HEIGHT,
          top: ACTUAL_ROAD_Y_OFFSET + ACTUAL_ROAD_HEIGHT,
          left: PLAYER_CAR_VERTICAL_LANE_X_OFFSET + PLAYER_CAR_VERTICAL_LANE_TOTAL_WIDTH, 
          zIndex: 3, 
        }}
      />
    </>
  );
};

export default Road;