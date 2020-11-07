import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  redButton: {
    width: 256,
    height: 256,
    background: `url('../assets/spritesheets/red_button.png')`
  }
})
const PressRedButton = ({completeTodo}) => {
  const classes = useStyles();
  const animatedTodo = () => {
    document.getElementById('red-button').classList.add('pressing');
    window.setTimeout(() => {
      document.getElementById('red-button').classList.remove('pressing');
      completeTodo();
    }, 1500)
  }
  return (
    <div id='red-button' className={classes.redButton} onClick={animatedTodo}>


    </div>
  );
};

export default PressRedButton;
