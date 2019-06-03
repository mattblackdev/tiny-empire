import React from 'react'

import generateTerrain from '../generation/generateTerrain'
import { Terrains } from '../definitions'
import Trees from './Trees.jsx'

function Cube({ position, color }) {
  return (
    <mesh position={position}>
      <boxGeometry attach="geometry" args={[10, 10, 10]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

const rotation = [0.75, 0.75, 0]
const rotationSide = [0, 0, 0]
const mapScale = 16
const size = 10
const yPos = -5

export default function World() {
  const map = React.useMemo(() => {
    const terrain = generateTerrain({ mapScale })
    const map = []
    for (let x = 0; x < mapScale; x++) {
      for (let z = 0; z < mapScale; z++) {
        const color = Terrains[terrain[x][z]].color
        map.push(
          <Cube
            key={x + 1 + z * mapScale}
            position={[x * size, yPos, z * size]}
            color={color}
          />,
        )
      }
    }
    return map
  }, [])

  return (
    <React.Fragment>
      <group
        position={[5, -5, (mapScale * mapScale * -1) / 2]}
        rotation={rotation}
      >
        {map}
        <Trees />
      </group>
      <directionalLight position={[1, 0, 10]} intensity={2}>
        <object3D attach="target" position={[0, 0, 0]} />
      </directionalLight>
    </React.Fragment>
  )
}
