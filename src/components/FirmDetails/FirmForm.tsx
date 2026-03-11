import CustomYesNoToggle from "../Forms/CustomYesNoToggle";
import CustomInput from "../Forms/CustomInput";
import {
  countries,
  drawDowns,
  otherFeatures,
  programTypes,
  propFirmInstrumentTypes,
} from "@/data";
import CustomComboBoxMultiple from "../Forms/CustomComboBoxMultiple";
import { Toggle } from "../ui/toggle";
import CustomSelect from "../Forms/CustomSelect";
import BMImageUpload from "../Overview/BrokerManagement/BMImageUpload";
import { DrawDownProgramTypes, DrawDownTexts, MonthAndYear } from "./ExtraField";
import { useTranslations } from "next-intl";
import useIsFutures from "@/hooks/useIsFutures";
import { useGetAllPaymentMethodQuery } from "@/redux/api/paymentMethodApi";
import { useGetAllPlatformQuery } from "@/redux/api/platformApi";
import { useGetBrokersQuery } from "@/redux/api/brokerApi";
import { Broker } from "@/types/broker.type";
import { Platform } from "@/types";
import { PaymentMethod } from "@/types/payment-method";
import { Minus, Plus, X as XIcon } from "lucide-react";
import RichTextEditor2 from "../Forms/RichTextEditor2";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

