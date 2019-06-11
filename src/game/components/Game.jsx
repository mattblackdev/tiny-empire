import React from 'react'
import { useImmerReducer } from 'use-immer'
import { Canvas, useRender } from 'react-three-fiber'

import generateWorld from '../generation/generateWorld'
import CameraZoom from './CameraZoom.jsx'
import CameraPan from './CameraPan.jsx'
import World from './World.jsx'

const initialState = {
  entities: {},
  selection: null,
  invalidateFrameloop: true,
}

const initializer = props => initialState =>
  generateWorld({ ...initialState, ...props })

function reducer(draft, action) {
  switch (action.type) {
    case 'Pointer Up On Entity': {
      const unitOnTile = Object.values(draft.entities).find(
        entity =>
          entity.resource === 'trees' &&
          entity.position.x === action.position.x &&
          entity.position.y === action.position.y,
      )

      const selectionIsNew = !draft.selection
      const selectionMoved =
        !!draft.selection &&
        draft.selection.terrainEntityId !== action.terrainEntityId
      const selectingUnit =
        !!unitOnTile &&
        (selectionIsNew || selectionMoved || !Boolean(draft.selection.unit))

      console.log({ selectionIsNew, selectionMoved, selectingUnit })
      if (selectionMoved) {
        draft.entities[
          draft.selection.terrainEntityId
        ].tileSelector.selected = false
      }
      draft.selection = {
        terrainEntityId: action.terrainEntityId,
        unit: selectingUnit,
      }
      draft.entities[action.terrainEntityId].tileSelector = {
        selected: true,
        highlighted: selectingUnit,
      }
      return
    }
    case 'Invalidate Frameloop': {
      draft.invalidateFrameloop = action.invalidateFrameloop
      return
    }
    default: {
      return
    }
  }
}

const GameStateContext = React.createContext()

function CheckRender() {
  useRender(() => {
    console.log('hi')
  })
  return null
}

export default function Game(props) {
  const [state, dispatch] = useImmerReducer(
    reducer,
    initialState,
    initializer(props),
  )
  console.log(state.selection)

  const { entities, mapSize } = state

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      <Canvas
        orthographic
        camera={{
          zoom: 2,
        }}
        invalidateFrameloop={state.invalidateFrameloop}
      >
        <axesHelper args={[10]} />
        <CameraZoom />
        <CameraPan
          dispatch={dispatch}
          frameloopIsInvalidated={state.invalidateFrameloop}
        />
        <World mapSize={mapSize}>
          {Object.keys(entities)
            .filter(key => entities[key].renderer)
            .map(key => {
              const entity = entities[key]
              return (
                <entity.renderer key={key} {...entity} dispatch={dispatch} />
              )
            })}
        </World>
        <CheckRender />
      </Canvas>
    </GameStateContext.Provider>
  )
}
