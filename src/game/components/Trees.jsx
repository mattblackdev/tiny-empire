import React from 'react'
import * as THREE from 'three'

const color = 0x005500

export default function Trees() {
  const treesGeometry = React.useMemo(
    () =>
      [[-1, 0, 0], [1, 0, 1]].reduce((groupGeo, treePosition) => {
        const treeGeo = new THREE.Geometry()
        const level1 = new THREE.ConeGeometry(0.6, 1, 8)
        level1.faces.forEach(f => f.color.set(color))
        level1.translate(0, 4, 0)
        treeGeo.merge(level1)
        const level2 = new THREE.ConeGeometry(0.8, 1, 8)
        level2.faces.forEach(f => f.color.set(color))
        level2.translate(0, 3, 0)
        treeGeo.merge(level2)
        const level3 = new THREE.ConeGeometry(1, 1, 8)
        level3.faces.forEach(f => f.color.set(color))
        level3.translate(0, 2, 0)
        treeGeo.merge(level3)
        const trunk = new THREE.CylinderGeometry(0.4, 0.5, 2)
        trunk.faces.forEach(f => f.color.set(0x994400))
        trunk.translate(0, 0, 0)
        treeGeo.merge(trunk)
        treeGeo.translate(...treePosition)
        groupGeo.merge(treeGeo)
        return groupGeo
      }, new THREE.Geometry()),
    [],
  )

  return (
    <group position={[0, 0, 0]}>
      <mesh geometry={treesGeometry}>
        <meshLambertMaterial
          attach="material"
          vertexColors={THREE.VertexColors}
        />
      </mesh>
    </group>
  )
}
