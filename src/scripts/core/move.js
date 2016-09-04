import {Vector2} from 'three.cjs';

export default function move(keys) {
  const vec = new Vector2(0, 0);

  if (keys.ArrowRight) {
    vec.setX(1);
  }
  if (keys.ArrowLeft) {
    vec.setX(-1);
  }
  if (keys.ArrowUp) {
    vec.setY(1);
  }
  if (keys.ArrowDown) {
    vec.setY(-1);
  }

  return vec.normalize();
}
