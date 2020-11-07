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
    tryQuadrantChange: (G, ctx, direction, activeTodo) => {
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
      G.inSpaceMap = false;
      G.todoComplete = false;
      G.activeTodo = activeTodo;
      G.position.targetX = targetX;
      G.position.targetY = targetY;
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
  },
}
