import React from 'react';
import TileGrid from './tiles/TileGrid';

const SpaceBoard = (props) => {
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
