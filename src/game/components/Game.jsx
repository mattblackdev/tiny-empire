import React from 'react'
import { Canvas } from 'react-three-fiber'

import CameraZoom from './CameraZoom.jsx'
import CameraPan from './CameraPan.jsx'
import Trees from './Trees.jsx'

function Cube({ position, color }) {
  return (
    <mesh position={position}>
      <boxGeometry attach="geometry" args={[10, 10, 10]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

const rotation = [0.75, 0.75, 0]
const rotationSide = [0, 0, 0]
export default function Game() {
  return (
    <Canvas
      orthographic
      camera={{
        zoom: 10,
      }}
    >
      <axesHelper args={[10]} />
      <CameraZoom />
      <CameraPan />
      <group position={[5, -5, -25]} rotation={rotation}>
        <Cube position={[0, -5, 0]} color="blue" />
        <Cube position={[10, -5, 0]} color="green" />
        <Cube position={[0, -5, -10]} color="red" />
        <Cube position={[10, -5, -10]} color="yellow" />
        <Trees />
      </group>
      <directionalLight position={[1, 0, 10]} intensity={2}>
        <object3D attach="target" position={[0, 0, 0]} />
      </directionalLight>
    </Canvas>
  )
}
