import React from 'react';
import PressRedButton from './todos/PressRedButton';
import CompleteChecklist from './todos/CompleteChecklist';
import ParkTheSpaceship from './todos/ParkTheSpaceship';

const MINIGAME_COUNT = 3; // Red Button, Checklist

const MiniGame = (props) => {
  const todoRNG = props.G.activeTodo !== null ? props.G.activeTodo : NaN;
  const minigameIndex = Math.floor(todoRNG * MINIGAME_COUNT);
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
        minigameIndex === 0
          ? <PressRedButton completeTodo={() => props.moves.completeTodo()}/> : null
      }
      {
        minigameIndex === 1
          ? <CompleteChecklist completeTodo={() => props.moves.completeTodo()}/> : null
      }
      {
        minigameIndex === 2
        ? <ParkTheSpaceship completeTodo={() => props.moves.completeTodo()}/> : null
      }
    </div>
  );
};

export default MiniGame;
