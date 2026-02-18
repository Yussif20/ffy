"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import OscillatingSpotlight from "./OscillatingSpotlight";
import CoinStack from "./CoinStack";
import AnimatedCandlestick from "./AnimatedCandlestick";

interface HeroSceneProps {
  spotlightColor?: string;
  candlestickColor?: string;
  mirror?: boolean;
}

export default function HeroScene({
  spotlightColor = "#4ae79e",
  candlestickColor = "#4ae79e",
  mirror = false,
}: HeroSceneProps) {
  // Mobile positioning offsets (in pixels, converted to 3D units)
  const mobileOffsetX = -150;
  const mobileOffsetY = 200;

  // Responsive scaling
  const [scale, setScale] = useState(1);
  const [cameraZ, setCameraZ] = useState(8);
  const [scenePosition, setScenePosition] = useState<[number, number, number]>([
    0, 0, 0,
  ]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // Scale from 0.6 (mobile) to 1.0 (desktop)
      const minWidth = 320;
      const maxWidth = 1920;
      const minScale = 0.6;
      const maxScale = 1.0;
      const minCameraZ = 11;
      const maxCameraZ = 8;

      const clampedWidth = Math.max(minWidth, Math.min(maxWidth, width));
      const normalizedWidth = (clampedWidth - minWidth) / (maxWidth - minWidth);
      const smoothScale = minScale + (maxScale - minScale) * normalizedWidth;
      const smoothCameraZ =
        minCameraZ + (maxCameraZ - minCameraZ) * normalizedWidth;

      setScale(smoothScale);
      setCameraZ(smoothCameraZ);

      // Apply mobile offsets based on breakpoint
      if (width < 768) {
        // Small phones — original offset
        setScenePosition([mobileOffsetX / 100, mobileOffsetY / 100, 0]);
      } else if (width < 1024) {
        // Tablets (md→lg) — push scene higher to avoid clashing with text
        setScenePosition([mobileOffsetX / 100, 4, 0]);
      } else {
        setScenePosition([0, 0, 0]);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      className="h-full w-full block"
      gl={{ antialias: false }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={35} />
      <Environment preset="night" environmentIntensity={0.3} />

      {/* Scene Content */}
      <group position={scenePosition}>
        <Suspense fallback={null}>
          <OscillatingSpotlight color={spotlightColor} mirror={mirror} />

          <pointLight
            position={mirror ? [2, 5, -2] : [-2, 5, -2]}
            intensity={80}
            color="#fff"
          />

          {/* Coin Stack */}
          <group
            scale={5 * scale}
            position={mirror ? [-2.5 * scale, 0, 0] : [2.5 * scale, 0, 0]}
          >
            <CoinStack />
          </group>

          {/* Candlesticks */}
          <group position={mirror ? [-2.5 * scale, 0, 0] : [2.5 * scale, 0, 0]}>
            <AnimatedCandlestick
              variant={1}
              position={mirror ? [-1.2, -0.5, 0] : [1.2, -0.5, 0]}
              scale={1.7 * scale}
              glassColor={candlestickColor}
            />
            <AnimatedCandlestick
              variant={2}
              position={mirror ? [1, 0, 0] : [-1, 0, 0]}
              scale={1.7 * scale}
              glassColor={candlestickColor}
            />
            <AnimatedCandlestick
              variant={3}
              position={mirror ? [-1, 1, 0] : [1, 1, 0]}
              scale={1.7 * scale}
              glassColor={candlestickColor}
            />
          </group>
        </Suspense>
      </group>

      {/* Limited rotation controls (no zoom) */}
      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}
