import React, { useEffect } from 'react';
import SpaceBoard from './SpaceBoard';
import Gamepad from './gamepad/Gamepad';
import { stadia, xbox } from './gamepad/layouts';

const GamepadSpaceboard = (props) => {
  console.log(props);
  useEffect(() => {
    document.addEventListener('keyup', evt => {
      switch (evt.key) {
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
  }, [])
  return (
    <div>
      <Gamepad
        layout={xbox}
        onUp={() => { props.moves.changeQuadrant('up')
        }}
        onDown={() => props.moves.changeQuadrant('down')}
        onRight={() => props.moves.changeQuadrant('right')}
        onLeft={() => props.moves.changeQuadrant('left')}
      />
      <SpaceBoard {...props}/>
    </div>
  );
};

export default GamepadSpaceboard;
