import SpaceShip from './SpaceShip';
import Asteroid from './Asteroid';
import InputHandler from './input-handler';

const GAMESTATES = {
  RUNNING: 0,
  LOSS: 1,
  WIN: 1,
}
export default class Game {
  constructor(gameWidth, gameHeight, onFailure, endGameLoop) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.lives = 1;
    this.gamestate = GAMESTATES.RUNNING;
    this.onFailure = onFailure;
    this.endGameLoop = endGameLoop;
  }

  start() {
    this.spaceship = new SpaceShip(this)
    const getSlotX = () => Math.floor(Math.random() * 8) * 32;
    const randomAsteroids = new Array(40).fill(64)
      .map((value, index) => value * index)
      .map(offset => new Asteroid(this, getSlotX(), -offset));

    this.gameObjects = [
      this.spaceship,
      ...randomAsteroids,
    ];

    new InputHandler(this.spaceship);
  }

  update(deltaTime) {
    if (this.gamestate === GAMESTATES.WIN || this.gamestate === GAMESTATES.LOSS) {
      return;
    }
    if (this.lives === 0) {
      this.gamestate = GAMESTATES.LOSS;
      this.endGameLoop();
      this.onFailure();
      return;
    }
    this.gameObjects.forEach(
      object => object.update(deltaTime),
    )
  }

  draw(ctx) {
    this.gameObjects.forEach(
      object => object.draw(ctx),
    )
  }
}
