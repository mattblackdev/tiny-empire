import calcHypotenuse from './calcHypotenuse'

export default function calcMapXOffset({ mapScale, tileSize }) {
  return calcHypotenuse(mapScale * tileSize, mapScale * tileSize) / -2
}
