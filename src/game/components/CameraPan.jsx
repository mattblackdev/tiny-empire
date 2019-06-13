import React from 'react'
import { Vector3 } from 'three'
import { useRender, useThree } from 'react-three-fiber'
import { useSpring } from 'react-spring/three'
import { useImmerReducer } from 'use-immer'

const initialState = {
  pointerDown: false,
  dragging: false,
}

function reducer(draft, action) {
  switch (action.type) {
    case 'Pointer down': {
      draft.pointerDown = true
      return
    }
    case 'Pointer dragging': {
      draft.dragging = true
      return
    }
    case 'Pointer up': {
      draft.dragging = false
      draft.pointerDown = false
      return
    }
    default: {
      return
    }
  }
}

export default function CameraPan({ dispatch }) {
  const { camera, canvas } = useThree()
  const targetStartPosition = React.useRef({})
  const dragStartPosition = React.useRef({})
  const [state, localDispatch] = useImmerReducer(reducer, initialState)
  const [{ x, y }, set] = useSpring(() => ({
    x: 0,
    y: 0,
    onRest: () => {
      dispatch({
        type: 'Remove frameloop request',
        key: 'camera pan',
      })
    },
  }))

  const handleDown = React.useCallback(
    e => {
      targetStartPosition.current = new Vector3(
        camera.position.x,
        camera.position.y,
        camera.position.z,
      )
      dragStartPosition.current = new Vector3(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
        1,
      ).unproject(camera)
      localDispatch({
        type: 'Pointer down',
      })
    },
    [localDispatch, targetStartPosition, camera],
  )

  const handleMove = React.useCallback(
    e => {
      if (state.dragging) {
        const dragPosition = new Vector3(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1,
          1,
        ).unproject(camera)

        const x =
          targetStartPosition.current.x +
          dragStartPosition.current.x -
          dragPosition.x

        const y =
          targetStartPosition.current.y +
          dragStartPosition.current.y -
          dragPosition.y
        // console.log({ targetStartPosition: targetStartPosition.current.x })
        set({ x, y })
      } else if (state.pointerDown) {
        dispatch({
          type: 'Request frameloop',
          key: 'camera pan',
        })
        localDispatch({
          type: 'Pointer dragging',
        })
      }
    },
    [
      dispatch,
      localDispatch,
      state,
      camera,
      dragStartPosition,
      targetStartPosition,
      set,
    ],
  )

  const handleUp = React.useCallback(
    e => {
      if (state.dragging) {
        e.stopPropagation()
        targetStartPosition.current = new Vector3(
          camera.position.x,
          camera.position.y,
          camera.position.z,
        )
      }
      localDispatch({ type: 'Pointer up' })
    },
    [localDispatch, state, camera],
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
      if (state.dragging) {
        camera.position.set(x.value, y.value, camera.position.z)
      }
    },
    false,
    [x, y, state],
  )
  return null
}
