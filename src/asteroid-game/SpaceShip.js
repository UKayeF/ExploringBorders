export default class SpaceShip {
  constructor(game) {
    this.width = 32;
    this.height = 32;

    this.position = {
      x: (game.gameWidth / 2) - (this.width / 2),
      y: game.gameHeight - this.height - 10,
    }
    this.image = document.getElementById('spaceship-image');
    this.maxSpeed = 3;
    this.speed = 0;
    this.gameWidth = game.gameWidth;
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

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  update(deltaTime) {
    if (!deltaTime) return;

    this.position.x += this.speed;
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.gameWidth){
      this.position.x = this.gameWidth - this.width;
    }
  }
}
