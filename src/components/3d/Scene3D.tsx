import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Diya3D from './Diya3D';
import FloatingParticles from './FloatingParticles';

interface Scene3DProps {
    progress: number;
    interactive?: boolean;
}

const Scene3D: React.FC<Scene3DProps> = ({ progress, interactive = false }) => {
    return (
        <div className="canvas-container">
            <Canvas
                camera={{ position: [0, 2, 8], fov: 50 }}
                dpr={[1, 2]}
            >
                {/* Background stars */}
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.5}
                />

                {/* Lighting */}
                <ambientLight intensity={0.1} />
                <directionalLight position={[5, 5, 5]} intensity={0.3} />

                {/* Diya lamp */}
                <Diya3D progress={progress} />

                {/* Floating particles */}
                <FloatingParticles progress={progress} count={300} />

                {/* Camera controls - only if interactive */}
                {interactive && (
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 2}
                    />
                )}

                {/* Fog for depth */}
                <fog attach="fog" args={['#0a0612', 10, 30]} />
            </Canvas>
        </div>
    );
};

export default Scene3D;
