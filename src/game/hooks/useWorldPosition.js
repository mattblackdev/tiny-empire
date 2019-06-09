import { useMemo } from 'react'
import memoize from 'lodash/memoize'
import { TILE_SIZE } from '../constants'

function convertToWorldPosition(x, y) {
  return [x * TILE_SIZE, 0, y * TILE_SIZE]
}

const convertToWorldPositionMemoized = memoize(
  convertToWorldPosition,
  (x, y) => `${x},${y}`,
)

export default function useWorldPosition({ x, y }, height = 0) {
  return useMemo(() => {
    const worldPosition = convertToWorldPositionMemoized(x, y)
    worldPosition[1] = height
    return worldPosition
  }, [x, y, height])
}
