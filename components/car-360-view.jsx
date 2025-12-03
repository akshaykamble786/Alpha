"use client"

import { useState, Suspense, useRef } from "react"
import { RotateCcw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Html } from "@react-three/drei"

function StylizedCar() {
  const groupRef = useRef(null)

  const bodyColor = "#333333"
  const windowColor = "#1a1a2e"
  const wheelColor = "#1a1a1a"
  const tireColor = "#333333"
  const grillColor = "#2a2a2a"
  const headlightColor = "#ffffcc"

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Main body - lower section */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[2.4, 0.6, 1.2]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Main body - upper cabin */}
      <mesh position={[0.1, 0.95, 0]}>
        <boxGeometry args={[1.6, 0.5, 1.1]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Front hood - sloped */}
      <mesh position={[-0.85, 0.55, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.6, 0.3, 1.15]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Windshield */}
      <mesh position={[-0.55, 0.95, 0]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.4, 0.45, 1.0]} />
        <meshStandardMaterial color={windowColor} metalness={0.9} roughness={0.1} transparent opacity={0.7} />
      </mesh>

      {/* Side windows - left */}
      <mesh position={[0.1, 0.95, 0.56]}>
        <boxGeometry args={[1.0, 0.4, 0.02]} />
        <meshStandardMaterial color={windowColor} metalness={0.9} roughness={0.1} transparent opacity={0.7} />
      </mesh>

      {/* Side windows - right */}
      <mesh position={[0.1, 0.95, -0.56]}>
        <boxGeometry args={[1.0, 0.4, 0.02]} />
        <meshStandardMaterial color={windowColor} metalness={0.9} roughness={0.1} transparent opacity={0.7} />
      </mesh>

      {/* Rear window */}
      <mesh position={[0.85, 0.95, 0]}>
        <boxGeometry args={[0.05, 0.4, 1.0]} />
        <meshStandardMaterial color={windowColor} metalness={0.9} roughness={0.1} transparent opacity={0.7} />
      </mesh>

      {/* Front grille */}
      <mesh position={[-1.21, 0.4, 0]}>
        <boxGeometry args={[0.05, 0.4, 0.8]} />
        <meshStandardMaterial color={grillColor} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-1.22, 0.45, 0.35]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color={headlightColor} emissive={headlightColor} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-1.22, 0.45, -0.35]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color={headlightColor} emissive={headlightColor} emissiveIntensity={0.5} />
      </mesh>

      {/* Tail lights */}
      <mesh position={[1.21, 0.45, 0.4]}>
        <boxGeometry args={[0.05, 0.15, 0.2]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[1.21, 0.45, -0.4]}>
        <boxGeometry args={[0.05, 0.15, 0.2]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>

      /* Wheels */
        {[
          [-0.7, 0.15, 0.7],
          [-0.7, 0.15, -0.7],
          [0.7, 0.15, 0.7],
          [0.7, 0.15, -0.7],
        ].map((pos, i) => (
          <group key={i} position={pos}>
            {/* Tire */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.2, 24]} />
            <meshStandardMaterial color={tireColor} roughness={0.9} />
          </mesh>
          {/* Wheel hub */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.22, 16]} />
            <meshStandardMaterial color={wheelColor} metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Wheel spokes effect */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, i % 2 === 0 ? 0.11 : -0.11, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.02, 6]} />
            <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Roof rack bars */}
      <mesh position={[0.1, 1.22, 0]}>
        <boxGeometry args={[1.2, 0.03, 1.0]} />
        <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Side steps */}
      <mesh position={[0, 0.12, 0.65]}>
        <boxGeometry args={[1.8, 0.05, 0.15]} />
        <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.12, -0.65]}>
        <boxGeometry args={[1.8, 0.05, 0.15]} />
        <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Bumpers */}
      <mesh position={[-1.15, 0.2, 0]}>
        <boxGeometry args={[0.15, 0.2, 1.1]} />
        <meshStandardMaterial color="#222222" metalness={0.4} roughness={0.6} />
      </mesh>
      <mesh position={[1.15, 0.2, 0]}>
        <boxGeometry args={[0.15, 0.2, 1.1]} />
        <meshStandardMaterial color="#222222" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Door handles */}
      <mesh position={[-0.2, 0.5, 0.61]}>
        <boxGeometry args={[0.15, 0.03, 0.02]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.4, 0.5, 0.61]}>
        <boxGeometry args={[0.15, 0.03, 0.02]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-0.2, 0.5, -0.61]}>
        <boxGeometry args={[0.15, 0.03, 0.02]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.4, 0.5, -0.61]}>
        <boxGeometry args={[0.15, 0.03, 0.02]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <circleGeometry args={[4, 64]} />
      <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.8} />
    </mesh>
  )
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-sm">Loading 3D Model...</p>
      </div>
    </Html>
  )
}

export default function Car360View() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleOpenChange = (open) => {
    setIsOpen(open)
    if (open) {
      setIsLoaded(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="absolute bottom-16 left-3 bg-purple-600 hover:bg-purple-700 text-white shadow-lg gap-2">
          <RotateCcw className="h-4 w-4" />
          360° View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-[95vw] p-0 bg-gray-900">
        <DialogHeader className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white">360° View</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <DialogDescription className="sr-only">
            Interactive 3D view of the car. Drag to rotate the model.
          </DialogDescription>
        </DialogHeader>

        <div className="relative h-[60vh] min-h-[400px] bg-gradient-to-b from-gray-800 to-gray-900">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-white text-sm">Loading 3D Model...</p>
              </div>
            </div>
          )}
          <Canvas 
            camera={{ position: [4, 2.5, 4], fov: 45 }} 
            dpr={[1, 2]} 
            performance={{ min: 0.5 }} 
            shadows
            onCreated={() => setIsLoaded(true)}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <directionalLight position={[-5, 3, -5]} intensity={0.4} />
            <spotLight position={[0, 10, 0]} intensity={0.3} angle={0.5} />

            <Environment preset="city" />

            <Suspense fallback={<LoadingFallback />}>
              <StylizedCar />
              <Ground />
            </Suspense>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={1}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2.2}
            />
          </Canvas>
        </div>

        <div className="p-4 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">Drag to rotate the model • Auto-rotating</p>
          <div className="flex justify-center gap-2 mt-3">
            <span className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">Zoom disabled</span>
            <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">3D Interactive</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
