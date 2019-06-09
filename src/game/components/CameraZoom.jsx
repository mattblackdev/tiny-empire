import React from 'react'
import { useRender } from 'react-three-fiber'
import { useSpring } from 'react-spring/three'

export default function CameraZoom() {
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
    ({ camera, invalidate }) => {
      invalidate()
      const zoomValue = zoom
      .interpolate({ range: [-20, 20], output: [2, 16] })
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
