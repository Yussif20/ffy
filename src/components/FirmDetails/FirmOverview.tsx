import { Badge } from "@/components/ui/badge";
import { countries } from "@/data";
import { SinglePropFirm } from "@/types/firm.types";
import Image from "next/image";
import { Separator } from "../ui/separator";
import FO_Sidebar from "./FO_Sidebar";
import { serverApi } from "@/lib/serverAxios";
import { getTranslations } from "next-intl/server";
import { ProfitShare, RiskManagement } from "./FuturesHiddenParts";
import { visibleText } from "@/utils/visibleText";
import SecTitle from "./FO_SecTitle";
import { cn } from "@/lib/utils";
import Subscribe from "@/components/Forex_Features/Subscribe";

export default async function FirmOverview({
  slug,
  locale,
  type,
}: {
  slug: string;
  locale: string;
  type: string;
}) {
  const t = await getTranslations("FirmOverview");
  const tSidebar = await getTranslations("FOSidebar");
  const { data } = await serverApi.get<{ data: SinglePropFirm }>(
    `/firms/${slug}?formData=true`,
  );
  const company = data?.data as SinglePropFirm;
  const isArabic = locale === "ar";
  const isFutures = type === "futures";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        {company?.title} Prop Firm Details
      </h1>

      <div className="flex gap-8 relative flex-col lg:flex-row">
        {/* Sidebar Navigation */}
        {/* Sticky section bar: below sticky offer bar on small (top-[6.5rem]), on lg top-52; bar is hidden on md+ */}
        <div className="sticky top-[6.5rem] lg:top-52 h-max bg-background z-20 pt-3 lg:pt-4 border-b-0">
          <FO_Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Firm Overview */}
          <section id="firm-overview" className="space-y-6 scroll-mt-[270px]">
            <SecTitle>
              {tSidebar("items.firmOverview")}
            </SecTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3
                  className={cn(
                    "text-sm font-semibold  mb-3 ",
                    isArabic ? "text-base" : "",
                  )}
                >
                  {t("labels.broker")}
                </h3>
                <BadgeList items={company?.brokers} />
              </div>
              <div>
                <h3
                  className={cn(
                    "text-sm font-semibold  mb-3 ",
                    isArabic ? "text-base" : "",
                  )}
                >
                  {t("labels.platform")}
                </h3>
                <BadgeList items={company?.platforms} />
              </div>
              <div>
                <h3
                  className={cn(
                    "text-sm font-semibold  mb-3 ",
                    isArabic ? "text-base" : "",
                  )}
                >
                  {t("labels.paymentMethods")}
                </h3>
                <BadgeList items={company?.paymentMethods} />
              </div>
              <div>
                <h3
                  className={cn(
                    "text-sm font-semibold  mb-3 ",
                    isArabic ? "text-base" : "",
                  )}
                >
                  {t("labels.payoutMethods")}
                </h3>
                <BadgeList items={company?.payoutMethods} />
              </div>
              <div>
                <h2
                  className={cn(
                    "text-sm font-semibold  mb-3 ",
                    isArabic ? "text-base" : "",
                  )}
                >
                  {t("labels.instruments")}
                </h2>
                <BadgeList
                  items={company?.typeOfInstruments?.map((instrument) => ({
                    title: instrument,
                  }))}
                />
              </div>
            </div>
          </section>

          <Separator />

          {/* Leverage */}
          <section
            id="leverages"
            className="overflow-x-auto space-y-6 scroll-mt-[270px]"
          >
            <SecTitle>
              {tSidebar("items.leverage")}
            </SecTitle>
            <div className="text-base md:text-lg">
              <div
                className="danger-html"
                dangerouslySetInnerHTML={{
                  __html: visibleText(
                    isArabic,
                    company?.leverage,
                    company?.leverageArabic,
                  ),
                }}
              ></div>
            </div>
          </section>

          <Separator />

          {/* Commissions */}
          <section
            id="commissions"
            className="overflow-x-auto space-y-6 scroll-mt-[270px]"
          >
            <SecTitle>
              {tSidebar("items.commissions")}
            </SecTitle>
            <div className="text-sm md:text-base">
              <div
                className="danger-html"
                dangerouslySetInnerHTML={{
                  __html: visibleText(
                    isArabic,
                    company?.commission,
                    company?.commissionArabic,
                  ),
                }}
              ></div>
            </div>
          </section>

          <Separator />

          {/* Account Sizes */}
          <section
            id="account-sizes"
            className="overflow-x-auto space-y-6 scroll-mt-[270px]"
          >
            <SecTitle>
              {tSidebar("items.accountSizes")}
            </SecTitle>
            <div className="text-sm md:text-base">
              <div
                className="danger-html"
                dangerouslySetInnerHTML={{
                  __html: visibleText(
                    isArabic,
                    company?.accountSizes,
                    company?.accountSizesArabic,
                  ),
                }}
              ></div>
            </div>
          </section>

          <Separator />

          {/* Max Allocation */}
          <section
            id="max-allocation"
            className="overflow-x-auto space-y-6 scroll-mt-[270px]"
          >
            <SecTitle>
              {tSidebar("items.maxAllocation")}
            </SecTitle>
            {company?.allocationRules && (
              <div className="text-sm md:text-base">
                <div
                  className="danger-html"
                  dangerouslySetInnerHTML={{
                    __html: visibleText(
                      isArabic,
                      company?.allocationRules,
                      company?.allocationRulesArabic,
                    ),
                  }}
                ></div>
              </div>
            )}
          </section>
          <Separator />

          {/* dailyMaxLoss */}
          <section
            id="daily-maximum-loss"
            className="overflow-x-auto space-y-6 scroll-mt-[270px]"
          >
            <SecTitle>
              {tSidebar("items.dailyMaximumLoss")}
            </SecTitle>
            <div className="text-sm md:text-base">
              <div
                className="danger-html"
                dangerouslySetInnerHTML={{
                  __html: visibleText(
                    isArabic,
                    company?.dailyMaxLoss,
                    company?.dailyMaxLossArabic,
                  ),
                }}
              ></div>
            </div>
          </section>

          <Separator />

          {/* Draw down */}
          <section
            id="drawdown"
            className="overflow-x-auto space-y-6 scroll-mt-[270px]"
          >
            <SecTitle>
              {tSidebar("items.drawdown")}
            </SecTitle>

            <div className="space-y-4">
              {company?.drawDownTexts.map((item, idx) => {
                return (
                  <div key={idx} className="space-y-1">
                    <div
                      className="danger-html text-sm md:text-base"
                      dangerouslySetInnerHTML={{
                        __html: visibleText(
                          isArabic,
                          item.englishText,
                          item.arabicText,
                        ),
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </section>
          <Separator />

          {/* Risk Management */}
          <RiskManagement
            isFutures={isFutures}
            company={company}
            isArabic={isArabic}
          />

          {/* Consistency Rules */}
          <section
            id="consistency-rules"
            className="space-y-6 scroll-mt-[270px]"
          >
            <SecTitle>
              {tSidebar("items.consistencyRules")}
            </SecTitle>
            {company?.consistencyRules && (
              <div className="text-sm md:text-base">
                <div
                  className="danger-html"
                  dangerouslySetInnerHTML={{
                    __html: visibleText(
                      isArabic,
                      company?.consistencyRules,
                      company?.consistencyRulesArabic,
                    ),
                  }}
                ></div>
              </div>
            )}
          </section>

          {!isFutures && (
            <>
              <Separator />
              {/* Minimum Trading days — Forex only */}
              <section
                id="minimum-trading-days"
                className="overflow-x-auto space-y-6 scroll-mt-[270px]"
              >
                <SecTitle>
                  {tSidebar("items.minimumTradingDays")}
                </SecTitle>
                <div className="text-sm md:text-base">
                  <div
                    className="danger-html"
                    dangerouslySetInnerHTML={{
                      __html: visibleText(
                        isArabic,
                        company?.minimumTradingDays,
                        company?.minimumTradingDaysArabic,
                      ),
                    }}
                  ></div>
                </div>
              </section>
              <Separator />
            </>
          )}

          {/* news Trading */}
          <section id="news-trading" className="space-y-6 scroll-mt-[270px]">
            <SecTitle>
              {tSidebar("items.newsTrading")}
            </SecTitle>
            <div>
              <h2 className="text-lg font-semibold text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">
                {t("sections.allowed")}
              </h2>
              <div className="text-sm md:text-base">
                <div
                  className="danger-html"
                  dangerouslySetInnerHTML={{
                    __html: visibleText(
                      isArabic,
                      company?.newsTradingAllowedRules,
                      company?.newsTradingAllowedRulesArabic,
                    ),
                  }}
                ></div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                {t("sections.notAllowed")}
              </h2>
              <div className="text-sm md:text-base">
                <div
                  className="danger-html"
                  dangerouslySetInnerHTML={{
                    __html: visibleText(
                      isArabic,
                      company?.newsTradingNotAllowedRules,
                      company?.newsTradingNotAllowedRulesArabic,
                    ),
                  }}
                ></div>
              </div>
            </div>
          </section>

          <Separator />

          {/* overnightAndWeekendsHolding */}
          <section
            id="overnight-weekends-holding"
            className="space-y-6 scroll-mt-[270px]"
          >
            <SecTitle>
              {tSidebar("items.overnightWeekendsHolding")}
            </SecTitle>
            <div
              className="danger-html"
              dangerouslySetInnerHTML={{
                __html: visibleText(
                  isArabic,
                  company?.overnightAndWeekendsHolding,
                  company?.overnightAndWeekendsHoldingArabic,
                ),
              }}
            ></div>
          </section>

          <Separator />

          {/* Copy Trading */}
          <section id="copy-trading" className="space-y-6 scroll-mt-[270px]">
            <SecTitle>
              {tSidebar("items.copyTrading")}
            </SecTitle>
            <div>
              <h2 className="text-lg font-semibold text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">
                {t("sections.allowed")}
              </h2>
              <div className="text-sm md:text-base">
                <div
                  className="danger-html"
                  dangerouslySetInnerHTML={{
                    __html: visibleText(
                      isArabic,
                      company?.copyTradingAllowedRules,
                      company?.copyTradingAllowedRulesArabic,
                    ),
                  }}
                ></div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                {t("sections.notAllowed")}
              </h2>
              <div className="text-sm md:text-base">
                <div
                  className="danger-html"
                  dangerouslySetInnerHTML={{
                    __html: visibleText(
                      isArabic,
                      company?.copyTradingNotAllowedRules,
                      company?.copyTradingNotAllowedRulesArabic,
                    ),
                  }}
                ></div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Experts */}
          <section id="experts" className="space-y-6 scroll-mt-[270px]">
            <SecTitle>
              {tSidebar("items.experts")}
            </SecTitle>
            <div>
              <h2 className="text-lg font-semibold text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">
                {t("sections.allowed")}
              </h2>
              <div className="text-sm md:text-base">
                <div
                  className="danger-html"
                  dangerouslySetInnerHTML={{
                    __html: visibleText(
                      isArabic,
                      company?.expertsAllowedRules,
                      company?.expertsAllowedRulesArabic,
                    ),
                  }}
                ></div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                {t("sections.notAllowed")}
              </h2>
              <div className="text-sm md:text-base">
                <div
                  className="danger-html"
                  dangerouslySetInnerHTML={{
                    __html: visibleText(
                      isArabic,
                      company?.expertsNotAllowedRules,
                      company?.expertsNotAllowedRulesArabic,
                    ),
                  }}
                ></div>
              </div>
            </div>
          </section>

          <Separator />

          {/* vpn-vps */}
          <section id="vpn-vps" className="space-y-6 scroll-mt-[270px]">
            <SecTitle>{tSidebar("items.vpnVps")}</SecTitle>
            <div
              className="danger-html"
              dangerouslySetInnerHTML={{
                __html: visibleText(
                  isArabic,
                  company?.vpnVps,
                  company?.vpnVpsArabic,
                ),
              }}
            ></div>
          </section>
          <Separator />

          {/* profite-share */}
          <ProfitShare
            isFutures={isFutures}
            company={company}
            isArabic={isArabic}
          />

          {/* Payout Policy */}
          <section id="payout-policy" className="space-y-6 scroll-mt-[270px]">
            <SecTitle>
              {tSidebar("items.payoutPolicy")}
            </SecTitle>
            {company?.payoutPolicy && (
              <div className="text-sm md:text-base">
                <div
                  className="danger-html"
                  dangerouslySetInnerHTML={{
                    __html: visibleText(
                      isArabic,
                      company?.payoutPolicy,
                      company?.payoutPolicyArabic,
                    ),
                  }}
                ></div>
              </div>
            )}
          </section>

          {!isFutures && (
            <>
              <Separator />
              {/* Scale up plan — Forex only */}
              <section
                id="scale-up-plan"
                className="overflow-x-auto space-y-6 scroll-mt-[270px]"
              >
                <SecTitle>
                  {tSidebar("items.scaleUpPlan")}
                </SecTitle>
                <div className="text-sm md:text-base">
                  <div
                    className="danger-html"
                    dangerouslySetInnerHTML={{
                      __html: visibleText(
                        isArabic,
                        company?.scaleupPlans,
                        company?.scaleupPlansArabic,
                      ),
                    }}
                  ></div>
                </div>
              </section>
              <Separator />
            </>
          )}

          {/* inatctivity rules*/}
          <section
            id="inactivity-rules"
            className="space-y-6 scroll-mt-[270px]"
          >
            <SecTitle>
              {tSidebar("items.inactivityRules")}
            </SecTitle>
            {company?.inactivityRules && (
              <div className="text-sm md:text-base">
                <div
                  className="danger-html"
                  dangerouslySetInnerHTML={{
                    __html: visibleText(
                      isArabic,
                      company?.inactivityRules,
                      company?.inactivityRulesArabic,
                    ),
                  }}
                ></div>
              </div>
            )}
          </section>
          <Separator />

          {/* prohabited strategies*/}
          <section
            id="prohibited-strategies"
            className="space-y-6 scroll-mt-[270px]"
          >
            <SecTitle>
              {tSidebar("items.prohibitedStrategies")}
            </SecTitle>
            {company?.prohibitedStrategies && (
              <div className="text-sm md:text-base">
                <div
                  className="danger-html"
                  dangerouslySetInnerHTML={{
                    __html: visibleText(
                      isArabic,
                      company?.prohibitedStrategies,
                      company?.prohibitedStrategiesArabic,
                    ),
                  }}
                ></div>
              </div>
            )}
          </section>
          <Separator />

          {/* //restricted Countries  */}
          <section
            id="restricted-countries"
            className="space-y-6 scroll-mt-[270px]"
          >
            <SecTitle>
              {tSidebar("items.restrictedCountries")}
            </SecTitle>
            <div className="flex flex-wrap gap-1 z-10">
              {(company?.restrictedCountries || [])
                .map((item) =>
                  countries.find((country) => country.country === item),
                )
                .filter((item) => item !== undefined)
                .map((item) => (
                  <div
                    key={item.country}
                    className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md text-xs"
                  >
                    {item.flag && (
                      <div className="w-5 h-3.5 relative overflow-hidden shrink-0">
                        <Image
                          src={item.flag}
                          alt={item.country}
                          width={20}
                          height={14}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="font-semibold">{item.country}</span>
                  </div>
                ))}
            </div>
          </section>

          {/* Subscribe */}
          <div className="mt-16 pt-8 border-t border-border">
            <Subscribe />
          </div>
        </div>
      </div>
    </div>
  );
}

function BadgeList({ items }: { items: { title: string; logoUrl?: any }[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items?.map((item, i) => (
        <Badge
          key={i}
          variant={"secondary"}
          className="px-3 py-1 gap-2 bg-primary/15"
        >
          {item.logoUrl && (
            <Image
              src={item.logoUrl}
              alt={item.title}
              width={16}
              height={16}
              className="rounded-full object-cover"
            />
          )}
          <span className="text-xs font-medium">{item.title}</span>
        </Badge>
      ))}
    </div>
  );
}
