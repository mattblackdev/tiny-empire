import flow from 'lodash/fp/flow'
import uniqueId from 'lodash/uniqueId'

import generateDefaultMap from '../generation/generateDefaultMap'
import generateTerrain from '../generation/generateTerrain'
import generateDistributedResource from '../generation/generateDistributedResource'
import forEach2D from '../../game-engine/helpers/forEach2D'
import { Terrains, Resources } from '../definitions'

const generateEntities = props => {
  const { map } = props
  const entities = {}

  forEach2D(map, tile => {
    const position = { x: tile.x, y: tile.y }
    const terrainEntityId = uniqueId()
    entities[terrainEntityId] = {
      id: terrainEntityId,
      position,
      terrain: tile.terrain,
      tileSelector: { selected: false, highlighted: false },
      actionIndicator: { visible: false, type: 'move' },
      renderer: Terrains[tile.terrain].renderer,
    }

    tile.resources.forEach(resource => {
      const entityId = uniqueId()
      entities[entityId] = {
        id: entityId,
        position,
        resource,
        renderer: Resources[resource].renderer,
      }
    })
  })

  return {
    ...props,
    entities,
  }
}

export default function generateWorld(config) {
  return flow(
    generateDefaultMap,
    generateTerrain,
    generateDistributedResource({
      resourceType: 'trees',
      terrainTypes: ['land'],
      radius: 1,
      maxAttempts: 500,
      minimumPoints: 12,
      maximumPoints: 16,
      edgeOffset: 0,
    }),
    generateEntities,
  )(config)
}
