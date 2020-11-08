import SpaceShip from './space-ship';
import InputHandler from './input-handler';

export const initializeCanvas = ({ width, height }) => {
  const canvas = document.getElementById('game-screen');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);

  const spaceship = new SpaceShip(width, height);
  spaceship.draw(ctx);

  new InputHandler(spaceship);
  let lastTime = 0;
  function gameLoop(timestamp){
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, width, height);
    spaceship.update(deltaTime);
    spaceship.draw(ctx);

    requestAnimationFrame(gameLoop)
  }

  gameLoop(lastTime);
}
