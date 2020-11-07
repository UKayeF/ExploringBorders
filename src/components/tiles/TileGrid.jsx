import React from 'react';
import { createUseStyles } from 'react-jss';
import { TILES_PER_ROW } from '../../Game';
import TileCell from './TileCell';

const CELL_WIDTH = 32;
const CELL_HEIGHT = 32;

const useStyles = createUseStyles({
  flexContainer: {
    display: 'flex',
    width: CELL_WIDTH * TILES_PER_ROW,
    flexFlow: 'row-reverse wrap',
  },
  flexItem: {
    width: CELL_WIDTH - 2,
    height: CELL_HEIGHT - 2,
    border: '1px solid black',
  },
})

const TileGrid = ({ tiles, position, moves }) => {
  const { x: playerX, y: playerY } = position;
  const classes = useStyles();
  const tilesInFlexFlow = [...tiles].reverse(
    /* Flex-Flow Snake
       <-3-2-1-<
       <-6-5-4-<
      <:-9-8-7-<
     */
  );
  const getAdjacentTileIndices = () => ({
    up: (playerY + 1) * TILES_PER_ROW + playerX,
    down: (playerY - 1) * TILES_PER_ROW + playerX,
    right: (playerX < TILES_PER_ROW - 1)
      ? playerY * TILES_PER_ROW + (playerX + 1)
      : null,
    left: (playerX > 0)
      ?
      playerY * TILES_PER_ROW + (playerX - 1)
      : null,
    player: playerY * TILES_PER_ROW + playerX,
  });

  const { up, down, right, left, player } = getAdjacentTileIndices();

  return (
    <div className={classes.flexContainer}>
      {
        tilesInFlexFlow.map(
          (tile, index, { length }) => (
            <TileCell
              tile={tile}
              tryQuadrantChange={moves.tryQuadrantChange}
              key={index}
              className={classes.flexItem}
              up={(length - index - 1) === up}
              down={(length - index - 1) === down}
              right={(length - index - 1) === right}
              left={(length - index - 1) === left}
              player={(length - index - 1) === player}
              last={index === 0}
            />
          ),
        )
      }
    </div>
  );
};

export default TileGrid;
