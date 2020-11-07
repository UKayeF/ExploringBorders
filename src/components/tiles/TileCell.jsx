import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  tile: ({tile}) => ({
    background: `url('../assets/spritesheets/${tile.tile}.png') left center`,
  }),
})
const TileCell = (
  {
    changeQuadrant,
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
    if (up) return changeQuadrant('up');
    if (down) return changeQuadrant('down');
    if (left) return changeQuadrant('left');
    if (right) return changeQuadrant('right');
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
