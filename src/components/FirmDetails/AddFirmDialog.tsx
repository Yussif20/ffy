"use client";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FirmTypeEnum, StepsEnum } from "@/schema/firms.schema";
import { FieldValues } from "react-hook-form";
import CustomForm from "../Forms/CustomForm";
import { countries } from "@/data";
import { useState } from "react";
import useIsFutures from "@/hooks/useIsFutures";
import { useCreateFirmMutation } from "@/redux/api/firms.api";
import { toast } from "sonner";

import FirmForm from "./FirmForm";
import { X } from "lucide-react";

export const defaultValues = {
  logoUrl: "",
  firmType: FirmTypeEnum.FOREX,
  title: "",
  dateEstablished: undefined,
  ceo: "",
  offerPercentage: undefined,
  offerCode: "",
  isPopular: "false",
  inNew: "false",
  affiliateLink: "",
  maxAllocation: 0,
  country: "",
  leverage: "",
  leverageArabic: "",
  commission: "",
  commissionArabic: "",
  accountSizes: "",
  accountSizesArabic: "",
  dailyMaxLoss: "",
  dailyMaxLossArabic: "",
  scaleupPlans: "",
  scaleupPlansArabic: "",
  minimumTradingDays: "",
  minimumTradingDaysArabic: "",

  brokers: [],
  platforms: [],
  paymentMethods: [],
  payoutMethods: [],
  restrictedCountries: [],
  typeOfInstruments: [],
  drawDowns: [],
  drawDownTexts: [],
  otherFeatures: [],
  programTypes: [StepsEnum.STEP1],

  allocationRules: "",
  newsTradingAllowedRules: "",
  newsTradingNotAllowedRules: "",
  overnightAndWeekendsHolding: "",
  copyTradingAllowedRules: "",
  copyTradingNotAllowedRules: "",
  expertsAllowedRules: "",
  expertsNotAllowedRules: "",
  riskManagement: "",
  vpnVps: "",
  profitShare: "",
  inactivityRules: "",
  prohibitedStrategies: "",

  payoutPolicyArabic: "",
  consistencyRulesArabic: "",
  allocationRulesArabic: "",
  newsTradingAllowedRulesArabic: "",
  newsTradingNotAllowedRulesArabic: "",
  overnightAndWeekendsHoldingArabic: "",
  copyTradingAllowedRulesArabic: "",
  copyTradingNotAllowedRulesArabic: "",
  expertsAllowedRulesArabic: "",
  expertsNotAllowedRulesArabic: "",
  riskManagementArabic: "",
  vpnVpsArabic: "",
  profitShareArabic: "",
  inactivityRulesArabic: "",
  prohibitedStrategiesArabic: "",
};

