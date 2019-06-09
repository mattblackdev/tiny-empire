import React from 'react'
import { Terrains } from '../definitions'
import { TILE_SIZE } from '../constants'
import useWorldPosition from '../hooks/useWorldPosition'

export default function Terrain({ id, position, terrain, dispatch }) {
  const worldPosition = useWorldPosition(position, -5)
  const color = Terrains[terrain].color

  return (
    <mesh
      position={worldPosition}
      onPointerUp={e => {
        // Only the mesh closest to the camera will be processed
        e.stopPropagation()
        // You may optionally capture the target
        // e.target.setPointerCapture(e.pointerId)
        console.log(`pointer up! ${position.x}, ${position.y}`)
        dispatch({
          type: 'hello',
          position,
        })
      }}
    >
      <boxGeometry attach="geometry" args={[TILE_SIZE, TILE_SIZE, TILE_SIZE]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}
