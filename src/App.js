import React from 'react'
import { Canvas, useRender } from 'react-three-fiber'
import { useSpring } from 'react-spring/three'

function Cube({ position, color }) {
  return (
    <mesh position={position}>
      <boxGeometry attach="geometry" args={[10, 10, 10]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

function CameraController() {
  const [{ zoom }, set] = useSpring(() => ({ zoom: -20 }))

  const handleWheel = React.useCallback(
    ({ deltaY }) => {
      const currentZoom = zoom.value
      if (
        (deltaY > 0 && currentZoom < 20) ||
        (deltaY < 0 && currentZoom > -20)
      ) {
        const clampedZoom = Math.min(20, Math.max(-20, zoom.value + deltaY))
        set({ zoom: clampedZoom })
      }
    },
    [zoom, set],
  )

  React.useEffect(() => {
    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  useRender(
    ({ camera }) => {
      const zoomValue = zoom
        .interpolate({ range: [-20, 20], output: [4, 10] })
        .calc(zoom.value)
      if (zoomValue !== camera.zoom) {
        camera.zoom = zoomValue
        camera.updateProjectionMatrix()
      }
    },
    false,
    [zoom.value],
  )

  return null
}

function App() {
  return (
    <Canvas
      orthographic
      camera={{
        zoom: 4,
      }}>
      <CameraController />
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

export default App
