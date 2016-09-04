export default function move(character, keys) {
  if (keys.ArrowRight) {
    character.position.x += 15;
  }
  if (keys.ArrowLeft) {
    character.position.x -= 15;
  }
  if (keys.ArrowUp) {
    character.position.y += 15;
  }
  if (keys.ArrowDown) {
    character.position.y -= 15;
  }
}
