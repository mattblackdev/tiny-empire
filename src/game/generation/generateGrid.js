import _cloneDeep from 'lodash/cloneDeep'
import { DefaultTile } from '../definitions'

export default function generateGrid({ mapScale = 16 }) {
  const grid = []
  for (let j = 0; j < mapScale; j++) {
    grid.push([])
    for (let k = 0; k < mapScale; k++) {
      grid[j].push({
        id: j * mapScale + k,
        ..._cloneDeep(DefaultTile),
      })
    }
  }
  return grid
}
