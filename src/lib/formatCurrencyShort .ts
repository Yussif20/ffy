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
