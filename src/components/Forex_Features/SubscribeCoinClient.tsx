"use client";

import dynamic from "next/dynamic";

const CoinScene = dynamic(() => import("@/components/3d/CoinScene"), {
  ssr: false,
});

export default function SubscribeCoinClient() {
  return (
    <div className="absolute right-4 bottom-0 w-[120px] h-[120px] pointer-events-none opacity-60 hidden lg:block">
      <CoinScene className="w-full h-full" />
    </div>
  );
}
