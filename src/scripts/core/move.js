export default function move(vec, keys) {

  vec.multiplyScalar(0.7);

  if (keys.ArrowRight) {
    vec.setX(vec.x + 0.5);
  }

  if (keys.ArrowLeft) {
    vec.setX(vec.x - 0.5);
  }

  if (keys.ArrowUp) {
    vec.setY(vec.y + 0.5);
  }

  if (keys.ArrowDown) {
    vec.setY(vec.y - 0.5);
  }

  if (vec.x > -0.1 && vec.x < 0.1) {
    vec.setX(0);
  }
  if (vec.y > -0.1 && vec.y < 0.1) {
    vec.setY(0);
  }

}
