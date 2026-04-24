import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, Text3D } from '@react-three/drei'
import * as THREE from 'three'

// ─── 定数 ───────────────────────────────────────────────
const FONT = '/fonts/helvetiker-regular.typeface.json'
const commonProps = {
  font: FONT,
  size: 0.5,
  height: 0.15,
  bevelEnabled: true,
  bevelThickness: 0.02,
  bevelSize: 0.01,
  lineHeight: 1.5,
  letterSpacing: 0.05,
} as const

const PETAL_COLORS = [
  { name: 'pink', color: new THREE.Color('#f9a8d4') },
  { name: 'green', color: new THREE.Color('#86efac') },
  { name: 'orange', color: new THREE.Color('#fb923c') },
  { name: 'white', color: new THREE.Color('#e2e8f0') },
]

const COUNT = 80
const particles = Array.from({ length: COUNT }, () => ({
  radius: 2.5 + Math.random() * 3.0,
  theta: Math.random() * Math.PI * 2,
  phi: Math.random() * Math.PI * 2,
  speed: 0.2 + Math.random() * 0.5,
  size: 0.03 + Math.random() * 0.07,
  tilt: Math.random() * Math.PI,
}))

// ─── 花びらパーティクル ────────────────────────────────
const Petals = ({
  onColorChange,
}: {
  onColorChange: (name: string) => void
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const currentColorName = useRef('')

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const dummy = new THREE.Object3D()

    const cycleDuration = 5
    const totalDuration = PETAL_COLORS.length * cycleDuration
    const cycleTime = t % totalDuration
    const currentIndex = Math.floor(cycleTime / cycleDuration)
    const nextIndex = (currentIndex + 1) % PETAL_COLORS.length
    const progress = (cycleTime % cycleDuration) / cycleDuration

    const currentColor = PETAL_COLORS[currentIndex].color
      .clone()
      .lerp(PETAL_COLORS[nextIndex].color, progress)
    ;(meshRef.current.material as THREE.MeshStandardMaterial).color.set(
      currentColor
    )

    const threshold = 0.5
    const notifyIndex = progress > threshold ? nextIndex : currentIndex
    const colorName = PETAL_COLORS[notifyIndex].name
    if (colorName !== currentColorName.current) {
      currentColorName.current = colorName
      onColorChange(colorName)
    }

    particles.forEach((p, i) => {
      const angle = p.theta + t * p.speed
      const x = p.radius * Math.cos(angle)
      const z = p.radius * Math.sin(angle)
      const y = Math.sin(p.phi + t * p.speed * 0.5) * 1.5
      dummy.position.set(x, y, z)
      dummy.rotation.set(p.tilt, angle, p.tilt * 0.5)
      dummy.scale.setScalar(p.size)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#f9a8d4"
        side={THREE.DoubleSide}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  )
}

// ─── 回転テキスト ─────────────────────────────────────
const RotatingText = () => {
  const groupRef = useRef<THREE.Group>(null)
  const speedRef = useRef(12.0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    speedRef.current += (1.5 - speedRef.current) * 0.02
    groupRef.current.rotation.y += delta * speedRef.current
  })

  return (
    <group ref={groupRef}>
      <Center>
        <group>
          <group position={[0, 1.0, 0]}>
            <Text3D {...commonProps}>
              I
              <meshStandardMaterial
                color="#ffcced"
                metalness={0.6}
                roughness={0.2}
              />
            </Text3D>
            <Text3D {...commonProps} position={[0.32, 0, 0]}>
              nternet
              <meshStandardMaterial
                color="#fff1f2"
                metalness={0.4}
                roughness={0.3}
              />
            </Text3D>
          </group>
          <group position={[0, 0, 0]}>
            <Text3D {...commonProps}>
              I
              <meshStandardMaterial
                color="#ffcced"
                metalness={0.6}
                roughness={0.2}
              />
            </Text3D>
            <Text3D {...commonProps} position={[0.32, 0, 0]}>
              nteract
              <meshStandardMaterial
                color="#fff1f2"
                metalness={0.4}
                roughness={0.3}
              />
            </Text3D>
          </group>
          <group position={[0, -1.0, 0]}>
            <Text3D {...commonProps}>
              I
              <meshStandardMaterial
                color="#ffcced"
                metalness={0.6}
                roughness={0.2}
              />
            </Text3D>
            <Text3D {...commonProps} position={[0.32, 0, 0]}>
              nfinity
              <meshStandardMaterial
                color="#fff1f2"
                metalness={0.4}
                roughness={0.3}
              />
            </Text3D>
          </group>
        </group>
      </Center>
    </group>
  )
}

// ─── TopHero ──────────────────────────────────────────
type Props = {
  onColorChange: (name: string) => void
}

export const TopHero = ({ onColorChange }: Props) => {
  return (
    <section className="relative h-full w-full shrink-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} color="#fce7f3" />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          color="#ffffff"
        />
        <directionalLight
          position={[-5, -3, -5]}
          intensity={0.4}
          color="#fbcfe8"
        />
        <Petals onColorChange={onColorChange} />
        <RotatingText />
      </Canvas>
    </section>
  )
}
