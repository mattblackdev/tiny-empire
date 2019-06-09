import SimplexNoise from 'simplex-noise'
import values from 'lodash/values'

import { Terrains } from '../definitions'
import map2D from '../../game-engine/helpers/map2D'

export default function generateTerrain(props) {
  const { map, mapSize, terrainsDefinition = Terrains } = props

  const simplex = new SimplexNoise(Math.random)
  const scale1 = mapSize * 0.875
  const scale2 = mapSize * 0.375

  const terrains = values(terrainsDefinition).sort(
    (a, b) => b.threshold - a.threshold,
  )

  return {
    ...props,
    map: map2D(map, (tile, x, y) => {
      const noise =
        (simplex.noise2D(x / scale1, y / scale1) * 0.5 + 0.5) * 0.5 +
        (simplex.noise2D(x / scale2, y / scale2) * 0.5 + 0.5) * 0.5
      tile.terrain = terrains.find(t => t.threshold < noise).type

      return tile
    }),
  }
}
