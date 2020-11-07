import React from 'react';

const TileCell = ({ cell, onClick, className }) => {
  return (
    <div onClick={onClick} className={className}>
      X
    </div>
  );
};

export default TileCell;
