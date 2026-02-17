"use client";

import GiftBox from "@/components/Global/Icons/GiftBox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import useIsArabic from "@/hooks/useIsArabic";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { UserRole } from "@/types";
import { Check, ChevronDown, Copy, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";
import DeleteOfferModal from "./DeleteOfferModal";
import EditOfferModal from "./EditOfferModal";
import { FirmWithOffers, Offer } from "@/redux/api/offerApi";
import { Link } from "@/i18n/navigation";
import useIsFutures from "@/hooks/useIsFutures";
import DiscountText from "@/components/Global/DiscountText";
import { visibleText } from "@/utils/visibleText";
import { Separator } from "@/components/ui/separator";
import CountdownTimer from "./CountdownTimer";
import dynamic from "next/dynamic";

const OfferCoinClient = dynamic(() => import("./OfferCoinClient"), { ssr: false });

/** Prominent percentage badge like the reference image, using primary colors */
function OfferPercentageBadge({
  percentage,
  showGift,
  giftText,
  giftTextArabic,
  isArabic,
  className,
}: {
  percentage: number;
  showGift?: boolean;
  giftText?: string | null;
  giftTextArabic?: string | null;
  isArabic: boolean;
  className?: string;
}) {
  const gift = visibleText(isArabic, giftText ?? undefined, giftTextArabic ?? undefined);
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-xl min-w-[100px] w-[100px] sm:min-w-[120px] sm:w-[120px] py-4 sm:py-5",
        "bg-primary text-primary-foreground shadow-lg",
        "border border-primary-dark/50",
        className
      )}
    >
      <span className="text-2xl sm:text-3xl font-bold tabular-nums">{percentage}%</span>
      <span className="text-xs font-semibold uppercase tracking-wider opacity-95">OFF</span>
      {showGift && gift && (
        <div className="mt-2 px-2 py-0.5 rounded bg-primary-foreground/15 text-[10px] font-medium text-center">
          <GiftBox size={10} className="inline-block align-middle text-success" /> {gift}
        </div>
      )}
    </div>
  );
}

