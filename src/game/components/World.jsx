import React, { Fragment } from 'react'

import calcHypotenuse from '../../game-engine/helpers/calcHypotenuse'
import { TILE_SIZE } from '../constants'
import generateWorld from '../generation/generateWorld'

const rotation = [0.75, 0.75, 0]
// const rotationSide = [0, 0, 0]

const initialState = {
  entities: {},
}

const initializer = props => () => generateWorld(props)

function reducer(state, action) {
  console.log(action)
  return state
}

const GameStateContext = React.createContext()

export default function World(props) {
  const { mapSize } = props
  const [state, dispatch] = React.useReducer(
    reducer,
    initialState,
    initializer(props),
  )
  const mapXOffset = React.useMemo(
    () => calcHypotenuse(mapSize * TILE_SIZE, mapSize * TILE_SIZE) / -2,
    [mapSize],
  )

  const { entities } = state

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      <group position={[mapXOffset, 0, mapXOffset]} rotation={rotation}>
        {Object.keys(entities)
          .filter(key => entities[key].renderer)
          .map(key => {
            const entity = entities[key]
            if (typeof entity.renderer === 'object')
              return (
                <entity.renderer.type
                  key={key}
                  dispatch={dispatch}
                  {...entity}
                />
              )
            else if (typeof entity.renderer === 'function')
              return (
                <entity.renderer key={key} {...entity} dispatch={dispatch} />
              )
            else return null
          })}
      </group>
      <directionalLight position={[1, 0, 10]} intensity={2}>
        <object3D attach="target" position={[0, 0, 0]} />
      </directionalLight>
    </GameStateContext.Provider>
  )
}
