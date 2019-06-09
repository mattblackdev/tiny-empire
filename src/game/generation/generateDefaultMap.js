import flow from 'lodash/fp/flow'
import times from 'lodash/fp/times'
import chunk from 'lodash/fp/chunk'
import cloneDeep from 'lodash/cloneDeep'

import { DefaultTile } from '../definitions'
import getPositionFromIndex2D from '../../game-engine/helpers/getPositionFromIndex2D'

export default function generateDefaultMap(config) {
  const { mapSize } = config
  return {
    ...config,
    map: flow(
      times(i => ({
        id: i,
        ...cloneDeep(DefaultTile),
        ...getPositionFromIndex2D(i, mapSize),
      })),
      chunk(mapSize),
    )(mapSize ** 2),
  }
}
