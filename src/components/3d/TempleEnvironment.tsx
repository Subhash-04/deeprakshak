import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TempleEnvironmentProps {
    progress: number;
}

const TempleEnvironment: React.FC<TempleEnvironmentProps> = ({ progress }) => {
    const templeRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
        }
    });

    // Colors get brighter with progress
    const glowIntensity = 0.3 + (progress / 5) * 0.7;
    const neonColor = new THREE.Color(0.4, 0.8, 1); // Cyan neon
    const accentColor = new THREE.Color(1, 0.5, 0.8); // Pink neon

    return (
        <group ref={templeRef}>
            {/* Floor - Futuristic grid */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <planeGeometry args={[60, 60, 30, 30]} />
                <meshStandardMaterial
                    color="#0a1628"
                    wireframe
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Main floor surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.01, 0]}>
                <planeGeometry args={[60, 60]} />
                <meshStandardMaterial
                    color="#050a15"
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>

            {/* Central platform - Elevated dais */}
            <mesh position={[0, -1.5, 0]}>
                <cylinderGeometry args={[8, 10, 1, 6]} />
                <meshStandardMaterial
                    color="#0d1a2d"
                    metalness={0.8}
                    roughness={0.3}
                />
            </mesh>

            {/* Glowing ring around platform */}
            <mesh ref={ringRef} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <torusGeometry args={[9, 0.1, 16, 64]} />
                <meshBasicMaterial color={neonColor} transparent opacity={glowIntensity} />
            </mesh>

            {/* Inner glowing ring */}
            <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <torusGeometry args={[6, 0.08, 16, 64]} />
                <meshBasicMaterial color={accentColor} transparent opacity={glowIntensity * 0.8} />
            </mesh>

            {/* Pillars - 6 around the platform */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
                const angle = (i / 6) * Math.PI * 2;
                const x = Math.cos(angle) * 12;
                const z = Math.sin(angle) * 12;
                const isGuardianPillar = i < 5; // First 5 pillars are for guardians

                return (
                    <group key={i} position={[x, 0, z]}>
                        {/* Pillar base */}
                        <mesh position={[0, -1.5, 0]}>
                            <boxGeometry args={[2, 0.5, 2]} />
                            <meshStandardMaterial color="#1a2a4a" metalness={0.7} roughness={0.3} />
                        </mesh>

                        {/* Pillar shaft */}
                        <mesh position={[0, 2, 0]}>
                            <boxGeometry args={[1.2, 7, 1.2]} />
                            <meshStandardMaterial color="#0d1a2d" metalness={0.8} roughness={0.2} />
                        </mesh>

                        {/* Pillar glow strips */}
                        <mesh position={[0.65, 2, 0]}>
                            <boxGeometry args={[0.05, 6, 0.1]} />
                            <meshBasicMaterial
                                color={isGuardianPillar ? neonColor : accentColor}
                                transparent
                                opacity={glowIntensity}
                            />
                        </mesh>
                        <mesh position={[-0.65, 2, 0]}>
                            <boxGeometry args={[0.05, 6, 0.1]} />
                            <meshBasicMaterial
                                color={isGuardianPillar ? neonColor : accentColor}
                                transparent
                                opacity={glowIntensity}
                            />
                        </mesh>

                        {/* Pillar top */}
                        <mesh position={[0, 5.8, 0]}>
                            <boxGeometry args={[1.8, 0.4, 1.8]} />
                            <meshStandardMaterial color="#1a2a4a" metalness={0.7} roughness={0.3} />
                        </mesh>

                        {/* Holographic symbol on guardian pillars */}
                        {isGuardianPillar && (
                            <pointLight
                                position={[0, 3, 1.5]}
                                color={i < progress ? '#4caf50' : '#00bcd4'}
                                intensity={i < progress ? 2 : 1}
                                distance={5}
                            />
                        )}
                    </group>
                );
            })}

            {/* Floating geometric structures */}
            {[0, 1, 2].map((i) => {
                const y = 8 + i * 3;
                return (
                    <group key={`float-${i}`}>
                        <mesh position={[0, y, 0]} rotation={[0, i * 0.5, Math.PI / 4]}>
                            <torusGeometry args={[15 - i * 3, 0.15, 8, 4]} />
                            <meshBasicMaterial
                                color={neonColor}
                                transparent
                                opacity={0.3 - i * 0.08}
                            />
                        </mesh>
                    </group>
                );
            })}

            {/* Ambient particles / energy field */}
            <pointLight position={[0, 10, 0]} color="#4fc3f7" intensity={1} distance={30} />
            <pointLight position={[10, 5, 10]} color="#ce93d8" intensity={0.5} distance={20} />
            <pointLight position={[-10, 5, -10]} color="#80deea" intensity={0.5} distance={20} />
        </group>
    );
};

export default TempleEnvironment;
