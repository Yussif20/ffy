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
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import DeleteOfferModal from "./DeleteOfferModal";
import EditOfferModal from "./EditOfferModal";
import { FirmWithOffers, Offer } from "@/redux/api/offerApi";
import { Link } from "@/i18n/navigation";
import useIsFutures from "@/hooks/useIsFutures";
import DiscountText from "@/components/Global/DiscountText";
import { visibleText } from "@/utils/visibleText";
import { Separator } from "@/components/ui/separator";
import EndDateBadge from "./EndDateBadge";

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

  if (!offerFirstData) return null;

  return (
    <Card
      className={cn(
        "border-foreground/30 p-3 lg:p-6 bg-foreground/10 flex flex-col gap-8 relative",
        onlyShowMatch && "border-none rounded-none bg-background px-0!"
      )}
    >
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
            <div className="flex flex-col gap-8 mt-8 ">
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
}) => {
  const isArabic = useIsArabic();
  const isFutures = useIsFutures();
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    successMessage: t("codeCopied") || "Code copied to clipboard!",
    errorMessage: t("copyFailed") || "Failed to copy code",
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const endTime = offer.endDate && <EndDateBadge endDate={offer.endDate} />;
  const percantCard = (
    <Card className="py-10 lg:h-25 w-full lg:w-auto lg:aspect-5/2 flex flex-col justify-center items-center gap-y-1 bg-transparent relative rounded-2xl">
      <div className="absolute top-2 right-2">{endTime}</div>
      <Button className="rounded-bl-none! rounded-tr-none! rounded-tl-xl! rounded-br-2xl! absolute top-0 left-0 h-5 w-5 sm:w-7 sm:h-7">
        <FaFire className="text-sm sm:text-base" />
      </Button>
      <h1 className="text-2xl md:text-2xl font-bold uppercase py-0 leading-1">
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
      <Button variant={"outline"} className="font-semibold w-25">
        {showingNumber} {t("more")}
        <ChevronDown className="text-sm" />
      </Button>
    </AccordionTrigger>
  );

  const companyDataUi = (
    <div className="space-y-4 lg:space-y-0">
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
          <div className="">{percantCard}</div>
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
          {companyDataUi}
        </div>
        <div>
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
            <div className="hidden lg:block w-full">{companyDataUi}</div>
            <div className="flex items-center gap-2.5 justify-end ml-auto lg:ml-0 w-full lg:w-auto">
              <div className="flex flex-col gap-3 lg:gap-4 ml-0 lg:ml-4 justify-center items-center w-full">
                <div className="grid grid-cols-2 lg:flex items-center gap-2 w-full">
                  <div className=" space-y-2 h-full lg:h-auto">
                    {offer.code && (
                      <button
                        onClick={() => copyToClipboard(offer?.code)}
                        className="flex justify-center items-center gap-2 border-2 border-primary px-2 md:px-2.5 py-1 md:py-1.5 rounded-full border-dashed text-[11px] sm:text-sm w-full lg:w-auto"
                      >
                        <span className="text-primary font-normal">
                          {t("code")}
                        </span>
                        {/* <span className="text-primary font-normal">{t("code")}</span> */}
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
                  <div className="space-y-2">
                    <Link
                      href={companyData.affiliateLink}
                      target="_blank"
                      className="block"
                    >
                      <Button className="w-full lg:w-25">{t("buy")}</Button>
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
