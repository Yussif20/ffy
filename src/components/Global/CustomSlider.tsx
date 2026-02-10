"use client";
import { handleSetSearchParams } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Slider } from "../ui/slider";

export default function CustomSlider({
  min,
  max,
  name,
  extraQuery,
}: {
  min: number;
  max: number;
  name: string;
  extraQuery?: Record<string, string>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState<number[]>(() => {
    const param = searchParams.get(name);
    if (param) {
      const arr = param.split(",").map((item) => Number(item));
      return arr.length === 2 ? arr : [min, max];
    }
    return [min, max];
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSetSearchParams(
        { [name]: value.join("-"), ...(extraQuery || {}) },
        searchParams,
        router
      );
    }, 500);
    return () => clearTimeout(handler);
  }, [value, name, router, searchParams]);

  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue);
  };

  return (
    <div className="space-y-4 pt-4">
      <Slider
        value={value}
        onValueChange={handleSliderChange}
        min={min}
        max={max}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
}
