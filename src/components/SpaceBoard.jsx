import React, { useEffect } from 'react';
import TileGrid from './tiles/TileGrid';

const SpaceBoard = (props) => {
  return (
    <TileGrid
      tiles={props.G.tiles}
      position={props.G.position}
      moves={props.moves}
    />
  );
};

export default SpaceBoard;
