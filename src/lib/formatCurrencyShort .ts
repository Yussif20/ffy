export const formatCurrencyShort = (value: string | number, showDollar: boolean = true): string => {
  const dollarSign: string = showDollar ? '$' : ''
  const num = typeof value === "string" ? parseFloat(value) : value;
  let numberText = ''
  if (isNaN(num)) numberText = "0";

  const absNum = Math.abs(num);

  if (absNum >= 1_000_000_000) {
    numberText = `${(num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1)}b`;
  } else if (absNum >= 1_000_000) {
    numberText = `${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1)}m`;
  } else if (absNum >= 1_000) {
    numberText = `${(num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1)}k`;
  } else {
    numberText = `${num}`;
  }
  return `${dollarSign}${numberText}`
};

/** Format max allocation for Firms table: 300000 → "300K" (uppercase K) */
export const formatMaxAllocationToK = (value: string | number): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0K";
  const absNum = Math.abs(num);
  if (absNum >= 1_000_000) {
    const val = num / 1_000_000;
    return `${val % 1 === 0 ? val : val.toFixed(1)}M`;
  }
  if (absNum >= 1_000) {
    const val = num / 1_000;
    return `${val % 1 === 0 ? val : val.toFixed(1)}K`;
  }
  return `${num}`;
};

/** Format currency with full number and commas for Challenges: 300000 → "300,000" */
export const formatCurrencyLong = (
  value: string | number,
  showDollar: boolean = true
): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return showDollar ? "$0" : "0";
  const formatted = Math.round(num).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return showDollar ? `$${formatted}` : formatted;
};
