import poissonDiscSampler from 'poisson-disc-sampler'

export default function generateDistributedResource({
  resourceType = 'camp',
  terrainTypes = ['land'],
  radius = 3,
  maxAttempts = 500,
  minimumPoints = 4,
  maximumPoints = 8,
  edgeOffset = 0,
  removeExistingResources = false,
}) {
  return function(props) {
    const { map, mapSize } = props
    // Get an evenly distributed set of points to plot
    // 1) Collect poissoin-disc samples on land
    // 2) If it is the best set so far, store it
    // 3) Repeat [maxAttempts] times
    let bestPoints = []
    for (let attempts = 0; attempts < maxAttempts; attempts++) {
      let samples = []

      const sampler = poissonDiscSampler(
        mapSize - edgeOffset * 2,
        mapSize - edgeOffset * 2,
        radius,
      )

      let sample
      while ((sample = sampler())) {
        const x = Math.floor(sample[0]) + edgeOffset
        const y = Math.floor(sample[1]) + edgeOffset
        if (!terrainTypes.length || terrainTypes.includes(map[x][y].terrain)) {
          samples.push({ x, y })
        }
      }

      if (
        samples.length > minimumPoints &&
        samples.length > bestPoints.length
      ) {
        bestPoints = samples
      }
    }

    if (!bestPoints.length) {
      throw new Error(
        `Could not generate distributed points for: ${resourceType}`,
      )
    }

    if (maximumPoints > 0 && bestPoints.length > maximumPoints) {
      // Remove random elements
      for (let i = bestPoints.length - 1; i >= maximumPoints; i--) {
        bestPoints.splice(Math.floor(Math.random() * bestPoints.length), 1)
      }
    }

    bestPoints.forEach(({ x, y }) => {
      if (removeExistingResources) {
        map[x][y].resources = [resourceType]
      } else {
        map[x][y].resources.push(resourceType)
      }
    })

    return props
  }
}
//   // Select the tribes
//   // 1) Select player tribe
//   // 2) Randomly select a unique tribes
//   const tribes = [{ ...Tribes[playerTribe], isPlayer: true }]
//   const availableTribes = TribesMeta.ids.filter(id => id !== playerTribe)
//   for (let i = 0; i < numberOfOpponents; i++) {
//     const randomIndex = _random(0, availableTribes.length - 1)
//     const randomTribeId = availableTribes[randomIndex]
//     _pull(availableTribes, randomTribeId)
//     tribes.push({ ...Tribes[randomTribeId] })
//   }

//   // Randomly select tribe start location
//   const availableCamps = [...bestCampPoints]
//   tribes.forEach(tribe => {
//     const randomIndex = _random(0, availableCamps.length - 1)
//     const [[x, y]] = _pullAt(availableCamps, randomIndex)
//     const tile = this.map[x][y]
//     const city = { ...Structure.city }
//     const startingUnit = { ...Units[tribe.startingUnitId], tribe, tile }
//     tile.resource = undefined
//     tile.structure = city
//     tile.tribe = tribe
//     tile.unit = startingUnit
//     tribe.units = []
//     // call stack exceeded
//     // tribe.units.push(startingUnit)
//   })

//   this.tribes = tribes
// }