export const AddFirmDialog = () => {
  const t = useTranslations("FirmManagement");
  const [open, setOpen] = useState(false);
  const [createFirm, { isLoading }] = useCreateFirmMutation();
  const isFutures = useIsFutures();
  const [showOffer, setShowOffer] = useState(false);

  const handleSubmit = async (data: FieldValues) => {
    const formData = {
      firmType: isFutures ? "FUTURES" : "FOREX",
      title: data.title,
      dateEstablished: new Date(data.dateEstablished),
      ceo: data.ceo,
      hidden: false,
      brokers: data.brokers,
      platforms: data.platforms,
      paymentMethods: data.paymentMethods,
      payoutMethods: data.payoutMethods,
      restrictedCountries: data.restrictedCountries,
      countries: countries
        .filter((c) => !data.restrictedCountries.includes(c.country))
        .map((item) => item.country),
      typeOfInstruments: data.typeOfInstruments,
      drawDowns: data.drawDowns,
      drawDownTexts: data.drawDownTexts,
      otherFeatures: data.otherFeatures,
      programTypes: data.programTypes,
      affiliateLink: data.affiliateLink,
      maxAllocation: Number(data.maxAllocation),
      payoutPolicy: data.payoutPolicy,
      consistencyRules: data.consistencyRules,
      country: data.country,
      isPopular: data.isPopular === "true",
      inNew: data.inNew === "true",
      leverage: data.leverage,
      leverageArabic: data.leverageArabic,
      commission: data.commission,
      commissionArabic: data.commissionArabic,
      accountSizes: data.accountSizes,
      accountSizesArabic: data.accountSizesArabic,
      dailyMaxLoss: data.dailyMaxLoss,
      dailyMaxLossArabic: data.dailyMaxLossArabic,
      scaleupPlans: data.scaleupPlans,
      scaleupPlansArabic: data.scaleupPlansArabic,
      minimumTradingDays: data.minimumTradingDays,
      minimumTradingDaysArabic: data.minimumTradingDaysArabic,
      ...(showOffer && {
        offerPercentage: Number(data.offerPercentage) || 0,
        offerCode: data.offerCode || "",
      }),
      allocationRules: data.allocationRules,
      newsTradingAllowedRules: data.newsTradingAllowedRules,
      newsTradingNotAllowedRules: data.newsTradingNotAllowedRules,
      overnightAndWeekendsHolding: data.overnightAndWeekendsHolding,
      copyTradingAllowedRules: data.copyTradingAllowedRules,
      copyTradingNotAllowedRules: data.copyTradingNotAllowedRules,
      expertsAllowedRules: data.expertsAllowedRules,
      expertsNotAllowedRules: data.expertsNotAllowedRules,
      riskManagement: data.riskManagement || "",
      vpnVps: data.vpnVps,
      profitShare: data.profitShare || "",
      inactivityRules: data.inactivityRules,
      prohibitedStrategies: data.prohibitedStrategies,

      payoutPolicyArabic: data.payoutPolicyArabic,
      consistencyRulesArabic: data.consistencyRulesArabic,
      allocationRulesArabic: data.allocationRulesArabic,
      newsTradingAllowedRulesArabic: data.newsTradingAllowedRulesArabic,
      newsTradingNotAllowedRulesArabic: data.newsTradingNotAllowedRulesArabic,
      overnightAndWeekendsHoldingArabic: data.overnightAndWeekendsHoldingArabic,
      copyTradingAllowedRulesArabic: data.copyTradingAllowedRulesArabic,
      copyTradingNotAllowedRulesArabic: data.copyTradingNotAllowedRulesArabic,
      expertsAllowedRulesArabic: data.expertsAllowedRulesArabic,
      expertsNotAllowedRulesArabic: data.expertsNotAllowedRulesArabic,
      riskManagementArabic: data.riskManagementArabic,
      vpnVpsArabic: data.vpnVpsArabic,
      profitShareArabic: data.profitShareArabic,
      inactivityRulesArabic: data.inactivityRulesArabic,
      prohibitedStrategiesArabic: data.prohibitedStrategiesArabic,
    };

    const sendingData = new FormData();
    sendingData.append("data", JSON.stringify(formData));
    sendingData.append("logo", data.logoUrl);
    const toastId = toast.loading("Creating firm...");
    try {
      await createFirm(sendingData).unwrap();
      setOpen(false);
      toast.success("Firm created successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to create firm", { id: toastId });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>{t("addFirm")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-full md:container! h-[85vh] overflow-y-auto pt-0">
        <div className="flex justify-between items-center sticky top-0 right-0 bg-background z-50 py-4">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("addNewFirm")}</AlertDialogTitle>
          </AlertDialogHeader>
          <Button
            size={"icon"}
            variant={"outline2"}
            onClick={() => setOpen(false)}
            className=""
          >
            <X />
          </Button>
        </div>
        <CustomForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          className="space-y-6 py-4"
        >
          <FirmForm
            open={open}
            showOffer={showOffer}
            setShowOffer={setShowOffer}
          />
          <Button disabled={isLoading} type="submit" className="w-full h-11">
            {isLoading ? t("creatingFirm") : t("createFirm")}
          </Button>
        </CustomForm>
      </AlertDialogContent>
    </AlertDialog>
  );
};
