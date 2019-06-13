import React from 'react'
import { useImmerReducer } from 'use-immer'
import { Canvas } from 'react-three-fiber'
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

      // console.log({ selectionIsNew, selectionMoved, selectingUnit })
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
    case 'Request frameloop': {
      draft.frameloopRequests.push(action.key)
      return
    }
    case 'Remove frameloop request': {
      pull(draft.frameloopRequests, action.key)
      return
    }
    default: {
      return
    }
  }
}

const GameStateContext = React.createContext()

function ShowRender({ invalidateFrameloop }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 40,
        left: 40,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: invalidateFrameloop ? 'transparent' : 'red',
      }}
    />
  )
}

export default function Game(props) {
  const [state, dispatch] = useImmerReducer(
    reducer,
    initialState,
    initializer(props),
  )

  const { entities, mapSize } = state
  const invalidateFrameloop = state.frameloopRequests.length === 0
  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      <Canvas
        orthographic
        camera={{
          zoom: 2,
        }}
        invalidateFrameloop={invalidateFrameloop}
      >
        <axesHelper args={[10]} />
        <CameraZoom />
        <CameraPan dispatch={dispatch} />
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
      </Canvas>
      <ShowRender invalidateFrameloop={invalidateFrameloop} />
    </GameStateContext.Provider>
  )
}
