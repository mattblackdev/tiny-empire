import React from 'react'
import { Vector3 } from 'three'
import { useRender, useThree } from 'react-three-fiber'
import { useSpring } from 'react-spring/three'

const PointerStates = {
  UP: 'UP',
  DOWN: 'DOWN',
  DRAGGING: 'DRAGGING',
}

function getCameraPosition(camera) {
  return new Vector3(camera.position.x, camera.position.y, camera.position.z)
}

function getPointerPosition(e, camera) {
  return new Vector3(
    (e.clientX / window.innerWidth) * 2 - 1,
    -(e.clientY / window.innerHeight) * 2 + 1,
    -1,
  ).unproject(camera)
}

function getLastDragMovement(e) {
  return {
    x: e.movementX,
    y: e.movementY,
  }
}

function getExtrapolatedPointerPosition(e, lastMovement, camera) {
  return new Vector3(
    ((e.clientX + lastMovement.x * 5) / window.innerWidth) * 2 - 1,
    -((e.clientY + lastMovement.y * 5) / window.innerHeight) * 2 + 1,
    -1,
  ).unproject(camera)
}

function getCameraDestinationPosition(sourceStart, sourceEnd, targetStart) {
  return {
    x: targetStart.x + sourceStart.x - sourceEnd.x,
    y: targetStart.y + sourceStart.y - sourceEnd.y,
  }
}

export default function CameraPan() {
  const { camera, canvas, invalidate } = useThree()
  const pointerState = React.useRef(PointerStates.UP)
  const cameraStartPosition = React.useRef(getCameraPosition(camera))
  const dragStartPosition = React.useRef(null)
  const lastDragMovement = React.useRef(null)

  const [{ x, y }, setCameraDesitinationPosition] = useSpring(() => ({
    x: 0,
    y: 0,
    onFrame: () => {
      invalidate()
    },
  }))

  const handleDown = React.useCallback(
    e => {
      if (pointerState.current === PointerStates.UP) {
        cameraStartPosition.current = getCameraPosition(camera)
        dragStartPosition.current = getPointerPosition(e, camera)
        pointerState.current = PointerStates.DOWN
      }
    },
    [camera],
  )

  const handleMove = React.useCallback(
    e => {
      switch (pointerState.current) {
        case PointerStates.DRAGGING: {
          lastDragMovement.current = getLastDragMovement(e)
          const dragPosition = getPointerPosition(e, camera)
          return void setCameraDesitinationPosition(
            getCameraDestinationPosition(
              dragStartPosition.current,
              dragPosition,
              cameraStartPosition.current,
            ),
          )
        }
        case PointerStates.DOWN: {
          return void (pointerState.current = PointerStates.DRAGGING)
        }
        default: {
          return
        }
      }
    },
    [camera, setCameraDesitinationPosition],
  )

  const handleUp = React.useCallback(
    e => {
      if (pointerState.current === PointerStates.DRAGGING) {
        const dragPosition = getExtrapolatedPointerPosition(
          e,
          lastDragMovement.current,
          camera,
        )
        setCameraDesitinationPosition(
          getCameraDestinationPosition(
            dragStartPosition.current,
            dragPosition,
            cameraStartPosition.current,
          ),
        )
        e.stopPropagation()
      }
      pointerState.current = PointerStates.UP
    },
    [camera, setCameraDesitinationPosition],
  )

  React.useEffect(() => {
    canvas.addEventListener('pointerdown', handleDown)
    canvas.addEventListener('pointermove', handleMove)
    canvas.addEventListener('pointerup', handleUp)
    return () => {
      canvas.removeEventListener('pointerdown', handleDown)
      canvas.removeEventListener('pointermove', handleMove)
      canvas.removeEventListener('pointerup', handleUp)
    }
  }, [canvas, handleDown, handleMove, handleUp])

  useRender(
    ({ camera }) => {
      if (camera.position.x !== x.value || camera.position.y !== y.value) {
        camera.position.set(x.value, y.value, camera.position.z)
      }
    },
    false,
    [x, y],
  )

  return null
}
