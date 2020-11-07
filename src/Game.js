import possibleMapTilenames from './game-generation/map-tiles';
import { getPositionFromIndex, inRange } from './utils';
import { INVALID_MOVE } from 'boardgame.io/core';

export const TILES_PER_ROW = 20;
export const ROW_COUNT = 20;

const getRandomTilename = () => possibleMapTilenames[
  Math.floor(Math.random() * possibleMapTilenames.length)
  ]

export const ExploringBorders = {
  setup: () => ({
    width: TILES_PER_ROW,
    height: ROW_COUNT,
    position: { x: 0, y: 0 },
    tiles:
      Array(ROW_COUNT * TILES_PER_ROW).fill(null).map(
        (_, index) => ({
          ...getPositionFromIndex(index),
          tile: getRandomTilename(),
        }),
      ),
  }),
  turn: {
    moveLimit: 1,
  },
  moves: {
    changeQuadrant: (G, ctx, direction) => {
      const { x, y } = G.position;
      let targetX = x, targetY = y;
      switch (direction) {
        case 'up':
          targetY++;
          break;
        case 'down':
          targetY--;
          break;
        case 'right':
          targetX++;
          break;
        case 'left':
          targetX--;
          break;
      }
      if (
        !inRange({ min: 0, max: TILES_PER_ROW - 1 })(targetX) ||
        !inRange({ min: 0, max: ROW_COUNT - 1 })(targetY)
      ) {
        return INVALID_MOVE;
      }
      G.x = targetX;
      G.y = targetY;
    },
  },
}
