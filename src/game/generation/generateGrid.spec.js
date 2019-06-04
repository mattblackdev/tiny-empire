import generateGrid from './generateGrid'
import { DefaultTile } from '../definitions'

describe('generateGrid', () => {
  it('generates a 2d array of default tiles with an id', () => {
    const mapScale = 2
    const grid = generateGrid({ mapScale })
    const keys = Object.keys(DefaultTile).concat('id')

    expect(grid.length).to.equal(mapScale)
    grid.forEach(column => {
      expect(column.length).to.equal(mapScale)
      column.forEach(tile => {
        expect(tile).to.have.keys(keys)
      })
    })
  })
})
