import React from 'react'
import { Canvas } from 'react-three-fiber'

export default function Sandbox({
  zoom = 20,
  cameraPosition = [0, 0, 10],
  orthographic = true,
  children,
}) {
  return (
    <Canvas
      orthographic={orthographic}
      camera={{
        zoom,
        position: cameraPosition,
      }}
      invalidateFrameloop
    >
      <axesHelper args={[10]} />
      {children}
    </Canvas>
  )
}
