import React from 'react';
import { createUseStyles } from 'react-jss';
import { TILES_PER_ROW } from '../../Game';
import TileCell from './TileCell';

const CELL_WIDTH = 32;

const useStyles = createUseStyles({
  flexContainer: {
    display: 'flex',
    width: CELL_WIDTH * TILES_PER_ROW,
    flexFlow: 'row-reverse wrap',
  },
  flexItem: {
    width: CELL_WIDTH,
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
  const handleTileClick = ({ x: tileX, y: tileY }) => {
    const distanceY = tileY - playerY;
    const distanceX = tileX - playerX;
    const adjacent = Math.abs(distanceX) + Math.abs(distanceY) === 1;
    if (!adjacent) return;
    if (distanceY === 1) moves.changeQuadrant('up')
    if (distanceY === -1) moves.changeQuadrant('down')
    if (distanceX === 1) moves.changeQuadrant('right')
    if (distanceX === -1) moves.changeQuadrant('left')
  }

  return (
    <div className={classes.flexContainer}>
      {
        tilesInFlexFlow.map(
          (tile, index) => (
            <TileCell
              cell={tile}
              onClick={() => handleTileClick(tile)}
              key={index}
              className={classes.flexItem}
            />
          ),
        )
      }
    </div>
  );
};

export default TileGrid;
