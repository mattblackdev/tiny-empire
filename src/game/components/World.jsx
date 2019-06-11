import React from 'react'

import calcHypotenuse from '../../game-engine/helpers/calcHypotenuse'
import { TILE_SIZE } from '../constants'

const rotation = [0.75, 0.75, 0]

export default function World(props) {
  const { mapSize, children } = props

  const mapXOffset = React.useMemo(
    () => calcHypotenuse(mapSize * TILE_SIZE, mapSize * TILE_SIZE) / -2,
    [mapSize],
  )

  return (
    <group>
      <group position={[mapXOffset, 0, mapXOffset]} rotation={rotation}>
        {children}
      </group>
      <directionalLight position={[1, 0, 10]} intensity={2}>
        <object3D attach="target" position={[0, 0, 0]} />
      </directionalLight>
    </group>
  )
}
