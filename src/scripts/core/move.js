export default function move(vec, keys) {

  if (keys.ArrowRight) {
    vec.setX(vec.x + 0.4);
  }

  if (keys.ArrowLeft) {
    vec.setX(vec.x - 0.4);
  }

  if (keys.ArrowUp) {
    vec.setY(vec.y + 0.4);
  }

  if (keys.ArrowDown) {
    vec.setY(vec.y - 0.4);
  }

  vec.multiplyScalar(0.8);

  if (vec.x > -0.1 && vec.x < 0.1) {
    vec.setX(0);
  }
  if (vec.y > -0.1 && vec.y < 0.1) {
    vec.setY(0);
  }

}
