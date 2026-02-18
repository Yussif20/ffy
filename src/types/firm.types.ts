import { Offer } from "@/redux/api/offerApi";
import { Platform } from "./platform.type";

export interface Broker {
  id: string;
  title: string;
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethod {
  id: string;
  title: string;
  logoUrl: string;
}

export interface PayoutMethod {
  id: string;
  title: string;
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type SinglePropFirm = {
  id: string;
  affiliateLink: string;
  title: string;
  logoUrl: string;
  slug: string;
  ceo: string;
  dateEstablished: string;
  brokers: Broker[];
  platforms: Platform[];
  payoutMethods: PayoutMethod[];
  offerPercentage: any;
  offerCode: any;
  typeOfInstruments: string[];
  countries: string[];
  leverage: string;
  leverageArabic: string;
  commission: string;
  commissionArabic: string;
  accountSizes: string;
  accountSizesArabic: string;
  dailyMaxLoss: string;
  dailyMaxLossArabic: string;
  minimumTradingDays: string;
  minimumTradingDaysArabic: string;
  scaleupPlans: string;
  scaleupPlansArabic: string;
  maxAllocation: number;
  country: string;
  commissions: any[];
  instrumentType: any[];
  payoutPolicy: string;
  consistencyRules: string;
  firmType: string;
  restrictedCountries: string[];
  spreads: any[];
  programTypes: string[];
  assets: string[];
  paymentMethods: PaymentMethod[];
  drawDowns: string[];
  offers: Offer[];
  drawDownTexts: DrawDownText[];
  count: {
    offers: number;
    challenges: number;
    announcements: number;
  };
  allocationRules: string;
  newsTradingAllowedRules: string;
  newsTradingNotAllowedRules: string;
  overnightAndWeekendsHolding: string;
  copyTradingAllowedRules: string;
  copyTradingNotAllowedRules: string;
  expertsAllowedRules: string;
  expertsNotAllowedRules: string;
  riskManagement: string;
  vpnVps: string;
  profitShare: string;
  inactivityRules: string;
  prohibitedStrategies: string;

  payoutPolicyArabic?: string;
  consistencyRulesArabic?: string;
  allocationRulesArabic?: string;
  newsTradingAllowedRulesArabic?: string;
  newsTradingNotAllowedRulesArabic?: string;
  overnightAndWeekendsHoldingArabic?: string;
  copyTradingAllowedRulesArabic?: string;
  copyTradingNotAllowedRulesArabic?: string;
  expertsAllowedRulesArabic?: string;
  expertsNotAllowedRulesArabic?: string;
  riskManagementArabic?: string;
  vpnVpsArabic?: string;
  profitShareArabic?: string;
  inactivityRulesArabic?: string;
  prohibitedStrategiesArabic?: string;
  index: number;
};

export type AccountSize = {
  id: string;
  type: string;
  typeArabic: string;
  englishText: string;
  arabicText: string;
};

export type DailyMaxLoss = {
  id: string;
  type: string;
  typeArabic: string;
  englishText: string;
  arabicText: string;
};

export type MinimumTradingDaysType = {
  id: string;
  type: string;
  typeArabic: string;
  englishText: string;
  arabicText: string;
};

export type ScaleupPlans = {
  id: string;
  rules: string;
  rulesArabic: string;
};

export type DrawDownText = {
  drawdown: string;
  englishText: string;
  arabicText: string;
};
