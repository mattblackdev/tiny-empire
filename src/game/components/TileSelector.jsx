import React from 'react'
import { Geometry, Vector3, Face3, DoubleSide } from 'three'
import { TILE_SIZE } from '../constants'
import { invalidate } from 'react-three-fiber'

export default function TileSelector({ selected, highlighted }) {
  const selectorGeometry = React.useMemo(() => {
    const selectorGeometry = new Geometry()
    const min = 0
    const max = TILE_SIZE
    const innerMin = max * 0.2
    const innerMax = max - innerMin
    const vertices = [
      [min, max],
      [max, max],
      [innerMin, innerMax],
      [innerMax, innerMax],
      [innerMin, innerMin],
      [innerMax, innerMin],
      [min, min],
      [max, min],
    ]

    const offset = TILE_SIZE * 0.5
    vertices.forEach(vert =>
      selectorGeometry.vertices.push(
        new Vector3(vert[0] - offset, 0, -vert[1] + offset),
      ),
    )

    // 0          1
    //   2      3
    //
    //   4      5
    // 6          7

    const faces = [
      [0, 1, 2],
      [1, 2, 3],
      [1, 3, 5],
      [1, 5, 7],
      [4, 5, 6],
      [5, 6, 7],
      [0, 2, 4],
      [0, 4, 6],
    ]
    faces.forEach(face =>
      selectorGeometry.faces.push(new Face3(face[0], face[1], face[2])),
    )
    return selectorGeometry
  }, [])

  if (!selected) return null
  invalidate()
  return (
    <mesh geometry={selectorGeometry} position={[0, 0.01, 0]}>
      <meshBasicMaterial
        attach="material"
        color={highlighted ? 0x3399ff : 0x777777}
        opacity={highlighted ? 0.5 : 0.4}
        side={DoubleSide}
        // onUpdate={self => (self.depthTest = false)}
      />
    </mesh>
  )
}
