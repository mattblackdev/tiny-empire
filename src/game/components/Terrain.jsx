import React from 'react'
import { Terrains } from '../definitions'
import { TILE_SIZE } from '../constants'
import useWorldPosition from '../hooks/useWorldPosition'
import TileSelector from './TileSelector'

const yPos = TILE_SIZE / -2

export default function Terrain({
  id,
  position,
  terrain,
  tileSelector,
  dispatch,
}) {
  const worldPosition = useWorldPosition(position)
  const color = Terrains[terrain].color
  return (
    <group position={worldPosition}>
      <mesh
        position={[0, yPos, 0]}
        onPointerUp={e => {
          e.stopPropagation()
          dispatch({
            type: 'Pointer Up On Entity',
            terrainEntityId: id,
            position,
          })
        }}
      >
        <boxGeometry
          attach="geometry"
          args={[TILE_SIZE, TILE_SIZE, TILE_SIZE]}
        />
        <meshLambertMaterial attach="material" color={color} />
      </mesh>
      <TileSelector {...tileSelector} />
    </group>
  )
}
