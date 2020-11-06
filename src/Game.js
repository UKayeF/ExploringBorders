import MapTile from './game-generation/MapTile';
import possibleMapTilenames from './game-generation/map-tiles';

const WIDTH = 100;
const HEIGHT = 100;

const getRandomTilename = () => possibleMapTilenames[
  Math.floor(Math.random() * possibleMapTilenames.length)
]

export const ExploringBorders = {
  setup: () => ({
    width: WIDTH,
    height: HEIGHT,
    tiles:
      Array(HEIGHT).fill(null).map(
        (_, y) => Array(WIDTH).fill(null).map(
          (_, x) => new MapTile({ x, y, tile: getRandomTilename() }),
        ),
      ),
  }),
  moves: {},
}
