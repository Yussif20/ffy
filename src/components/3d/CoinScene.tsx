"use client";

import Scene from "./Scene";
import CoinModel from "./models/CoinModel";

interface CoinSceneProps {
  className?: string;
}

export default function CoinScene({ className }: CoinSceneProps) {
  return (
    <Scene
      className={className}
      cameraPosition={[0, 0, 2.2]}
      fov={55}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, 3, 2]} intensity={0.8} color="#059666" />
      <CoinModel />
    </Scene>
  );
}
