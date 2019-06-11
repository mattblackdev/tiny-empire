import React from 'react'
import * as THREE from 'three'
import { useRender } from 'react-three-fiber'

export default function CameraPan({ dispatch, frameloopIsInvalidated }) {
  const pan = React.useRef({ x: 0, y: 0 })

  const handleMouse = React.useCallback(
    ({ clientX, clientY }) => {
      const triggerX = window.innerWidth * 0.2
      const triggerLeft = 0 + triggerX
      const triggerRight = window.innerWidth - triggerX

      const triggerY = window.innerHeight * 0.2
      const triggerTop = 0 + triggerY
      const triggerBottom = window.innerHeight - triggerY

      let x = 0
      if (clientX < triggerLeft) {
        x = THREE.Math.smoothstep(triggerLeft - clientX, 0, triggerX) * -2
      } else if (clientX > triggerRight) {
        x = THREE.Math.smoothstep(clientX - triggerRight, 0, triggerX) * 2
      }
      let y = 0
      if (clientY < triggerTop) {
        y = THREE.Math.smoothstep(triggerTop - clientY, 0, triggerY) * 2
      } else if (clientY > triggerBottom) {
        y = THREE.Math.smoothstep(clientY - triggerBottom, 0, triggerY) * -2
      }

      pan.current.x = x
      pan.current.y = y
      if (x !== 0 || y !== 0) {
        dispatch({ type: 'Invalidate Frameloop', invalidateFrameloop: false })
      } else if (!frameloopIsInvalidated) {
        console.log('should not')
        dispatch({
          type: 'Invalidate Frameloop',
          invalidateFrameloop: true,
        })
      }
    },
    [frameloopIsInvalidated, dispatch],
  )

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  })

  useRender(({ camera }) => {
    const shouldPanX =
      (pan.current.x < 0 && camera.position.x > -90) ||
      (pan.current.x > 0 && camera.position.x < 90)
    const shouldPanY =
      (pan.current.y < 0 && camera.position.y > -90) ||
      (pan.current.y > 0 && camera.position.y < 90)

    if (shouldPanX) {
      const min = (90 + camera.position.x) * -1
      const max = 90 - camera.position.x
      const translateX = THREE.Math.clamp(pan.current.x, min, max)
      camera.translateX(translateX)
    }
    if (shouldPanY) {
      const min = (90 + camera.position.y) * -1
      const max = 90 - camera.position.y
      const translateY = THREE.Math.clamp(pan.current.y, min, max)
      camera.translateY(translateY)
    }
  })

  return null
}
