import React from 'react'
import useWorldPosition from '../hooks/useWorldPosition'

export default function Camp({ position }) {
  const worldPosition = useWorldPosition(position)
  console.log({ position: worldPosition })
  return (
    <mesh position={worldPosition}>
      <mesh>
        <meshLambertMaterial attach="material" color="red" />
        <boxGeometry attach="geometry" args={[2, 2, 2]} />
      </mesh>
    </mesh>
  )
}
