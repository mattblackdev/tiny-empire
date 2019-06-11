import React from 'react'

import GESandbox from '../../game-engine/components/Sandbox.jsx'
import World from './World.jsx'

export default function Sandbox({ perspective = false, zoom, children }) {
  if (perspective) {
    return (
      <GESandbox orthographic={false} zoom={zoom || 2}>
        <group position={[0, 0, -10]} rotation={[0.5, -0.5, 0]}>
          {children}
        </group>
        <pointLight intensity={2} />
      </GESandbox>
    )
  }

  return (
    <GESandbox zoom={zoom}>
      <World mapSize={0}>{children}</World>
    </GESandbox>
  )
}