function CompanyHeader({
  companyData,
  isTopOffer,
  offer,
}: {
  companyData: { title: string; logoUrl: string; slug: string };
  isTopOffer?: boolean;
  offer: Offer;
}) {
  const isFutures = useIsFutures();
  return (
    <div className="shrink-0 lg:w-1/2 lg:pr-6 lg:border-r lg:border-border">
      <Link
        href={`${isFutures ? "/futures/" : "/"}firms/${companyData.slug}/exclusive-offers`}
        className="flex items-center gap-3 w-fit rounded-lg p-2 -m-2 hover:bg-muted/50 transition-colors"
      >
        <div className="rounded-lg overflow-hidden border border-border bg-card shrink-0">
          <div className="w-10 sm:w-12 xl:w-14 aspect-square relative">
            <Image
              src={companyData.logoUrl}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <h2 className="text-base md:text-lg xl:text-xl font-semibold text-foreground flex flex-wrap items-center gap-1">
            {companyData.title}
            {isTopOffer && (
              <span className="items-center gap-1 md:flex hidden text-primary">
                (
                <DiscountText
                  className="text-primary"
                  mainClassName="px-0! py-0"
                  percentage={offer.offerPercentage}
                />
                )
              </span>
            )}
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default function SingleOffer({
  onlyShowMatch,
  hideBlackHoles,
  isTopOffer,
  data,
}: {
  onlyShowMatch?: boolean;
  hideBlackHoles?: boolean;
  isTopOffer?: boolean;
  data: FirmWithOffers;
}) {
  const offer = data?.offers ?? [];
  const companyData = {
    id: data.id,
    title: data.title,
    logoUrl: data.logoUrl,
    slug: data.slug,
    affiliateLink: data.affiliateLink,
  };
  const t = useTranslations("Offers");
  const isArabic = useIsArabic();
  const offerFirstData = offer[0];
  const offersOtherData = offer?.slice(1) as Offer[];
  const currUser = useAppSelector((state) => state.auth.user);
  const isAdmin = currUser ? currUser.role !== UserRole.USER : false;

  // فحص انتهاء العرض client-side لتجنب hydration mismatch
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (offerFirstData?.endDate) {
      const checkExpired = () => {
        const expired = new Date(offerFirstData.endDate as string).getTime() <= Date.now();
        setIsExpired(expired);
      };

      checkExpired();
      const interval = setInterval(checkExpired, 60000); // فحص كل دقيقة

      return () => clearInterval(interval);
    }
  }, [offerFirstData?.endDate]);

  if (!offerFirstData) return null;
  if (isExpired) return null;

  return (
    <Card
      className={cn(
        "border border-border rounded-xl p-4 sm:p-5 lg:p-6 bg-card flex flex-col gap-4 lg:gap-6 relative overflow-hidden",
        onlyShowMatch && "border-none rounded-none bg-background px-0!"
      )}
    >
      {/* EXCLUSIVE ribbon for top offers */}
      {isTopOffer && !onlyShowMatch && (
        <>
          <div className="absolute top-4 right-[-28px] rotate-45 bg-primary text-white text-[10px] font-bold px-8 py-0.5 uppercase tracking-widest z-20 shadow-sm">
            Exclusive
          </div>
          <OfferCoinClient />
        </>
      )}
      {!hideBlackHoles && (
        <div
          className={cn(
            "absolute border-r-2 top-0 min-h-full border-foreground/20 border-dashed left-75 hidden lg:block w-0",
            isArabic && "right-75"
          )}
        >
          <div className="absolute -top-6 w-9 h-12 rounded-full bg-background -left-4"></div>
          <div className="absolute -bottom-6 w-9 h-12 rounded-full bg-background -left-4"></div>
        </div>
      )}
      {/* Left: company once. Right: all offers (no repeated company) */}
      {!onlyShowMatch ? (
        <div className="flex flex-col lg:flex-row lg:gap-6 w-full">
          <CompanyHeader companyData={companyData} isTopOffer={isTopOffer} offer={offerFirstData} />
          <div className="flex-1 min-w-0 mt-4 lg:mt-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-none">
                <OfferCard
                  companyData={companyData}
                  offer={offerFirstData}
                  showTag
                  showingNumber={offersOtherData?.length}
                  t={t}
                  onlyShowMatch={onlyShowMatch}
                  isAdmin={isAdmin}
                  isTopOffer={isTopOffer}
                  hideCompany
                />
                <AccordionContent>
                  <div className="flex flex-col gap-4 lg:gap-6 pt-2">
                    {offersOtherData?.map((item, idx) => (
                      <OfferCard
                        key={idx}
                        offer={item}
                        companyData={companyData}
                        t={t}
                        isAdmin={isAdmin}
                        isTopOffer={isTopOffer}
                        hideCompany
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="">
            <OfferCard
              companyData={companyData}
              offer={offerFirstData}
              showTag
              showingNumber={offersOtherData?.length}
              t={t}
              onlyShowMatch={onlyShowMatch}
              isAdmin={isAdmin}
              isTopOffer={isTopOffer}
            />
            <AccordionContent>
              <div className="flex flex-col gap-4 lg:gap-6 mt-4 lg:mt-6">
                {offersOtherData?.map((item, idx) => (
                  <OfferCard
                    key={idx}
                    offer={item}
                    companyData={companyData}
                    t={t}
                    isAdmin={isAdmin}
                    isTopOffer={isTopOffer}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </Card>
  );
}

const OfferCard = ({
  offer,
  companyData,
  isTopOffer,
  showTag = false,
  showingNumber = 1,
  t,
  onlyShowMatch,
  isAdmin,
  hideCompany = false,
}: {
  isTopOffer?: boolean;
  offer: Offer;
  companyData: {
    id: string;
    title: string;
    logoUrl: string;
    slug: string;
    affiliateLink: string;
  };
  showTag?: boolean;
  showingNumber?: number;
  t: any;
  onlyShowMatch?: boolean;
  isAdmin?: boolean;
  hideCompany?: boolean;
}) => {
  const isArabic = useIsArabic();
  const isFutures = useIsFutures();
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    successMessage: t("codeCopied") || "Code copied to clipboard!",
    errorMessage: t("copyFailed") || "Failed to copy code",
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const endTime = offer.endDate && (
    <CountdownTimer endDate={offer.endDate} startDate={offer.createdAt} />
  );
  const percentageBadge = (
    <OfferPercentageBadge
      percentage={offer.offerPercentage}
      showGift={offer.showGift}
      giftText={offer.giftText}
      giftTextArabic={offer.giftTextArabic}
      isArabic={isArabic}
    />
  );
  const percantCard = (
    <Card className="py-6 lg:py-10 lg:h-25 w-full lg:w-auto lg:aspect-5/2 flex flex-col justify-center items-center gap-y-2 lg:gap-y-4 bg-transparent relative rounded-2xl group hover:bg-primary/5 transition-colors duration-200">
      <h1 className="text-4xl md:text-5xl font-bold uppercase py-0 leading-1">
        <DiscountText
          className="text-primary"
          percentage={offer.offerPercentage}
        />
      </h1>
      {offer.showGift && (
        <div className="px-3 py-1 bg-foreground/10 max-w-max rounded-full  gap-1 md:gap-1.5 text-xs text-center">
          <GiftBox size={14} className="text-yellow-500 inline-block" /> +{" "}
          {visibleText(isArabic, offer.giftText, offer.giftTextArabic)}
        </div>
      )}
    </Card>
  );

  const moreBtn = showTag && showingNumber > 0 && (
    <AccordionTrigger hideArrow className="p-0">
      <div className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg text-xs font-semibold border border-border bg-muted hover:bg-accent hover:text-accent-foreground h-9 px-3 transition-colors">
        {showingNumber} {t("more")}
        <ChevronDown className="size-3.5" />
      </div>
    </AccordionTrigger>
  );

  const companyDataUi = (
    <div className="space-y-2 lg:space-y-4">
      <div className="flex justify-between items-center w-full">
        <Link
          href={`${isFutures ? "/futures/" : "/"}firms/${
            companyData.slug
          }/exclusive-offers`}
          className="flex items-center gap-2"
        >
          <div className="bg-primary3 max-w-max rounded-lg overflow-hidden border border-border">
            <div className="w-8 xl:w-12 aspect-square relative">
              <Image
                src={companyData.logoUrl}
                alt="image"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <h2 className="text-base md:text-lg xl:text-xl font-semibold flex gap-1">
            {companyData.title}{" "}
            {isTopOffer && (
              <span className=" items-center gap-1 md:flex hidden">
                (
                <DiscountText
                  className="text-primary"
                  mainClassName="px-0! py-0"
                  percentage={offer.offerPercentage}
                />
                )
              </span>
            )}
          </h2>
        </Link>
        <div className="lg:hidden"> {moreBtn}</div>
      </div>
      <div className={cn("lg:hidden", onlyShowMatch && "hidden")}>
        {onlyShowMatch ? (
          offer.code ? (
            <button
              onClick={() => copyToClipboard(offer?.code)}
              className="flex justify-center items-center gap-2 border-2 border-primary px-2 md:px-2.5 py-1 md:py-1.5 rounded-full border-dashed text-[11px] sm:text-sm"
            >
              <span className="text-primary font-normal">{t("code")}</span>
              {/* <span className="text-primary font-normal">{t("code")}</span> */}
              <p className="h-6 border-r border-foreground/20"></p>
              <span className="font-semibold uppercase">{offer?.code}</span>
              {isCopied ? (
                <Check size={14} className="text-green-500 transition-colors" />
              ) : (
                <Copy
                  size={14}
                  className="cursor-pointer hover:text-primary transition-colors"
                />
              )}
            </button>
          ) : null
        ) : (
          <>
            <div className="">{percantCard}</div>
            {endTime && <div className="flex justify-center items-center mt-3">{endTime}</div>}
          </>
        )}
      </div>
      {offer.text || offer.textArabic ? (
        <>
          <Separator
            className={cn("my-2 w-full ", !onlyShowMatch && "lg:block hidden")}
          />
          <p className="font-medium text-sm">
            {visibleText(isArabic, offer.text, offer.textArabic)}
          </p>
        </>
      ) : null}
    </div>
  );

  const offerOnlyContent = (
    <div className="space-y-2 lg:space-y-3">
      <div className="flex justify-between items-center w-full gap-2">
        <div className="min-w-0 flex-1">{percantCard}</div>
        <div className="lg:hidden shrink-0">{moreBtn}</div>
      </div>
      {endTime && <div className="flex justify-center items-center">{endTime}</div>}
      {offer.text || offer.textArabic ? (
        <p className="font-medium text-sm">
          {visibleText(isArabic, offer.text, offer.textArabic)}
        </p>
      ) : null}
    </div>
  );

  const leftContent = hideCompany ? offerOnlyContent : companyDataUi;

  // Right-half-only layout: one offer row like the reference image — [Badge] [Description] [Code + Apply + More]
  if (hideCompany) {
    return (
      <CardContent
        className={cn(
          "px-0 flex flex-col sm:flex-row sm:items-center gap-4 py-4",
          !showTag && "border-t border-border pt-6"
        )}
      >
        {/* Left: prominent % OFF badge (our primary colors) */}
        <div className="shrink-0">{percentageBadge}</div>

        {/* Middle: offer description + countdown */}
        <div className="min-w-0 flex-1 space-y-1">
          {offer.text || offer.textArabic ? (
            <p className="font-medium text-sm text-foreground/90">
              {visibleText(isArabic, offer.text, offer.textArabic)}
            </p>
          ) : null}
          {endTime && <div className="flex items-center">{endTime}</div>}
        </div>

        {/* Right: Code (muted) + Apply (primary) + More */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          {offer.code && (
            <button
              onClick={() => copyToClipboard(offer?.code)}
              className="inline-flex items-center gap-2 rounded-lg bg-muted border border-border px-3 py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              <span className="text-muted-foreground">{t("code")}</span>
              <span className="h-4 w-px bg-border" />
              <span className="font-semibold uppercase">{offer?.code}</span>
              {isCopied ? (
                <Check size={14} className="text-primary" />
              ) : (
                <Copy size={14} className="text-muted-foreground" />
              )}
            </button>
          )}
          <Link href={companyData.affiliateLink} target="_blank" className="block">
            <Button size="sm" className="rounded-lg bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-4">
              {t("buy")}
            </Button>
          </Link>
          {moreBtn && <div className="w-full sm:w-auto">{moreBtn}</div>}
        </div>

        {isAdmin && (
          <div className="flex gap-2 justify-end items-center sm:col-span-full border-t border-border pt-3">
            <Button variant="outline" size="sm" onClick={() => setEditModalOpen(true)} className="gap-1.5">
              <Pencil size={14} />
              <span className="hidden sm:inline">{t("edit")}</span>
            </Button>
            <Button variant="destructive" size="sm" onClick={() => setDeleteModalOpen(true)} className="gap-1.5">
              <Trash2 size={14} />
              <span className="hidden sm:inline">{t("delete")}</span>
            </Button>
          </div>
        )}
        <EditOfferModal open={editModalOpen} onOpenChange={setEditModalOpen} offer={offer} />
        <DeleteOfferModal open={deleteModalOpen} onOpenChange={setDeleteModalOpen} offerId={offer.id} offerCode={offer.code} />
      </CardContent>
    );
  }

  return (
    <CardContent
      className={cn(
        "px-0 flex gap-y-3 gap-x-12 flex-col lg:flex-row ",
        !showTag && "border-t border-foreground/20 pt-8"
      )}
    >
      <div
        className={cn(
          "flex justify-between items-center gap-x-3",
          isTopOffer && "w-full"
        )}
      >
        <div
          className={cn("block lg:hidden w-full", isTopOffer && "lg:block!")}
        >
          {leftContent}
        </div>
        <div>
          {onlyShowMatch ? (
            offer.code ? (
              <button
                onClick={() => copyToClipboard(offer?.code)}
                className="flex justify-center items-center gap-2 border-2 border-primary px-2 md:px-2.5 py-1 md:py-1.5 rounded-full border-dashed text-[11px] sm:text-sm"
              >
                <span className="text-primary font-normal">{t("code")}</span>
                <p className="h-6 border-r border-foreground/20"></p>
                <span className="font-semibold uppercase">{offer?.code}</span>
                {isCopied ? (
                  <Check
                    size={14}
                    className="text-green-500 transition-colors"
                  />
                ) : (
                  <Copy
                    size={14}
                    className="cursor-pointer hover:text-primary transition-colors"
                  />
                )}
              </button>
            ) : null
          ) : (
            <div className="hidden lg:block">{percantCard}</div>
          )}
        </div>
      </div>
      {!onlyShowMatch && (
        <>
          <div
            className={cn(
              "w-full border-b border-foreground/20 block lg:hidden",
              isTopOffer && "lg:block!"
            )}
          ></div>
          <div className="flex justify-between items-center w-full h-max  gap-x-3  my-auto">
            <div className="hidden lg:block w-full">{leftContent}</div>
            <div className="flex items-center gap-2.5 justify-end ml-auto lg:ml-0 w-full lg:w-auto">
              <div className="flex flex-col gap-4 lg:gap-5 ml-0 lg:ml-4 justify-center items-center w-full">
                <div className="grid grid-cols-2 lg:flex items-center gap-3 lg:gap-4 w-full">
                  <div className="space-y-2.5 lg:space-y-3 h-full lg:h-auto">
                    {offer.code && (
                      <button
                        onClick={() => copyToClipboard(offer?.code)}
                        className="flex justify-center items-center gap-2 border-2 border-primary px-2.5 md:px-3 py-1.5 md:py-2 rounded-full border-dashed text-[11px] sm:text-sm w-full lg:w-auto"
                      >
                        <span className="text-primary font-normal">
                          {t("code")}
                        </span>
                        <p className="h-6 border-r border-foreground/20"></p>
                        <span className="font-semibold uppercase">
                          {offer?.code}
                        </span>
                        {isCopied ? (
                          <Check
                            size={14}
                            className="text-green-500 transition-colors"
                          />
                        ) : (
                          <Copy
                            size={14}
                            className="cursor-pointer hover:text-primary transition-colors"
                          />
                        )}
                      </button>
                    )}
                    <div className="hidden lg:flex justify-center items-center">
                      {endTime}
                    </div>
                  </div>
                  <div className="border-border border-r-3 h-6 hidden lg:block" />
                  <div className="space-y-2.5 lg:space-y-3">
                    <Link
                      href={companyData.affiliateLink}
                      target="_blank"
                      className="block"
                    >
                      <Button className="w-full lg:w-25 text-xs sm:text-sm px-3 sm:px-4">{t("buy")}</Button>
                    </Link>
                    <div className="hidden lg:block"> {moreBtn}</div>
                  </div>
                </div>

                {isAdmin && (
                  <div className="flex gap-2 justify-end  items-center">
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => {
                        setEditModalOpen(true);
                      }}
                      className="gap-1.5"
                    >
                      <Pencil size={14} />
                      <span className="hidden sm:inline">{t("edit")}</span>
                    </Button>
                    <Button
                      variant={"destructive"}
                      size={"sm"}
                      onClick={() => {
                        setDeleteModalOpen(true);
                      }}
                      className="gap-1.5"
                    >
                      <Trash2 size={14} />
                      <span className="hidden sm:inline">{t("delete")}</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <EditOfferModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            offer={offer}
          />
          <DeleteOfferModal
            open={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            offerId={offer.id}
            offerCode={offer.code}
          />
        </>
      )}
    </CardContent>
  );
};
