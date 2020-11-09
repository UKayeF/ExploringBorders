export function detectCollision(spaceship, gameObject) {
  const HITBOX_TOLERANCE_FRONTAL = 2;
  const HITBOX_TOLERANCE_WINGS = 4;
  const noseOfSpaceship = spaceship.position.y;
  const tailOfSpaceship = spaceship.position.y + spaceship.height;
  const leftWingOfSpaceship = spaceship.position.x;
  const rightWingOfSpaceship = spaceship.position.x + spaceship.width;

  const topOfObject = gameObject.position.y;
  const bottomOfObject = gameObject.position.y + gameObject.height;
  const leftSideOfObject = gameObject.position.x;
  const rightSideOfObject = gameObject.position.x + gameObject.width;

  const frontalCollision = (
    noseOfSpaceship + HITBOX_TOLERANCE_FRONTAL === bottomOfObject
    && rightWingOfSpaceship - HITBOX_TOLERANCE_WINGS >= leftSideOfObject
    && leftWingOfSpaceship - HITBOX_TOLERANCE_WINGS <= rightSideOfObject
  );

  if (frontalCollision) {
    return true;
  }

  const rightWingCollision = (
    rightWingOfSpaceship - HITBOX_TOLERANCE_WINGS >= leftSideOfObject
    && leftWingOfSpaceship + HITBOX_TOLERANCE_WINGS <= rightSideOfObject
    && noseOfSpaceship + HITBOX_TOLERANCE_FRONTAL <= bottomOfObject
    && tailOfSpaceship >= topOfObject
  )
  if (rightWingCollision) {
    return true;
  }

  const leftWingCollision = (
    leftWingOfSpaceship + HITBOX_TOLERANCE_WINGS <= rightSideOfObject
    && rightWingOfSpaceship - HITBOX_TOLERANCE_WINGS >= leftSideOfObject
    && noseOfSpaceship + HITBOX_TOLERANCE_FRONTAL <= bottomOfObject
    && tailOfSpaceship >= topOfObject
  )
  if (leftWingCollision) {
    return true;
  }

  return false;
}