function ChallengeNamesField() {
  const { watch, setValue, getValues } = useFormContext();
  const [input, setInput] = useState("");

  const addName = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const current = getValues("challengeNames") || [];
    if (!current.includes(trimmed)) {
      setValue("challengeNames", [...current, trimmed]);
    }
    setInput("");
  };

  return (
    <div className="col-span-full">
      <label className="block text-sm font-medium mb-1">Challenge Names</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addName();
            }
          }}
          placeholder="Enter a challenge name"
          className="w-full border rounded-3xl border-chart-1 px-3 py-2"
        />
        <button
          type="button"
          onClick={addName}
          className="bg-primary1 text-foreground px-4 rounded-3xl"
        >
          Add
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {(watch("challengeNames") || []).map((name: string, idx: number) => (
          <span
            key={idx}
            className="bg-primary1 text-foreground px-2 py-1 rounded flex items-center gap-1"
          >
            {name}
            <button
              type="button"
              onClick={() =>
                setValue(
                  "challengeNames",
                  getValues("challengeNames").filter((_: any, i: number) => i !== idx),
                )
              }
              className="text-red-500 font-bold ml-1"
            >
              <XIcon className="size-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FirmForm({
  showOffer,
  setShowOffer,
  logoUrl,
  open,
}: {
  showOffer: boolean;
  setShowOffer: (value: boolean) => void;
  logoUrl?: string;
  open: boolean;
}) {
  const t = useTranslations("FirmManagement");
  const tSidebar = useTranslations("FOSidebar");
  const isFutures = useIsFutures();
  const { data: paymentMethods, isLoading: isLoadingPaymentMethods } =
    useGetAllPaymentMethodQuery([{ name: "limit", value: 1000 }], {
      skip: !open,
    });
  const { data: platforms, isLoading: isLoadingPlatforms } =
    useGetAllPlatformQuery([{ name: "limit", value: 1000 }], { skip: !open });
  const { data: brokers, isLoading: isLoadingBrokers } = useGetBrokersQuery(
    [{ name: "limit", value: 1000 }],
    { skip: !open },
  );

  const allBrokers: Broker[] = brokers?.data.brokers || [];
  const allPlatforms: Platform[] = platforms?.data.platforms || [];
  const allPaymentMethods: PaymentMethod[] = paymentMethods?.data || [];
  const extraFunction = (
    value: string,
    values: any[],
    setValue: any,
    getValues: any,
  ) => {
    const currentMap = getValues("drawDownProgramTypeMap") || {};
    if (values.find((item) => item.drawdown === value)) {
      // Removing drawdown
      setValue(
        "drawDownTexts",
        getValues("drawDownTexts").filter(
          (drawDown: any) => drawDown.drawdown !== value,
        ),
      );
      const { [value]: _, ...rest } = currentMap;
      setValue("drawDownProgramTypeMap", rest);
    } else {
      // Adding drawdown - default to all selected program types
      setValue("drawDownTexts", [
        ...getValues("drawDownTexts"),
        { drawdown: value, englishText: "", arabicText: "" },
      ]);
      const currentProgramTypes = getValues("programTypes") || [];
      setValue("drawDownProgramTypeMap", {
        ...currentMap,
        [value]: [...currentProgramTypes],
      });
    }
  };

  return (
    <>
      {/* Hidden Toggle */}
      <CustomYesNoToggle name="hidden" label="Hidden" />

      {/* Basic Information Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {t("basicInfo")}
        </h3>
        <BMImageUpload logoUrl={logoUrl} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CustomInput
            type="text"
            label={t("firmTitle")}
            name="title"
            fieldClassName="h-11"
            placeholder={t("firmTitlePlaceholder")}
            required
          />
          <CustomSelect
            name="isPopular"
            label={t("markPopular")}
            placeholder={t("selectStatus")}
            options={[
              { value: "true", label: t("yes") },
              { value: "false", label: t("no") },
            ]}
          />
          <CustomInput
            type="text"
            label={t("ceo")}
            name="ceo"
            fieldClassName="h-11"
            placeholder={t("ceoPlaceholder")}
            required
          />

          <MonthAndYear />
          <CustomComboBoxMultiple
            name="country"
            mode="single"
            label={t("primaryCountry")}
            placeholder={t("countryPlaceholder")}
            options={countries.map((country) => ({
              value: country.country,
              name: country.country,
              image: country?.flag,
            }))}
            required
          />

          <CustomComboBoxMultiple
            name="programTypes"
            label={t("programTypes")}
            placeholder={t("programTypesPlaceholder")}
            options={programTypes}
            required
          />

          <CustomComboBoxMultiple
            name="otherFeatures"
            label={t("otherFeatures")}
            placeholder={t("otherFeaturesPlaceholder")}
            options={otherFeatures.map((otherFeature) => ({
              value: otherFeature.value,
              name: otherFeature.name,
            }))}
          />

          <ChallengeNamesField />

          <div className="md:col-span-2 space-y-4">
            <CustomComboBoxMultiple
              name="restrictedCountries"
              label={t("restrictedCountries")}
              placeholder={t("restrictedCountriesPlaceholder")}
              options={countries.map((country) => ({
                value: country.country,
                name: country.country,
                image: country?.flag,
              }))}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RichTextEditor2 name="restrictedCountriesNote" label="Restricted Countries Note (English)" mobileFontSizeName="restrictedCountriesNoteMobileFontSize" />
              <RichTextEditor2 name="restrictedCountriesNoteArabic" label="Restricted Countries Note (Arabic)" />
            </div>
          </div>
        </div>
        {/* Offer Section */}
        <div className="space-y-3">
          <Toggle
            pressed={showOffer}
            onPressedChange={setShowOffer}
            variant="outline"
            size="lg"
            className="w-full justify-center"
          >
            {showOffer ? t("hideOffer") : t("addOffer")}
            {showOffer ? <Minus /> : <Plus />}
          </Toggle>
          {showOffer && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-foreground/5 rounded-lg border">
              <CustomInput
                type="number"
                label={t("offerPercentage")}
                name="offerPercentage"
                fieldClassName="h-11"
                placeholder={t("offerPercentagePlaceholder")}
                required
              />
              <CustomInput
                type="text"
                label={t("offerCode")}
                name="offerCode"
                fieldClassName="h-11"
                placeholder={t("offerCodePlaceholder")}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.firmOverview")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CustomComboBoxMultiple
            name="brokers"
            isLoading={isLoadingBrokers}
            label={t("brokers")}
            placeholder={t("brokersPlaceholder")}
            options={allBrokers.map((broker) => ({
              value: broker.id,
              image: broker.logoUrl,
              name: broker.title,
            }))}
            required
          />
          <CustomComboBoxMultiple
            name="platforms"
            isLoading={isLoadingPlatforms}
            label={t("platforms")}
            placeholder={t("platformsPlaceholder")}
            options={allPlatforms.map((platform) => ({
              value: platform.id,
              image: platform.logoUrl,
              name: platform.title,
            }))}
            required
          />
          <CustomComboBoxMultiple
            name="paymentMethods"
            isLoading={isLoadingPaymentMethods}
            label={t("paymentMethods")}
            placeholder={t("paymentMethodsPlaceholder")}
            options={allPaymentMethods.map((paymentMethod) => ({
              value: paymentMethod.id,
              name: paymentMethod.title,
              image: paymentMethod.logoUrl,
            }))}
            required
          />
          <CustomComboBoxMultiple
            name="payoutMethods"
            isLoading={isLoadingPaymentMethods}
            label={t("payoutMethods")}
            placeholder={t("payoutMethodsPlaceholder")}
            options={allPaymentMethods.map((payoutMethod) => ({
              value: payoutMethod.id,
              name: payoutMethod.title,
              image: payoutMethod.logoUrl,
            }))}
            required
          />
          <CustomComboBoxMultiple
            name="typeOfInstruments"
            label={t("instruments")}
            placeholder={t("instrumentsPlaceholder")}
            options={propFirmInstrumentTypes}
            required
          />
        </div>
      </div>

      {/* Leverages Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.leverage")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2 name="leverage" label={"English"} required mobileFontSizeName="leverageMobileFontSize" />
          <RichTextEditor2 name="leverageArabic" label={"Arabic"} required />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.commissions")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2 name="commission" label={"English"} required mobileFontSizeName="commissionMobileFontSize" />
          <RichTextEditor2 name="commissionArabic" label={"Arabic"} required />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.accountSizes")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2 name="accountSizes" label={"English"} required mobileFontSizeName="accountSizesMobileFontSize" />
          <RichTextEditor2
            name="accountSizesArabic"
            label={"Arabic"}
            required
          />
        </div>
      </div>

      {/* Financial Information Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {t("financialDetails")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CustomInput
            type="number"
            label={t("maxAllocation")}
            name="maxAllocation"
            fieldClassName="h-11"
            placeholder={t("maxAllocationPlaceholder")}
            required
          />
          <CustomInput
            type="text"
            label={t("affiliateLink")}
            name="affiliateLink"
            fieldClassName="h-11"
            placeholder={t("affiliateLinkPlaceholder")}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2
            name="allocationRules"
            label={t("allocationRules")}
            required
            mobileFontSizeName="allocationRulesMobileFontSize"
          />
          <RichTextEditor2
            name="allocationRulesArabic"
            label={t("allocationRulesArabic")}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.dailyMaximumLoss")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2 name="dailyMaxLoss" label={"English"} required mobileFontSizeName="dailyMaxLossMobileFontSize" />
          <RichTextEditor2
            name="dailyMaxLossArabic"
            label={"Arabic"}
            required
          />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.drawdown")}
        </h3>
        <CustomComboBoxMultiple
          name="drawDowns"
          label={t("drawdowns")}
          placeholder={t("drawdownsPlaceholder")}
          options={drawDowns.map((drawDown) => ({
            value: drawDown.value,
            name: drawDown.name,
          }))}
          required
          extraFunction={extraFunction}
        />
        <DrawDownProgramTypes />
        <DrawDownTexts />
      </div>

      {!isFutures && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold border-b pb-2">
            {tSidebar("items.riskManagement")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RichTextEditor2 name="riskManagement" label={"English"} required mobileFontSizeName="riskManagementMobileFontSize" />
            <RichTextEditor2
              name="riskManagementArabic"
              label={"Arabic"}
              required
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.consistencyRules")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2 name="consistencyRules" label={"English"} required mobileFontSizeName="consistencyRulesMobileFontSize" />
          <RichTextEditor2
            name="consistencyRulesArabic"
            label={"Arabic"}
            required
          />
        </div>
      </div>

      {!isFutures && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold border-b pb-2">
            {tSidebar("items.minimumTradingDays")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RichTextEditor2
              name="minimumTradingDays"
              label={"English"}
              required
              mobileFontSizeName="minimumTradingDaysMobileFontSize"
            />
            <RichTextEditor2
              name="minimumTradingDaysArabic"
              label={"Arabic"}
              required
            />
          </div>
        </div>
      )}

      {/* News Trading Rules */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.newsTrading")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2
            name="newsTradingAllowedRules"
            label={"Allowed Rules"}
            required
            mobileFontSizeName="newsTradingAllowedRulesMobileFontSize"
          />
          <RichTextEditor2
            name="newsTradingAllowedRulesArabic"
            label={"Allowed Rules Arabic"}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2
            name="newsTradingNotAllowedRules"
            label={"Not Allowed Rules"}
            required
            mobileFontSizeName="newsTradingNotAllowedRulesMobileFontSize"
          />
          <RichTextEditor2
            name="newsTradingNotAllowedRulesArabic"
            label={"Not Allowed Rules Arabic"}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.overnightWeekendsHolding")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2
            name="overnightAndWeekendsHolding"
            label={"English"}
            required
            mobileFontSizeName="overnightAndWeekendsHoldingMobileFontSize"
          />
          <RichTextEditor2
            name="overnightAndWeekendsHoldingArabic"
            label={"Arabic"}
            required
          />
        </div>
      </div>

      {/* Copy Trading Rules */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.copyTrading")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2
            name="copyTradingAllowedRules"
            label={"Allowed Rules English"}
            required
            mobileFontSizeName="copyTradingAllowedRulesMobileFontSize"
          />
          <RichTextEditor2
            name="copyTradingAllowedRulesArabic"
            label={"Allowed Rules Arabic"}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2
            name="copyTradingNotAllowedRules"
            label={"Not Allowed Rules English"}
            required
            mobileFontSizeName="copyTradingNotAllowedRulesMobileFontSize"
          />
          <RichTextEditor2
            name="copyTradingNotAllowedRulesArabic"
            label={"Not Allowed Rules Arabic"}
            required
          />
        </div>
      </div>

      {/* Experts Rules */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.experts")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2
            name="expertsAllowedRules"
            label={"Allowed Rules English"}
            mobileFontSizeName="expertsAllowedRulesMobileFontSize"
          />
          <RichTextEditor2
            name="expertsAllowedRulesArabic"
            label={"Allowed Rules Arabic"}
          />
          <RichTextEditor2
            name="expertsNotAllowedRules"
            label={"Not Allowed Rules English"}
            mobileFontSizeName="expertsNotAllowedRulesMobileFontSize"
          />
          <RichTextEditor2
            name="expertsNotAllowedRulesArabic"
            label={"Not Allowed Rules Arabic"}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.vpnVps")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2 name="vpnVps" label={"English"} required mobileFontSizeName="vpnVpsMobileFontSize" />
          <RichTextEditor2 name="vpnVpsArabic" label={"Arabic"} required />
        </div>
      </div>

      {!isFutures && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold border-b pb-2">
            {tSidebar("items.profitShare")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RichTextEditor2 name="profitShare" label={"English"} required mobileFontSizeName="profitShareMobileFontSize" />
            <RichTextEditor2
              name="profitShareArabic"
              label={"Arabic"}
              required
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.payoutPolicy")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2 name="payoutPolicy" label={"English"} required mobileFontSizeName="payoutPolicyMobileFontSize" />
          <RichTextEditor2
            name="payoutPolicyArabic"
            label={"Arabic"}
            required
          />
        </div>
      </div>

      {!isFutures && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold border-b pb-2">
            {tSidebar("items.scaleUpPlan")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RichTextEditor2 name="scaleupPlans" label={"English"} mobileFontSizeName="scaleupPlansMobileFontSize" />
            <RichTextEditor2 name="scaleupPlansArabic" label={"Arabic"} />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.inactivityRules")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2 name="inactivityRules" label={"English"} required mobileFontSizeName="inactivityRulesMobileFontSize" />
          <RichTextEditor2
            name="inactivityRulesArabic"
            label={"Arabic"}
            required
          />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.prohibitedStrategies")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2
            name="prohibitedStrategies"
            label={"English"}
            required
            mobileFontSizeName="prohibitedStrategiesMobileFontSize"
          />
          <RichTextEditor2
            name="prohibitedStrategiesArabic"
            label={"Arabic"}
            required
          />
        </div>
      </div>
    </>
  );
}
