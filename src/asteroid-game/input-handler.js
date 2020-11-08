export default class InputHandler {
  constructor(spaceship) {
    document.addEventListener('keydown', evt => {
      switch (evt.key) {
        case 'd':
        case 'ArrowRight':
          spaceship.moveRight();
          break;
        case 'a':
        case 'ArrowLeft':
          spaceship.moveLeft();
          break;
      }
    })
    document.addEventListener('keyup', evt => {
      switch (evt.key) {
        case 'd':
        case 'ArrowRight':
          if (spaceship.speed > 0) spaceship.stop();
          break;
        case 'a':
        case 'ArrowLeft':
          if (spaceship.speed < 0) spaceship.stop();
          break;
      }
    })

  }

}
