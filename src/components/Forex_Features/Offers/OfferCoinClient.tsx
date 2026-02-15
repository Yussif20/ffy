"use client";

import dynamic from "next/dynamic";

const CoinScene = dynamic(() => import("@/components/3d/CoinScene"), {
  ssr: false,
});

export default function OfferCoinClient() {
  return (
    <div className="absolute right-10 bottom-0 w-[72px] h-[72px] pointer-events-none opacity-50 hidden xl:block">
      <CoinScene className="w-full h-full" />
    </div>
  );
}
