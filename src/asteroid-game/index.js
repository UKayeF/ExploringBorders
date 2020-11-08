import Game from './Game';

export const initializeCanvas = ({ width, height, onFailure, onSuccess }) => {
  const canvas = document.getElementById('game-screen');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);

  const game = new Game(width, height, onFailure, onSuccess);
  game.start();

  let lastTime = 0;

  function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, width, height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(gameLoop)
  }

  gameLoop(lastTime);
}
