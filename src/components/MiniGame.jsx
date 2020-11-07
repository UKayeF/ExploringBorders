import React from 'react';
import PressRedButton from './todos/PressRedButton';

const MiniGame = (props) => {
  return (
    <div>
      <button onClick={() => props.moves.completeQuadrantChange()}>
        {
          props.G.todoComplete
            ? 'Click here to return to space map!'
            : 'Complete Todo to complete the quadrant change!'
        }
      </button>
      <PressRedButton completeTodo={() => props.moves.completeTodo()}/>
    </div>
  );
};

export default MiniGame;
