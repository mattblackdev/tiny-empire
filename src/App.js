import React from 'react'

import Game from './game/components/Game.jsx'
import Sandbox from './game/components/Sandbox.jsx'
import Terrain from './game/components/Terrain.jsx'

export default function App() {
  return <Game mapSize={16} />
  // return (
  //   <Sandbox>
  //     <Terrain
  //       position={{ x: 0, y: 0 }}
  //       terrain="land"
  //       tileSelector={{ selected: true, highlighted: false }}
  //     />
  //   </Sandbox>
  // )
}
