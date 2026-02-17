"use client";

import { motion } from "framer-motion";
import { Search, GitCompare, TrendingUp } from "lucide-react";

const stepIcons = [
  <Search size={22} key="search" className="text-primary shrink-0" />,
  <GitCompare size={22} key="compare" className="text-primary shrink-0" />,
  <TrendingUp size={22} key="trending" className="text-primary shrink-0" />,
];

interface Step {
  number: string;
  text: string;
}

export default function HowItWorksStepsClient({ steps }: { steps: Step[] }) {
  return (
    <div className="relative">
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          className="relative flex gap-4 sm:gap-5 items-center pb-10 last:pb-0"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-24px" }}
          transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
        >
          {/* Circle + connector: line only between circles, not through them */}
          <div className="relative flex flex-col items-center shrink-0">
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-background text-base font-bold text-primary shadow-sm">
              {step.number}
            </div>
            {/* Connector from bottom of this circle to top of next circle */}
            {index < steps.length - 1 && (
              <div
                className="absolute top-full left-1/2 -translate-x-px w-0 border-l-2 border-dashed border-primary/50 h-10"
                aria-hidden
              />
            )}
          </div>

          {/* Icon + text — centered with step circle */}
          <div className="flex min-w-0 flex-1 gap-3 items-center">
            <div className="shrink-0">{stepIcons[index]}</div>
            <p className="text-sm sm:text-base leading-relaxed font-medium text-foreground">
              {step.text}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
