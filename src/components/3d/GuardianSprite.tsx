import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GuardianType } from '../../types';

interface GuardianSpriteProps {
    type: GuardianType;
    position: [number, number, number];
    isDefeated: boolean;
    isActive: boolean;
    onClick?: () => void;
}

// Guardian visual configurations
const GUARDIAN_CONFIGS: Record<GuardianType, {
    color: string;
    emissive: string;
    icon: string;
    shape: 'sphere' | 'cube' | 'octahedron' | 'diamond' | 'eye';
}> = {
    logic: {
        color: '#7c4dff',
        emissive: '#b388ff',
        icon: '🧠',
        shape: 'cube'
    },
    coding: {
        color: '#00e676',
        emissive: '#69f0ae',
        icon: '💻',
        shape: 'octahedron'
    },
    creativity: {
        color: '#ff4081',
        emissive: '#ff80ab',
        icon: '🎨',
        shape: 'sphere'
    },
    strategy: {
        color: '#ffab00',
        emissive: '#ffd740',
        icon: '♟️',
        shape: 'diamond'
    },
    vision: {
        color: '#00b0ff',
        emissive: '#40c4ff',
        icon: '👁️',
        shape: 'eye'
    }
};

const GuardianSprite: React.FC<GuardianSpriteProps> = ({
    type,
    position,
    isDefeated,
    isActive,
    onClick
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const orbitRef = useRef<THREE.Group>(null);

    const config = GUARDIAN_CONFIGS[type];
    const color = new THREE.Color(config.color);
    const emissive = new THREE.Color(config.emissive);

    useFrame((state) => {
        if (groupRef.current && !isDefeated) {
            // Floating animation
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
        }
        if (coreRef.current && !isDefeated) {
            // Rotation
            coreRef.current.rotation.y = state.clock.elapsedTime * 0.5;
            coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }
        if (orbitRef.current) {
            orbitRef.current.rotation.y = state.clock.elapsedTime * 2;
            orbitRef.current.rotation.z = state.clock.elapsedTime * 0.5;
        }
    });

    const renderCoreShape = () => {
        const opacity = isDefeated ? 0.3 : 1;
        const material = (
            <meshStandardMaterial
                color={isDefeated ? '#666' : color}
                emissive={isDefeated ? '#333' : emissive}
                emissiveIntensity={isDefeated ? 0.1 : 0.5}
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={opacity}
            />
        );

        switch (config.shape) {
            case 'cube':
                return (
                    <mesh ref={coreRef}>
                        <boxGeometry args={[1, 1, 1]} />
                        {material}
                    </mesh>
                );
            case 'octahedron':
                return (
                    <mesh ref={coreRef}>
                        <octahedronGeometry args={[0.7]} />
                        {material}
                    </mesh>
                );
            case 'diamond':
                return (
                    <mesh ref={coreRef} scale={[0.6, 1, 0.6]}>
                        <octahedronGeometry args={[0.8]} />
                        {material}
                    </mesh>
                );
            case 'eye':
                return (
                    <group ref={coreRef}>
                        <mesh>
                            <sphereGeometry args={[0.6, 32, 32]} />
                            <meshStandardMaterial
                                color={isDefeated ? '#666' : '#fff'}
                                metalness={0.5}
                                roughness={0.3}
                                transparent
                                opacity={opacity}
                            />
                        </mesh>
                        <mesh position={[0, 0, 0.35]}>
                            <sphereGeometry args={[0.3, 16, 16]} />
                            <meshBasicMaterial color={isDefeated ? '#333' : config.color} />
                        </mesh>
                        <mesh position={[0, 0, 0.5]}>
                            <sphereGeometry args={[0.12, 16, 16]} />
                            <meshBasicMaterial color="#000" />
                        </mesh>
                    </group>
                );
            default: // sphere
                return (
                    <mesh ref={coreRef}>
                        <sphereGeometry args={[0.6, 32, 32]} />
                        {material}
                    </mesh>
                );
        }
    };

    return (
        <group
            ref={groupRef}
            position={position}
            onClick={onClick}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'default'}
        >
            {/* Main guardian body */}
            <group>
                {/* Outer shell / armor */}
                <mesh>
                    <torusGeometry args={[0.9, 0.08, 8, 32]} />
                    <meshStandardMaterial
                        color={isDefeated ? '#444' : '#1a237e'}
                        metalness={0.9}
                        roughness={0.2}
                    />
                </mesh>

                {/* Core shape based on guardian type */}
                {renderCoreShape()}

                {/* Orbiting particles */}
                {!isDefeated && (
                    <group ref={orbitRef}>
                        {[0, 1, 2, 3].map((i) => {
                            const angle = (i / 4) * Math.PI * 2;
                            return (
                                <mesh
                                    key={i}
                                    position={[
                                        Math.cos(angle) * 1.2,
                                        Math.sin(angle) * 0.3,
                                        Math.sin(angle) * 1.2
                                    ]}
                                >
                                    <sphereGeometry args={[0.08, 8, 8]} />
                                    <meshBasicMaterial color={config.color} />
                                </mesh>
                            );
                        })}
                    </group>
                )}
            </group>

            {/* Glow effect */}
            <mesh>
                <sphereGeometry args={[1.5, 16, 16]} />
                <meshBasicMaterial
                    color={isDefeated ? '#333' : config.color}
                    transparent
                    opacity={isDefeated ? 0.05 : (isActive ? 0.25 : 0.1)}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Status indicator */}
            {isDefeated && (
                <mesh position={[0, 1.5, 0]}>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshBasicMaterial color="#4caf50" />
                </mesh>
            )}

            {/* Light source */}
            <pointLight
                color={isDefeated ? '#4caf50' : config.color}
                intensity={isDefeated ? 0.5 : (isActive ? 3 : 1)}
                distance={isActive ? 8 : 5}
            />
        </group>
    );
};

export default GuardianSprite;
