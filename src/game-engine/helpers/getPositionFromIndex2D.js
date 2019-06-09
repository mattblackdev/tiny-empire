export default function getPositionFromIndex2D(i, size) {
  return {
    x: Math.floor(i / size),
    y: i % size,
  }
}
