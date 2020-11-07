import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  tile: ({tile}) => ({
    background: `url('../assets/spritesheets/${tile.tile}.png') left center`,
  }),
})
const TileCell = (
  {
    tryQuadrantChange,
    className,
    up,
    down,
    right,
    left,
    player,
    tile,
  },
) => {
  const classes = useStyles({ tile, player });
  const onClick = () => {
    if (up) return tryQuadrantChange('up');
    if (down) return tryQuadrantChange('down');
    if (left) return tryQuadrantChange('left');
    if (right) return tryQuadrantChange('right');
  }

  const spaceTile = player ? '' : 'space-tile';
  return (
    <div
      onClick={onClick}
      className={`${className} ${spaceTile} ${classes.tile} ${classes.player}`}
    >
      {
        (up || down)
          ? <img className='arrow' src={`../assets/spritesheets/arrow_${up ? 'up' : 'down'}.png`}/>
          : (right || left)
          ? <img className='arrow' src={`../assets/spritesheets/arrow_${right ? 'right' : 'left'}.png`}/>
          : player
            ? <img src='../assets/spritesheets/spaceship.png'/>
            : ''
      }
    </div>
  );
};

export default TileCell;
