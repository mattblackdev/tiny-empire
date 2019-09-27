import React from 'react'
import { useImmerReducer } from 'use-immer'
import { Canvas, useRender } from 'react-three-fiber'
import pull from 'lodash/pull'

import generateWorld from '../generation/generateWorld'
import CameraZoom from './CameraZoom.jsx'
import CameraPan from './CameraPan.jsx'
import World from './World.jsx'

const initialState = {
  entities: {},
  selection: null,
  frameloopRequests: [],
}

const initializer = props => initialState =>
  generateWorld({ ...initialState, ...props })

function reducer(draft, action) {
  // console.log(action)
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
    default: {
      return
    }
  }
}

const GameStateContext = React.createContext()

function LogRender() {
  useRender(() => {
    console.log('rendering')
  })
  return null
}

export default function Game(props) {
  const [state, dispatch] = useImmerReducer(
    reducer,
    initialState,
    initializer(props),
  )

  const { entities, mapSize } = state
  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      <Canvas orthographic invalidateFrameloop>
        <CameraZoom />
        <CameraPan />
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
        <axesHelper args={[10]} />
        {/* <LogRender /> */}
      </Canvas>
    </GameStateContext.Provider>
  )
}
