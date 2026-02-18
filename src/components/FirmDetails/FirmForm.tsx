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
import { DrawDownTexts, MonthAndYear } from "./ExtraField";
import { useTranslations } from "next-intl";
import useIsFutures from "@/hooks/useIsFutures";
import { useGetAllPaymentMethodQuery } from "@/redux/api/paymentMethodApi";
import { useGetAllPlatformQuery } from "@/redux/api/platformApi";
import { useGetBrokersQuery } from "@/redux/api/brokerApi";
import { Broker } from "@/types/broker.type";
import { Platform } from "@/types";
import { PaymentMethod } from "@/types/payment-method";
import { Minus, Plus } from "lucide-react";
import RichTextEditor2 from "../Forms/RichTextEditor2";
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
    if (values.find((item) => item.drawdown === value)) {
      setValue(
        "drawDownTexts",
        getValues("drawDownTexts").filter(
          (drawDown: any) => drawDown.drawdown !== value,
        ),
      );
    } else {
      setValue("drawDownTexts", [
        ...getValues("drawDownTexts"),
        { drawdown: value, englishText: "", arabicText: "" },
      ]);
    }
  };

  return (
    <>
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
          <CustomSelect
            name="inNew"
            label={t("showInNewSection")}
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
            required
          />
          <div className="md:col-span-2">
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
          <RichTextEditor2 name="leverage" label={"English"} required />
          <RichTextEditor2 name="leverageArabic" label={"Arabic"} required />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.commissions")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2 name="commission" label={"English"} required />
          <RichTextEditor2 name="commissionArabic" label={"Arabic"} required />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.accountSizes")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2 name="accountSizes" label={"English"} required />
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
          <RichTextEditor2 name="dailyMaxLoss" label={"English"} required />
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
        <DrawDownTexts />
      </div>

      {!isFutures && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold border-b pb-2">
            {tSidebar("items.riskManagement")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RichTextEditor2 name="riskManagement" label={"English"} required />
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
          <RichTextEditor2 name="consistencyRules" label={"English"} required />
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
          />
          <RichTextEditor2
            name="expertsAllowedRulesArabic"
            label={"Allowed Rules Arabic"}
          />
          <RichTextEditor2
            name="expertsNotAllowedRules"
            label={"Not Allowed Rules English"}
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
          <RichTextEditor2 name="vpnVps" label={"English"} required />
          <RichTextEditor2 name="vpnVpsArabic" label={"Arabic"} required />
        </div>
      </div>

      {!isFutures && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold border-b pb-2">
            {tSidebar("items.profitShare")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RichTextEditor2 name="profitShare" label={"English"} required />
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
          <RichTextEditor2 name="payoutPolicy" label={"English"} required />
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
            <RichTextEditor2 name="scaleupPlans" label={"English"} />
            <RichTextEditor2 name="scaleupPlansArabic" label={"Arabic"} />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">
          {tSidebar("items.inactivityRules")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichTextEditor2 name="inactivityRules" label={"English"} required />
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
