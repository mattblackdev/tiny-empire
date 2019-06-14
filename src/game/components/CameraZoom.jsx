import React from 'react'
import { useRender, useThree } from 'react-three-fiber'
import { useSpring } from 'react-spring/three'

export default function CameraZoom() {
  const { canvas, invalidate } = useThree()
  const [{ zoom }, set] = useSpring(() => ({
    zoom: -10,
    onFrame: () => invalidate(),
  }))

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
    canvas.addEventListener('wheel', handleWheel)
    return () => canvas.removeEventListener('wheel', handleWheel)
  }, [handleWheel, canvas])

  useRender(
    ({ camera }) => {
      const zoomValue = zoom
        .interpolate({ range: [-20, 20], output: [2, 16] })
        .calc(zoom.value)
      if (zoomValue !== camera.zoom) {
        camera.zoom = zoomValue
        camera.updateProjectionMatrix()
      }
    },
    false,
    [zoom],
  )

  return null
}
