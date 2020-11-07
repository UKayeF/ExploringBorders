import React, { useEffect } from 'react';
import TileGrid from './tiles/TileGrid';

const SpaceBoard = (props) => {
  useEffect(() => {
    document.addEventListener('keyup', evt => {
      switch (evt.key){
        case 'w':
        case 'ArrowUp':
          props.moves.changeQuadrant('up');
          break;
        case 's':
        case 'ArrowDown':
          props.moves.changeQuadrant('down');
          break;
        case 'd':
        case 'ArrowRight':
          props.moves.changeQuadrant('right');
          break;
        case 'a':
        case 'ArrowLeft':
          props.moves.changeQuadrant('left');
          break;
      }
    })
  }, []);
  return (
    <div>
      <TileGrid
        tiles={props.G.tiles}
        position={props.G.position}
        moves={props.moves}
      />
    </div>
  );
};

export default SpaceBoard;
