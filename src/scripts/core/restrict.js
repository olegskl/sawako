export function dimensions(fov, aspectRatio) {
  const vFOV = fov * Math.PI / 180;
  const height = 2 * Math.tan(vFOV / 2) * 1000;
  const width = height * aspectRatio;
  return {width, height};
}

export function restrict(position, xMax, yMax) {
  if (position.x > xMax) {
    position.x = xMax;
  } else if (position.x < -xMax) {
    position.x = -xMax;
  }
  if (position.y > yMax) {
    position.y = yMax;
  } else if (position.y < -yMax) {
    position.y = -yMax;
  }
}
