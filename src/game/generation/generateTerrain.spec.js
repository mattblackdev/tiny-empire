/// <reference types="cypress" />
import flow from 'lodash/fp/flow'
import values from 'lodash/values'

import generateTerrain from './generateTerrain'
import { Terrains } from '../definitions'
import forEach2D from '../../game-engine/helpers/forEach2D'
import generateDefaultMap from './generateDefaultMap'

describe('generateTerrain', () => {
  it('returns a 2d array of objects with terrain', () => {
    const mapSize = 8
    const { map } = flow(
      generateDefaultMap,
      generateTerrain,
    )({
      mapSize,
    })

    let i = 0
    forEach2D(map, tile => {
      i++
      expect(tile.terrain).to.be.oneOf(Object.keys(Terrains))
    })
    expect(i).to.equal(mapSize ** 2)
  })

  it('generates a decent distribution of terrain types', () => {
    const mapSize = 8
    const { map } = flow(
      generateDefaultMap,
      generateTerrain,
    )({
      mapSize,
    })

    let lastThreshold = 1.0
    const stats = values(Terrains)
      .sort((a, b) => b.threshold - a.threshold)
      .reduce((stats, terrain) => {
        const expectedRate = lastThreshold - terrain.threshold
        lastThreshold = terrain.threshold
        const distanceTo5 = Math.abs(0.5 - terrain.threshold)
        return {
          ...stats,
          [terrain.type]: {
            expectedRate,
            count: 0,
            distanceTo5,
            threshold: terrain.threshold,
          },
        }
      }, {})

    forEach2D(map, tile => stats[tile.terrain].count++)

    values(stats).forEach(stat => {
      const actualRate = stat.count / mapSize ** 2
      expect(actualRate)
        .to.be.lessThan(stat.expectedRate + 0.3)
        .and.greaterThan(stat.expectedRate - 0.3)
        .and.greaterThan(0)
      stat.actualRate = actualRate
    })
  })
})
