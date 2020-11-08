import React, { useEffect } from 'react';
import SpaceBoard from './SpaceBoard';
import Gamepad from './gamepad/Gamepad';
import { xbox } from './gamepad/layouts';
import MiniGame from './MiniGame';

const GamepadSpaceboard = (props) => {
  useEffect(() => {
    document.addEventListener('keyup', evt => {
      if (!props.G.inSpaceMap) return;

      switch (evt.key) {
        case 'w':
        case 'ArrowUp':
          props.moves.tryQuadrantChange('up');
          break;
        case 's':
        case 'ArrowDown':
          props.moves.tryQuadrantChange('down');
          break;
        case 'd':
        case 'ArrowRight':
          props.moves.tryQuadrantChange('right');
          break;
        case 'a':
        case 'ArrowLeft':
          props.moves.tryQuadrantChange('left');
          break;
      }
    })
  }, [])
  const winner = props.ctx?.gameover?.winner;
  return (
    <div>
      {
        props.ctx.gameover
          ? (winner === props.ctx.currentPlayer)
          ? 'We have succeeded!'
          : (winner === 'Black Hole')
            ? 'We entered a black hole and couldn\'t escape!'
            : 'Maybe next time'
          : null
      }
      <Gamepad
        layout={xbox}
        onUp={() => {
          props.G.inSpaceMap
            ? props.moves.tryQuadrantChange('up')
            : (() => {})()
        }}
        onDown={() => {
          props.G.inSpaceMap
            ? props.moves.tryQuadrantChange('down')
            : (() => {})()
        }}
        onRight={() => {
          props.G.inSpaceMap
            ? props.moves.tryQuadrantChange('right')
            : (() => {})()
        }}
        onLeft={() => {
          props.G.inSpaceMap
            ? props.moves.tryQuadrantChange('left')
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
