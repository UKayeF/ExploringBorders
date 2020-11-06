import possibleMapTilenames from './game-generation/map-tiles';
import { getPositionFromIndex } from './utils';
import { INVALID_MOVE } from 'boardgame.io/core';

export const WIDTH = 20;
export const HEIGHT = 20;

const getRandomTilename = () => possibleMapTilenames[
  Math.floor(Math.random() * possibleMapTilenames.length)
  ]

export const ExploringBorders = {
  setup: () => ({
    width: WIDTH,
    height: HEIGHT,
    position: { x: 0, y: 0 },
    tiles:
      Array(HEIGHT * WIDTH).fill(null).map(
        (_, index) => ({
          ...getPositionFromIndex(index),
          tile: getRandomTilename(),
        }),
      ),
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
        if (targetX < 0 || targetX >= WIDTH || targetY < 0 || targetY >= HEIGHT){
          return INVALID_MOVE;
        }
        G.x = targetX;
        G.y = targetY;
      },
    },
  }),
}
