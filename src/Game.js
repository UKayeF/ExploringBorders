import possibleMapTilenames from './game-generation/map-tiles';
import { getPositionFromIndex, inRange } from './utils';
import { INVALID_MOVE, TurnOrder } from 'boardgame.io/core';

export const TILES_PER_ROW = 20;
export const ROW_COUNT = 20;

const getRandomTilename = () => possibleMapTilenames[
  Math.floor(Math.random() * possibleMapTilenames.length)
  ]

function IsVictory({ x, y }) {
  return (x === TILES_PER_ROW - 1 && y === ROW_COUNT - 1);
}

function FindRandomWhiteHole({ tiles }) {
  const whiteHoles = tiles.filter(({ tile }) => tile === 'white_hole');
  const randomWhiteHole = whiteHoles[
    Math.floor(Math.random() * whiteHoles.length)
    ];
  return randomWhiteHole;
}

function FindRandomBlackHole({ tiles }) {
  const blackHoles = tiles.filter(({ tile }) => tile.match('black_hole'));
  const randomBlackHole = blackHoles[
    Math.floor(Math.random() * blackHoles.length)
    ];
  return randomBlackHole;
}

export const ExploringBorders = {
  setup: () => ({
    width: TILES_PER_ROW,
    height: ROW_COUNT,
    inSpaceMap: true,
    todoComplete: true,
    activeTodo: null,
    position: { x: 0, y: 0, targetX: 0, targetY: 0 },
    tiles:
      Array(ROW_COUNT * TILES_PER_ROW).fill(null).map(
        (_, index) => ({
          ...getPositionFromIndex(index),
          tile: getRandomTilename(),
        }),
      ),
  }),
  turn: {
    order: TurnOrder.CONTINUE,
    moveLimit: 1,
  },
  endIf: (G, ctx) => {
    if (IsVictory(G.position)) {
      return { winner: ctx.currentPlayer }
    }
  },
  moves: {
    tryQuadrantChange: (G, ctx, direction) => {
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
      const tileIndex = (targetY) * TILES_PER_ROW + (targetX - 0);
      const destination = [...G.tiles][tileIndex];
      const { x: tileX, y: tileY, tile } = { ...destination };
      G.position.targetX = targetX;
      G.position.targetY = targetY;
      if (tile.match('black_hole') && !IsVictory({ x: tileX, y: tileY })) {
        const destinationWhiteHole = FindRandomWhiteHole(G);
        if (!destinationWhiteHole) {
          ctx.events.endGame({ winner: 'Black Hole' });
          return;
        }
        G.position.targetX = destinationWhiteHole.x;
        G.position.targetY = destinationWhiteHole.y;
      }
      if (tile.match('white_hole') && !IsVictory({ x: tileX, y: tileY })){
        const destinationBlackHole = FindRandomBlackHole(G);
        if (!destinationBlackHole) {
          ctx.events.endGame({ winner: 'White Hole' });
          return;
        }
        G.position.targetX = destinationBlackHole.x;
        G.position.targetY = destinationBlackHole.y;
      }

      G.activeTodo = ctx.random.Die(5);
      G.inSpaceMap = false;
      G.todoComplete = false;
    },
    completeQuadrantChange: (G, ctx) => {
      if (!G.todoComplete) return INVALID_MOVE;
      G.position.x = G.position.targetX;
      G.position.y = G.position.targetY;
      G.inSpaceMap = true;
    },
    completeTodo: (G, ctx) => {
      G.todoComplete = true;
      G.activeTodo = null;
    },
    loseGame: (G, ctx) => {
      ctx.events.endGame({ winner: 'Asteroid' });
      return;
    },
  },
}
