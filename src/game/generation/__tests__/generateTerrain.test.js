import generateTerrain from '../generateTerrain'
import { Terrains } from '../../definitions'

describe('generateTerrain', () => {
  it('returns a 2D array of terrain keys', () => {
    const mapScale = 16
    const map = generateTerrain({ mapScale })
    let i = 0
    map.forEach(column =>
      column.forEach(terrain => {
        i++
        expect(terrain).toBeOneOf(Object.keys(Terrains))
      }),
    )
    expect(i).toBe(mapScale * mapScale)
  })
})
