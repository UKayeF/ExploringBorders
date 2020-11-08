import SpaceShip from './SpaceShip';
import Asteroid from './Asteroid';
import InputHandler from './input-handler';

const GAMESTATES = {
  RUNNING: 0,
  LOSS: 1,
  WIN: 1,
}
export default class Game {
  constructor(gameWidth, gameHeight, onFailure, onSuccess) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.lives = 1;
    this.gamestate = GAMESTATES.RUNNING;
    this.onFailure = onFailure;
    this.onSuccess = onSuccess;
  }

  start() {
    this.countdown = 200000;
    this.spaceship = new SpaceShip(this)
    this.asteroid = new Asteroid(this, 100);
    const getSlotX = () => Math.floor(Math.random() * 8) * 32;
    const randomAsteroids = new Array(40).fill(32)
      .map((value, index) => value * index)
      .map(offset => new Asteroid(this, getSlotX(), -offset));

    this.gameObjects = [
      this.spaceship,
      ...randomAsteroids,
    ];

    new InputHandler(this.spaceship);
  }

  update(deltaTime) {
    if (this.gamestate === GAMESTATES.WIN || this.gamestate === GAMESTATES.LOSS){
      return;
    }
    this.countdown -= deltaTime;
    if (this.countdown <= 0){
      this.gamestate = GAMESTATES.WIN;
      this.onSuccess();
      return;
    }
    if (this.lives === 0){
      this.gamestate = GAMESTATES.LOSS;
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
