import React from 'react';

const TileCell = ({ changeQuadrant, className, up, down, right, left, player }) => {
  const onClick = () => {
    if (up) return changeQuadrant('up');
    if (down) return changeQuadrant('down');
    if (left) return changeQuadrant('left');
    if (right) return changeQuadrant('right');
  }
  return (
    <div onClick={onClick} className={className}>
      {
        (up || down)
          ? '||'
          : (right || left)
            ? '=='
            : player
              ? '*'
              : '#'
      }
    </div>
  );
};

export default TileCell;
