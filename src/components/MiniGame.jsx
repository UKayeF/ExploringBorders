import React from 'react';
import PressRedButton from './todos/PressRedButton';
import CompleteChecklist from './todos/CompleteChecklist';
import ParkTheSpaceship from './todos/ParkTheSpaceship';
import Login from './todos/Login';

const MiniGame = (props) => {
  const minigameIndex = props.G.activeTodo;
  if (props.G.todoComplete){
    setTimeout(() => {
      props.moves.completeQuadrantChange();
    }, 400)
  }
  return (
    <div>
      <button onClick={() => props.moves.completeQuadrantChange()}>
        {
          props.G.todoComplete
            ? 'Success! Click here to return to space map!'
            : 'Complete Todo to complete the quadrant change!'
        }
      </button>
      {
        minigameIndex === 1
          ? <PressRedButton completeTodo={() => props.moves.completeTodo()}/> : null
      }
      {
        minigameIndex === 2
          ? <CompleteChecklist completeTodo={() => props.moves.completeTodo()}/> : null
      }
      {
        minigameIndex === 3
          ? <ParkTheSpaceship completeTodo={() => props.moves.completeTodo()}/> : null
      }
      {
        minigameIndex === 4
          ? <Login completeTodo={() => props.moves.completeTodo()}/> : null
      }
    </div>
  );
};

export default MiniGame;
