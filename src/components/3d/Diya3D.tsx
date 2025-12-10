import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Diya3DProps {
    progress: number; // 0-5 representing number of guardians defeated
}

const Diya3D: React.FC<Diya3DProps> = ({ progress }) => {
    const flameRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.PointLight>(null);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (flameRef.current) {
            // Flame flickering effect
            const flicker = Math.sin(time * 8) * 0.1 + Math.sin(time * 12) * 0.05;
            flameRef.current.scale.y = 1 + flicker;
            flameRef.current.scale.x = 1 + flicker * 0.5;
            flameRef.current.position.y = 0.5 + Math.sin(time * 6) * 0.02;
        }

        if (glowRef.current) {
            // Light intensity flicker
            const baseIntensity = progress * 2;
            glowRef.current.intensity = baseIntensity + Math.sin(time * 10) * 0.3;
        }

        if (groupRef.current) {
            // Gentle floating motion
            groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
            groupRef.current.rotation.y = time * 0.1;
        }
    });

    const flameOpacity = progress > 0 ? 0.8 : 0.2;
    const flameScale = 0.3 + (progress / 5) * 0.7;

    return (
        <group ref={groupRef} position={[0, -1, 0]}>
            {/* Diya base (lamp) */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.4, 0.6, 0.3, 32]} />
                <meshStandardMaterial
                    color="#b8860b"
                    metalness={0.8}
                    roughness={0.3}
                />
            </mesh>

            {/* Inner oil bowl */}
            <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.35, 0.4, 0.15, 32]} />
                <meshStandardMaterial
                    color="#8b4513"
                    metalness={0.3}
                    roughness={0.7}
                />
            </mesh>

            {/* Oil surface */}
            <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.3, 32]} />
                <meshStandardMaterial
                    color="#654321"
                    metalness={0.1}
                    roughness={0.9}
                />
            </mesh>

            {/* Wick */}
            <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
                <meshStandardMaterial color="#2d2d2d" />
            </mesh>

            {/* Flame */}
            <mesh ref={flameRef} position={[0, 0.5, 0]} scale={[flameScale, flameScale, flameScale]}>
                <coneGeometry args={[0.15, 0.5, 16]} />
                <meshBasicMaterial
                    color={progress > 0 ? "#ffd700" : "#444"}
                    transparent
                    opacity={flameOpacity}
                />
            </mesh>

            {/* Inner flame (brighter) */}
            {progress > 0 && (
                <mesh position={[0, 0.45, 0]} scale={[flameScale * 0.6, flameScale * 0.6, flameScale * 0.6]}>
                    <coneGeometry args={[0.1, 0.35, 16]} />
                    <meshBasicMaterial
                        color="#fff7e0"
                        transparent
                        opacity={0.9}
                    />
                </mesh>
            )}

            {/* Point light for glow */}
            <pointLight
                ref={glowRef}
                position={[0, 0.6, 0]}
                color="#ff9500"
                intensity={progress * 2}
                distance={10}
                decay={2}
            />

            {/* Ambient glow sphere */}
            {progress > 0 && (
                <mesh position={[0, 0.5, 0]}>
                    <sphereGeometry args={[0.4 + progress * 0.1, 16, 16]} />
                    <meshBasicMaterial
                        color="#ff9500"
                        transparent
                        opacity={0.1 + progress * 0.05}
                    />
                </mesh>
            )}

            {/* Decorative base */}
            <mesh position={[0, -0.1, 0]} rotation={[0, Math.PI / 4, 0]}>
                <torusGeometry args={[0.55, 0.05, 8, 4]} />
                <meshStandardMaterial
                    color="#daa520"
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>
        </group>
    );
};

export default Diya3D;
