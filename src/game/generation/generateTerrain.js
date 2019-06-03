import SimplexNoise from 'simplex-noise'
import _values from 'lodash/values'
// import poissonDiscSampler from 'poisson-disc-sampler'

import { Terrains } from '../definitions'

export default function generateTerrain({
  mapScale,
  terrainsDefinition = Terrains,
}) {
  const simplex = new SimplexNoise(Math.random)
  const scale1 = mapScale * 0.875
  const scale2 = mapScale * 0.375

  const map = []
  const terrains = _values(terrainsDefinition).sort(
    (a, b) => b.threshold - a.threshold,
  )
  console.log(terrains)

  for (let x = 0; x < mapScale; x++) {
    const column = []
    for (let y = 0; y < mapScale; y++) {
      const noise =
        (simplex.noise2D(x / scale1, y / scale1) * 0.5 + 0.5) * 0.5 +
        (simplex.noise2D(x / scale2, y / scale2) * 0.5 + 0.5) * 0.5
      const terrain = terrains.find(t => t.threshold < noise).type
      // console.log({ noise, terrain })
      column.push(terrain)
    }
    map.push(column)
  }

  return map
}
