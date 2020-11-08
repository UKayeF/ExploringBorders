export function detectCollision(spaceship, gameObject){
  const noseOfSpaceship = spaceship.position.y;
  const tailOfSpaceship = spaceship.position.y + spaceship.height;
  const leftWingOfSpaceship = spaceship.position.x;
  const rightWingOfSpaceship = spaceship.position.x + spaceship.width;

  const topOfObject = gameObject.position.y;
  const bottomOfObject = gameObject.position.y + gameObject.height;
  const leftSideOfObject = gameObject.position.x;
  const rightSideOfObject = gameObject.position.x + gameObject.width;

  const frontalCollision = (
    noseOfSpaceship === bottomOfObject
    && rightWingOfSpaceship >= leftSideOfObject
    && leftWingOfSpaceship <= rightSideOfObject
  );

  if (frontalCollision) {
    return true;
  }

  const rightWingCollision = (
    rightWingOfSpaceship >= leftSideOfObject
    && noseOfSpaceship <= bottomOfObject
    && tailOfSpaceship >= topOfObject
  )
  if (rightWingCollision){
    return true;
  }

  const leftWingCollision = (
    leftWingOfSpaceship <= rightSideOfObject
    && noseOfSpaceship <= bottomOfObject
    && tailOfSpaceship >= topOfObject
  )
  if (leftWingCollision){
    return true;
  }

  return false;
}
