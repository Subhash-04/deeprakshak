import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingParticlesProps {
    count?: number;
    progress: number; // 0-5 representing number of guardians defeated
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({ count = 200, progress }) => {
    const pointsRef = useRef<THREE.Points>(null);
    const geometryRef = useRef<THREE.BufferGeometry>(null);

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Random positions in a sphere
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 5 + Math.random() * 15;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Golden/orange colors
            colors[i * 3] = 1; // R
            colors[i * 3 + 1] = 0.6 + Math.random() * 0.4; // G
            colors[i * 3 + 2] = Math.random() * 0.3; // B
        }

        return { positions, colors };
    }, [count]);

    useEffect(() => {
        if (geometryRef.current) {
            geometryRef.current.setAttribute(
                'position',
                new THREE.BufferAttribute(positions, 3)
            );
            geometryRef.current.setAttribute(
                'color',
                new THREE.BufferAttribute(colors, 3)
            );
        }
    }, [positions, colors]);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
            pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
        }
    });

    const intensity = 0.3 + (progress / 5) * 0.7;

    return (
        <points ref={pointsRef}>
            <bufferGeometry ref={geometryRef} />
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={intensity}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default FloatingParticles;
