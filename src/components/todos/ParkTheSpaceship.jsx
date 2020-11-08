import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  dropZone: {
    position: 'relative',
    width: 32,
    height: 32,
    overflow: 'hidden',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    background: `url('../assets/spritesheets/alien_p.png')`
  },
  draggableSpaceship: {
    cursor: 'pointer',
    width: 32,
    height: 32,
  },
})

function onDragOver(evt) {
  evt.preventDefault();
}

function onDragLeave(evt) {
  if (evt.target.style){
    evt.target.style.background = '';
  }
}

const ParkTheSpaceship = ({ completeTodo }) => {
  const classes = useStyles();
  const [dragged, setDragged] = useState(null);

  useEffect(() => {
    const spaceshipContainer = document.querySelector('.spaceship-position');
    spaceshipContainer.addEventListener('dragstart', onDragStart);
    spaceshipContainer.addEventListener('dragend', onDragEnd);

    const parkingSlot = document.querySelector('#parking-slot');
    parkingSlot.addEventListener('drop', onDrop);
    parkingSlot.addEventListener('dragenter', onDragEnter);
    parkingSlot.addEventListener('dragleave', onDragLeave);
    parkingSlot.addEventListener('dragover', onDragOver);
  })
  function onDragEnter(evt) {
    const target = evt.target;
    if (target && dragged) {
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';
      if (target.style){
        target.style.background = '#00f047';
      }
    }
  }
  function onDrop(evt){
    const target = evt.target;
    if (target && dragged){
      target.style.backgroundColor = '';
      evt.preventDefault();
      dragged.parentNode.removeChild(dragged);
      dragged.style.opacity = '';
      target.appendChild(dragged);
      completeTodo();
    }
  }
  function onDragStart(evt){
    const target = evt.target;
    if (target && target.nodeName === 'IMG'){
      setDragged(target);
      evt.dataTransfer.setData('text', target.id);
      evt.dataTransfer.dropEffect = 'move';
      evt.target.style.opacity = .3;
    }
  }
  function onDragEnd(evt){
    if (evt.target?.nodeName === 'IMG'){
      evt.target.style.opacity = '';
      setDragged(null);
    }
  }

  return (
    <div>
      <section id='parking-slot' className={classes.dropZone}>
      </section>
      <section className='spaceship-position'>
        <img
          className={classes.draggableSpaceship}
          id='space-ship-draggable'
          src='../assets/spritesheets/spaceship.png'
        />
      </section>
    </div>
  );
};

export default ParkTheSpaceship;
