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

const DodgeAsteroids = ({ completeTodo }) => {
  /* Idea:
       Spawn asteroids from the top margin of the asteroid-field
       Spaceship can go left/right, controlled by mouse cursor
       Collision if asteroids intersect with space ship
   */
  const classes = useStyles();
  const [done, setDone] = useState(false);
  const [canvas, setCanvas] = useState(null);
  setTimeout(() => {
    setDone(true);
  }, 10000);
  setInterval(() => {
    const currentCanvas = document.getElementById('game-screen');
  })
  useEffect(() => {
    initializeCanvas({ width: GAME_WIDTH, height: GAME_HEIGHT });
  })
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
