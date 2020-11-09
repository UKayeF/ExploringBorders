import { detectCollision } from './collision-detection';

export default class Asteroid {
  constructor(game, spawningX, spawningY) {
    this.width = 32;
    this.height = 32;

    this.position = {
      x: spawningX,
      y: spawningY,
    }
    this.image = document.getElementById('angry-asteroid-image');
    this.speed = 1.2;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
  }

  reset() {
    this.position.y = -this.height;
    this.position.x = Math.floor(Math.random() * (this.gameWidth + this.width));
  }

  draw(ctx) {
    ctx.fillStyle = 'transparent';
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
  }

  update() {
    this.position.y += this.speed;
    if (detectCollision(this.game.spaceship, this)) {
      this.game.lives -= 1;
    }
    if (this.position.y === this.gameHeight) {
      this.reset();
    }
  }

}
