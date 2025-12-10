import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface HeroProps {
    position: [number, number, number];
    onMove?: (newPosition: [number, number, number]) => void;
}

const HeroSprite: React.FC<HeroProps> = ({ position }) => {
    const heroRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (heroRef.current) {
            // Floating animation
            heroRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        }
        if (glowRef.current) {
            // Pulsing glow
            const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
            glowRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group ref={heroRef} position={position}>
            {/* Hero body - Futuristic humanoid */}
            <group>
                {/* Core body */}
                <mesh position={[0, 0.6, 0]}>
                    <capsuleGeometry args={[0.25, 0.5, 8, 16]} />
                    <meshStandardMaterial
                        color="#1a237e"
                        metalness={0.8}
                        roughness={0.2}
                        emissive="#3949ab"
                        emissiveIntensity={0.3}
                    />
                </mesh>

                {/* Head */}
                <mesh position={[0, 1.2, 0]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial
                        color="#283593"
                        metalness={0.9}
                        roughness={0.1}
                        emissive="#5c6bc0"
                        emissiveIntensity={0.4}
                    />
                </mesh>

                {/* Visor */}
                <mesh position={[0, 1.2, 0.15]}>
                    <boxGeometry args={[0.35, 0.08, 0.1]} />
                    <meshBasicMaterial color="#00e5ff" transparent opacity={0.9} />
                </mesh>

                {/* Energy core (chest) */}
                <mesh position={[0, 0.7, 0.2]}>
                    <octahedronGeometry args={[0.1]} />
                    <meshBasicMaterial color="#ffd54f" transparent opacity={0.9} />
                </mesh>

                {/* Shoulder pads */}
                <mesh position={[0.35, 0.9, 0]}>
                    <sphereGeometry args={[0.12, 8, 8]} />
                    <meshStandardMaterial color="#1a237e" metalness={0.9} roughness={0.2} />
                </mesh>
                <mesh position={[-0.35, 0.9, 0]}>
                    <sphereGeometry args={[0.12, 8, 8]} />
                    <meshStandardMaterial color="#1a237e" metalness={0.9} roughness={0.2} />
                </mesh>

                {/* Arms */}
                <mesh position={[0.4, 0.5, 0]} rotation={[0, 0, -0.3]}>
                    <capsuleGeometry args={[0.06, 0.4, 4, 8]} />
                    <meshStandardMaterial color="#283593" metalness={0.7} roughness={0.3} />
                </mesh>
                <mesh position={[-0.4, 0.5, 0]} rotation={[0, 0, 0.3]}>
                    <capsuleGeometry args={[0.06, 0.4, 4, 8]} />
                    <meshStandardMaterial color="#283593" metalness={0.7} roughness={0.3} />
                </mesh>

                {/* Legs */}
                <mesh position={[0.12, 0, 0]}>
                    <capsuleGeometry args={[0.08, 0.4, 4, 8]} />
                    <meshStandardMaterial color="#1a237e" metalness={0.7} roughness={0.3} />
                </mesh>
                <mesh position={[-0.12, 0, 0]}>
                    <capsuleGeometry args={[0.08, 0.4, 4, 8]} />
                    <meshStandardMaterial color="#1a237e" metalness={0.7} roughness={0.3} />
                </mesh>

                {/* Jetpack/Wings effect */}
                <mesh position={[0, 0.6, -0.25]} rotation={[0.3, 0, 0]}>
                    <coneGeometry args={[0.15, 0.3, 4]} />
                    <meshStandardMaterial color="#37474f" metalness={0.9} roughness={0.2} />
                </mesh>
            </group>

            {/* Glow aura */}
            <mesh ref={glowRef} position={[0, 0.6, 0]}>
                <sphereGeometry args={[0.8, 16, 16]} />
                <meshBasicMaterial
                    color="#4fc3f7"
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Ground light effect */}
            <pointLight position={[0, 0.2, 0]} color="#4fc3f7" intensity={1} distance={3} />
        </group>
    );
};

export default HeroSprite;
