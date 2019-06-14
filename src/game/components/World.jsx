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
      <ambientLight color={0x404040} intensity={0.1} />
      <hemisphereLight
        skyColor={0xaaaabb}
        groundColor={0x555520}
        intensity={0.2}
      />
      <directionalLight
        position={[0, TILE_SIZE * 3, -mapXOffset]}
        intensity={0.8}
      >
        <object3D attach="target" position={[0, 0, 0]} />
      </directionalLight>
    </group>
  )
}
