import React from 'react'
import { Canvas } from 'react-three-fiber'

import CameraZoom from './CameraZoom.jsx'
import CameraPan from './CameraPan.jsx'
import World from './World.jsx'

export default function Game() {
  return (
    <Canvas
      orthographic
      camera={{
        zoom: 2,
      }}
    >
      <axesHelper args={[10]} />
      <CameraZoom />
      <CameraPan />
      <World />
    </Canvas>
  )
}
