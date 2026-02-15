"use client";

import { PresentationControls } from "@react-three/drei";
import Scene from "./Scene";
import CandlestickModel from "./models/CandlestickModel";
import { usePrimaryColor } from "@/hooks/usePrimaryColor";

interface CandlestickSceneProps {
  className?: string;
}

export default function CandlestickScene({ className }: CandlestickSceneProps) {
  const { primary } = usePrimaryColor();

  return (
    <Scene
      className={className}
      cameraPosition={[0, 0, 4]}
      fov={60}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1} />
      <pointLight position={[0, 3, 3]} intensity={0.6} color={primary} />

      <PresentationControls
        global
        snap
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <CandlestickModel variant={1} position={[-3, 0, 0]} scale={2} rotationSpeed={0} />
        <CandlestickModel variant={2} position={[0, 0, 0]} scale={2.4} rotationSpeed={0} />
        <CandlestickModel variant={3} position={[3, 0, 0]} scale={2} rotationSpeed={0} />
      </PresentationControls>
    </Scene>
  );
}
