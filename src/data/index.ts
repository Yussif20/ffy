export * from "./announcements.data";
export * from "./challenge.data";
export * from "./companies.data";
export * from "./country.data";
export * from "./news.data";
export * from "./offer.data";
export * from "./news.data";

export const programTypes = [
  { name: "1 Step", value: "STEP1" },
  { name: "2 Step", value: "STEP2" },
  { name: "3 Step", value: "STEP3" },
  { name: "4 Step", value: "STEP4" },
  { name: "Instant", value: "INSTANT" },
];

export const drawDowns = [
  { name: "Balance Based", value: "balanceBased" },
  { name: "Equity Based", value: "equityBased" },
  { name: "Trailing EOD", value: "trailingEod" },
  { name: "Trailing Intraday", value: "trailingIntraday" },
  { name: "Smart DD", value: "smartDd" },
];

export const otherFeatures = [
  { name: "Expert Advisor", value: "expertAdvisor" },
  { name: "News Trading", value: "newsTrading" },
  { name: "Overnight Holding", value: "overnightHolding" },
  { name: "Weekend Holding", value: "weekendHolding" },
  { name: "Swap Free Account", value: "swapFreeAccount" },
  { name: "Trade Copying", value: "tradeCopying" },
];

export const propFirmInstrumentTypes = [
  { name: "Forex", value: "forex" },
  { name: "CFD", value: "cfd" },
  { name: "Stocks", value: "stocks" },
  { name: "Futures", value: "futures" },
  { name: "Options", value: "options" },
  { name: "Crypto", value: "crypto" },
  { name: "Metals", value: "metals" },
  { name: "Energy", value: "energy" },
];
