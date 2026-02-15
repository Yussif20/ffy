"use client";

import dynamic from "next/dynamic";

const CandlestickScene = dynamic(
  () => import("@/components/3d/CandlestickScene"),
  { ssr: false }
);

export default function CandlestickSectionClient() {
  return (
    <div className="w-full h-[420px] md:h-[520px]">
      <CandlestickScene className="w-full h-full" />
    </div>
  );
}
