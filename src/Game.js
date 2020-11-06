import possibleMapTilenames from './game-generation/map-tiles';
import { getPositionFromIndex } from './utils';

export const WIDTH = 100;
export const HEIGHT = 100;

const getRandomTilename = () => possibleMapTilenames[
  Math.floor(Math.random() * possibleMapTilenames.length)
  ]

export const ExploringBorders = {
  setup: () => ({
    width: WIDTH,
    height: HEIGHT,
    tiles:
      Array(HEIGHT * WIDTH).fill(null).map(
        (_, index) => ({
          ...getPositionFromIndex(index),
          tile: getRandomTilename(),
        }),
      ),
    moves: {},
  }),
}
