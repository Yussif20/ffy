"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const targetDate = new Date("2026-02-19T00:00:00").getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-3 md:gap-5">
        {[0, 0, 0, 0].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="relative">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-primary/30 flex items-center justify-center shadow-lg shadow-primary/10">
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/50">
                  --
                </span>
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/50 to-transparent rounded-xl blur opacity-30"></div>
            </div>
            <span className="text-xs md:text-sm text-gray-400 mt-2 uppercase tracking-wider">
              {["Days", "Hours", "Mins", "Secs"][i]}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <div className="flex gap-3 md:gap-5">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-primary via-primary/50 to-transparent rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>

            {/* Main box */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl bg-gradient-to-br from-primary/30 to-primary/5 backdrop-blur-sm border border-primary/40 flex items-center justify-center shadow-xl shadow-primary/20 overflow-hidden">
              {/* Animated background shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"></div>

              {/* Number */}
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent drop-shadow-lg">
                {unit.value.toString().padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Label */}
          <span className="text-xs md:text-sm text-gray-400 mt-2 uppercase tracking-wider font-medium">
            {unit.label}
          </span>

          {/* Separator dots (except for last item) */}
          {index < timeUnits.length - 1 && (
            <div className="hidden md:flex absolute translate-x-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2 flex-col gap-1.5">
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
