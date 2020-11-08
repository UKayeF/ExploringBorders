import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { initializeCanvas } from '../../asteroid-game';

const useStyles = createUseStyles({
  asteroidField: {
    width: 256,
    height: 256,
    background: `url('../assets/spritesheets/space_moving.png')`,
  },
  spaceShip: {
    width: 32,
    height: 32,
    background: `url('../assets/spritesheets/spaceship.png')`,
    // display: 'none',
  },
})

const GAME_WIDTH = 256;
const GAME_HEIGHT = 256;

const DodgeAsteroids = ({ completeTodo, endGame }) => {
  const classes = useStyles();
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    initializeCanvas({
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      onFailure: () => {
        setFailure(true);
        endGame();
      },
      onSuccess: () => {
        setSuccess(true);
        window.setTimeout(() => {
          completeTodo();
        })
      }
    });
  })
  if (failure) return null;
  if (success) return <p>We escaped from the asteroid field!</p>
  return (
    <div>
      <canvas
        id='game-screen'
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className={classes.asteroidField}
      >

      </canvas>
    </div>
  );
};

export default DodgeAsteroids;
