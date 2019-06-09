/// <reference types="cypress" />
import generateDefaultMap from './generateDefaultMap'
import { DefaultTile } from '../definitions'
import flow from 'lodash/fp/flow'
import forEach2D from '../../game-engine/helpers/forEach2D'

describe('generateDefaultMap', () => {
  it('generates an array of default game tiles', () => {
    const keys = Object.keys(DefaultTile).concat('id', 'x', 'y')
    const mapSize = 2
    const { map } = flow(generateDefaultMap)({ mapSize })

    expect(map.length).to.equal(mapSize)
    forEach2D(map, (tile, x, y, i) => {
      expect(tile).to.have.keys(keys)
      expect(tile.id).to.equal(i)
      expect(tile.x).to.equal(x)
      expect(tile.y).to.equal(y)
    })
  })
})
