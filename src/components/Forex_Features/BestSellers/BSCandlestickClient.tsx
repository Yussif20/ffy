"use client";

import dynamic from "next/dynamic";

const SingleCandlestickScene = dynamic(
  () => import("@/components/3d/SingleCandlestickScene"),
  { ssr: false }
);

export default function BSCandlestickClient() {
  return (
    <div className="absolute right-0 top-0 w-40 h-40 opacity-15 pointer-events-none hidden lg:block">
      <SingleCandlestickScene className="w-full h-full" variant={2} scale={1.2} rotationSpeed={0.1} />
    </div>
  );
}
