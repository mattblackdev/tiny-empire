import React from 'react'
import { Canvas } from 'react-three-fiber'

import CameraZoom from './CameraZoom.jsx'
import CameraPan from './CameraPan.jsx'

function Cube({ position, color }) {
  return (
    <mesh position={position}>
      <boxGeometry attach="geometry" args={[10, 10, 10]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

export default function Game() {
  return (
    <Canvas
      orthographic
      camera={{
        zoom: 4,
      }}>
      <CameraZoom />
      <CameraPan />
      <group position={[0, 0, -20]} rotation={[90, 0, 45]}>
        <Cube position={[0, 0, 0]} color="blue" />
        <Cube position={[10, 0, 0]} color="green" />
        <Cube position={[0, -10, 0]} color="red" />
        <Cube position={[10, -10, 0]} color="yellow" />
      </group>
      <directionalLight position={[100, 100, 100]} intensity={2}>
        <object3D attach="target" position={[90, -10, -100]} />
      </directionalLight>
    </Canvas>
  )
}
