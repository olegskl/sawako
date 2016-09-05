/* eslint complexity: 1 */

import {Vector2} from 'three.cjs';

const targetVec = new Vector2(0, 0);

export default function move(vec, keys) {
  const {ArrowUp, ArrowDown, ArrowLeft, ArrowRight} = keys;

  if (!ArrowUp && !ArrowDown && !ArrowLeft && !ArrowRight) {
    // Decelerate hard when player isn't trying to move:
    vec.lerp(targetVec, 0.5);
    return;
  }

  if (ArrowRight && ArrowLeft) {
    targetVec.setX(0);
  } else if (ArrowRight) {
    targetVec.setX(1);
  } else if (ArrowLeft) {
    targetVec.setX(-1);
  }

  if (ArrowUp && ArrowDown) {
    targetVec.setY(0);
  } else if (ArrowUp) {
    targetVec.setY(1);
  } else if (ArrowDown) {
    targetVec.setY(-1);
  }

  // Ensure that vertical and horizontal speeds
  // don't stack when moving diagonally:
  targetVec.normalize();

  // Accelerate slowly:
  vec.lerp(targetVec, 0.3);

  // Resetting the target vector to make it ready
  // for the next game loop iteration:
  targetVec.set(0, 0);
}
