import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import TempleEnvironment from './TempleEnvironment';
import HeroSprite from './HeroSprite';
import GuardianSprite from './GuardianSprite';
import Diya3D from './Diya3D';
import FloatingParticles from './FloatingParticles';
import { GuardianType, GUARDIANS } from '../../types';

interface TempleSceneProps {
    completedGuardians: GuardianType[];
    onGuardianClick: (guardian: GuardianType) => void;
}

// Guardian positions around the temple (on the pillars)
const GUARDIAN_POSITIONS: Record<GuardianType, [number, number, number]> = {
    logic: [12 * Math.cos(0), 1, 12 * Math.sin(0)],
    coding: [12 * Math.cos(Math.PI * 2 / 5), 1, 12 * Math.sin(Math.PI * 2 / 5)],
    creativity: [12 * Math.cos(Math.PI * 4 / 5), 1, 12 * Math.sin(Math.PI * 4 / 5)],
    strategy: [12 * Math.cos(Math.PI * 6 / 5), 1, 12 * Math.sin(Math.PI * 6 / 5)],
    vision: [12 * Math.cos(Math.PI * 8 / 5), 1, 12 * Math.sin(Math.PI * 8 / 5)]
};

const TempleScene: React.FC<TempleSceneProps> = ({
    completedGuardians,
    onGuardianClick
}) => {
    const [activeGuardian, setActiveGuardian] = useState<GuardianType | null>(null);
    const [heroPosition] = useState<[number, number, number]>([0, -0.8, 5]);

    const progress = completedGuardians.length;

    const handleGuardianHover = useCallback((guardian: GuardianType | null) => {
        setActiveGuardian(guardian);
    }, []);

    return (
        <div className="canvas-container">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 8, 18]} fov={60} />

                {/* Skybox - Stars */}
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0.5}
                    fade
                    speed={0.5}
                />

                {/* Ambient lighting */}
                <ambientLight intensity={0.15} />
                <directionalLight position={[10, 20, 10]} intensity={0.3} color="#4fc3f7" />

                {/* Temple Environment */}
                <TempleEnvironment progress={progress} />

                {/* Central Diya */}
                <group position={[0, -0.5, 0]} scale={1.5}>
                    <Diya3D progress={progress} />
                </group>

                {/* Hero Character */}
                <HeroSprite position={heroPosition} />

                {/* Guardian Sprites */}
                {GUARDIANS.map((guardian) => (
                    <GuardianSprite
                        key={guardian.id}
                        type={guardian.id}
                        position={GUARDIAN_POSITIONS[guardian.id]}
                        isDefeated={completedGuardians.includes(guardian.id)}
                        isActive={activeGuardian === guardian.id}
                        onClick={() => {
                            if (!completedGuardians.includes(guardian.id)) {
                                onGuardianClick(guardian.id);
                            }
                        }}
                    />
                ))}

                {/* Floating energy particles */}
                <FloatingParticles progress={progress} count={400} />

                {/* Camera controls */}
                <OrbitControls
                    enablePan={false}
                    minDistance={10}
                    maxDistance={30}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2.5}
                    autoRotate
                    autoRotateSpeed={0.3}
                />

                {/* Fog for atmosphere */}
                <fog attach="fog" args={['#050a15', 20, 60]} />
            </Canvas>

            {/* Guardian info overlay */}
            {activeGuardian && (
                <div className="guardian-tooltip">
                    <span className="guardian-tooltip-icon">
                        {GUARDIANS.find(g => g.id === activeGuardian)?.icon}
                    </span>
                    <span className="guardian-tooltip-name">
                        {GUARDIANS.find(g => g.id === activeGuardian)?.name}
                    </span>
                </div>
            )}
        </div>
    );
};

export default TempleScene;
