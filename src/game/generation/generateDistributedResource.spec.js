///<reference types="cypress" />
import flow from 'lodash/fp/flow'
import { Vector2 } from 'three'

import generateDistributedResource from './generateDistributedResource'
import generateDefaultMap from './generateDefaultMap'
import generateTerrain from './generateTerrain'
import filter2D from '../../game-engine/helpers/filter2D'

describe('generateDistibutedResource', () => {
  it('generates evenly distributed resources on a map', () => {
    const resourceType = 'camp'
    const radius = 3
    const mapSize = 8
    const terrainTypes = ['land']
    const minimumPoints = 4
    const maximumPoints = 8
    const { map } = flow(
      generateDefaultMap,
      generateTerrain,
      generateDistributedResource({
        resourceType,
        terrainTypes,
        radius,
        maxAttempts: 500,
        minimumPoints,
        maximumPoints,
        edgeOffset: 0,
      }),
    )({
      mapSize,
    })

    const distributedPoints = filter2D(map, tile =>
      tile.resources.includes(resourceType),
    )

    expect(distributedPoints.length).to.be.at.least(minimumPoints)
    expect(distributedPoints.length).to.be.at.most(maximumPoints)

    distributedPoints.forEach((p1, i) => {
      const terrain = map[p1.x][p1.y].terrain

      expect(terrain).to.be.oneOf(terrainTypes)

      for (let i2 = distributedPoints.length - 1; i2 > i; i2--) {
        const p2 = distributedPoints[i2]
        const distance = Math.ceil(
          new Vector2(p1.x, p1.y).distanceTo(new Vector2(p2.x, p2.y)),
        )

        expect(distance).to.be.at.least(radius)
      }
    })
  })
})
