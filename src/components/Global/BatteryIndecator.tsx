import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";

interface BatteryIndicatorProps {
  percentage?: number;
  tooltip?: string;
}

const BatteryIndicator: React.FC<BatteryIndicatorProps> = ({
  percentage = 80,
  tooltip,
}) => {
  useTranslations("BatteryIndicator");
  const level: number = Math.min(Math.max(percentage, 0), 100);

  // Determine color based on battery level
  const getColor = (): string => {
    if (level <= 20) return "bg-red-500";
    if (level <= 50) return "bg-orange-500";
    return "bg-primary";
  };

  const filledBars: number = Math.ceil((level / 100) * 10);

  return (
    <div className="flex items-center gap-2">
      {/* Percentage Display */}
      <div className="text-sm font-bold">{level}</div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Info size={16} />
        </TooltipTrigger>
        <TooltipContent className="">
          <p className="font-semibold text-sm max-w-sm">{tooltip || ""}</p>
        </TooltipContent>
      </Tooltip>

      {/* Battery Bars */}
      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={`w-1 h-6.5 rounded-sm transition-all duration-300 ${
              index < filledBars ? getColor() : "bg-secondary"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BatteryIndicator;
