"use client";

import { motion } from "framer-motion";
import { Search, GitCompare, TrendingUp } from "lucide-react";
import HowItWorksLine from "./HowItWorksLine";

const stepIcons = [
  <Search size={20} key="search" className="text-primary" />,
  <GitCompare size={20} key="compare" className="text-primary" />,
  <TrendingUp size={20} key="trending" className="text-primary" />,
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
          className="relative flex gap-4 pb-8 items-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
        >
          <HowItWorksLine isShow={index < steps.length - 1} />

          {/* Upgraded step circle (8.4) */}
          <div className="relative flex-shrink-0">
            <div className="h-14 w-14 flex items-center justify-center rounded-full border-2 border-primary bg-primary/10 z-10 relative">
              <span className="text-base font-bold text-primary">{step.number}</span>
            </div>
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-md -z-10" />
          </div>

          <div className="flex gap-3 items-center">
            <div className="flex-shrink-0">{stepIcons[index]}</div>
            <p className="text-sm md:text-base leading-relaxed font-semibold">
              {step.text}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
