'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { Product } from '@/types/product'

interface Product3DViewerProps {
  product: Product
  className?: string
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={1} />
}

function ViewerContent({ modelUrl }: { modelUrl: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      <Suspense fallback={null}>
        <Model url={modelUrl} />
      </Suspense>
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate={false}
      />
      <Environment preset="sunset" />
    </>
  )
}

export default function Product3DViewer({ product, className = '' }: Product3DViewerProps) {
  const [show3D, setShow3D] = useState(false)
  const [error, setError] = useState(false)

  if (!product.model3d) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`} style={{ minHeight: '400px' }}>
        <p className="text-gray-500">3D model not available</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`} style={{ minHeight: '400px' }}>
        <p className="text-gray-500">Failed to load 3D model</p>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {!show3D ? (
        <div className="relative bg-gray-100 rounded-lg" style={{ minHeight: '400px' }}>
          {product.images[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg"
              style={{ minHeight: '400px' }}
            />
          )}
          <button
            onClick={() => setShow3D(true)}
            className="absolute bottom-4 right-4 bg-gold-300 hover:bg-gold-400 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg"
          >
            View in 3D
          </button>
        </div>
      ) : (
        <div className="relative bg-gray-100 rounded-lg" style={{ minHeight: '400px' }}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            onError={() => setError(true)}
            className="rounded-lg"
          >
            <ViewerContent modelUrl={product.model3d} />
          </Canvas>
          <button
            onClick={() => setShow3D(false)}
            className="absolute bottom-4 right-4 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg"
          >
            Back to Image
          </button>
        </div>
      )}
    </div>
  )
}

