import React, { useEffect } from 'react';
import SpaceBoard from './SpaceBoard';
import Gamepad from './gamepad/Gamepad';
import { xbox } from './gamepad/layouts';
import MiniGame from './MiniGame';

const GamepadSpaceboard = (props) => {
  useEffect(() => {
    document.addEventListener('keyup', evt => {
      switch (evt.key) {
        case 'w':
        case 'ArrowUp':
          props.moves.tryQuadrantChange('up', Math.random());
          break;
        case 's':
        case 'ArrowDown':
          props.moves.tryQuadrantChange('down', Math.random());
          break;
        case 'd':
        case 'ArrowRight':
          props.moves.tryQuadrantChange('right', Math.random());
          break;
        case 'a':
        case 'ArrowLeft':
          props.moves.tryQuadrantChange('left', Math.random());
          break;
      }
    })
  }, [])
  return (
    <div>
      {
        props.ctx.gameover ? 'We have succeeded!' : null
      }
      <Gamepad
        layout={xbox}
        onUp={() => {
          props.G.inSpaceMap
            ? props.moves.tryQuadrantChange('up', Math.random())
            : (() => {})()
        }}
        onDown={() => {
          props.G.inSpaceMap
            ? props.moves.tryQuadrantChange('down', Math.random())
            : (() => {})()
        }}
        onRight={() => {
          props.G.inSpaceMap
            ? props.moves.tryQuadrantChange('right', Math.random())
            : (() => {})()
        }}
        onLeft={() => {
          props.G.inSpaceMap
            ? props.moves.tryQuadrantChange('left', Math.random())
            : (() => {})()
        }}
        onA={() => {
          props.G.inSpaceMap
            ? (() => {})()
            : props.moves.completeQuadrantChange()
        }}
      />
      {
        props.G.inSpaceMap
          ? <SpaceBoard {...props}/>
          : <MiniGame {...props}/>
      }

    </div>
  );
};

export default GamepadSpaceboard;
