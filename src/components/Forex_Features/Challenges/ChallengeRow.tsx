import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrencyLong, formatMaxAllocationToK } from "@/lib/formatCurrencyShort ";
import { Button } from "@/components/ui/button";
import BatteryIndicator from "@/components/Global/BatteryIndecator";
import FirmCell from "../Firms/FirmCell";
import { TChallenge } from "@/types/Challenge ";
import { Edit, Trash } from "lucide-react";
import EditChallengeModal from "./EditChallengeModal";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DeleteModal from "./DeleteChallengeModal";
import { useAppSelector } from "@/redux/store";
import { useCurrentUser } from "@/redux/authSlice";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { visibleText } from "@/utils/visibleText";
import ChallengeIndexChange from "./ChallengeIndexChange";
import { cn } from "@/lib/utils";

const stepStyles: Record<string, string> = {
  STEP1: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  STEP2: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
  STEP3: "bg-orange-500/15 text-orange-400 border border-orange-500/30",
  STEP4: "bg-pink-500/15 text-pink-400 border border-pink-500/30",
  INSTANT: "bg-green-500/15 text-green-400 border border-green-500/30",
};

export default function ChallengeRow({
  challenge,
  isArabic,
  nextChallenge,
  prevChallenge,
}: {
  challenge: TChallenge;
  isArabic: boolean;
  nextChallenge: TChallenge;
  prevChallenge: TChallenge;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const t = useTranslations("Challenges");
  const user = useAppSelector(useCurrentUser);
  const role = user?.role;
  const [openModal, setOpenModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", challenge.id);
    router.push(`?${params.toString()}`, { scroll: false });
    setOpenModal(true);
  };

  const handleOpenDeleteModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", challenge.id);
    router.push(`?${params.toString()}`, { scroll: false });
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <TableRow className="font-semibold">
        <FirmCell
          company={{
            image: challenge?.firm?.logoUrl,
            name: challenge?.firm?.title,
            slug: challenge?.firm?.slug,
          }}
        />
        <TableCell center className="text-sm md:text-base">
          {formatMaxAllocationToK(challenge.accountSize)}
        </TableCell>
        <TableCell center className="text-sm md:text-base">
          <span className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-full text-xs md:text-sm font-semibold",
            stepStyles[challenge?.steps] ?? "bg-foreground/10 text-foreground/60"
          )}>
            {t(challenge?.steps)}
          </span>
        </TableCell>
        <TableCell center className="text-sm md:text-base">
          <div>
            {challenge?.profitTarget.length > 0
              ? challenge.profitTarget.map((item) => item + "%").join(" | ")
              : "-"}
          </div>
        </TableCell>
        <TableCell center className="text-sm md:text-base">{challenge?.dailyLoss ? `${challenge.dailyLoss}%` : "-"}</TableCell>
        <TableCell center className="text-sm md:text-base">{challenge?.maxLoss ? `${challenge.maxLoss}%` : "-"}</TableCell>
        <TableCell center className="text-sm md:text-base">
          <div className="flex items-center justify-center gap-2">
            <BatteryIndicator percentage={challenge?.profitSplit} showNumber={false} />
            <span className="text-sm md:text-base font-semibold">
              {challenge?.profitSplit}%
            </span>
          </div>
        </TableCell>
        <TableCell center className="whitespace-normal max-w-[130px] text-center leading-snug text-xs md:text-sm">
          {visibleText(
            isArabic,
            challenge.payoutFrequency,
            challenge.payoutFrequencyArabic,
          )}
        </TableCell>
        <TableCell center className="text-sm md:text-base">
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-base md:text-lg font-bold text-foreground/80">{formatCurrencyLong(challenge?.price)}</p>
            <Link href={challenge.affiliateLink || ""} target="_blank">
              <Button size="sm" className="h-7 px-3 text-xs font-bold">{t("buy")}</Button>
            </Link>
          </div>
        </TableCell>
        {role === "SUPER_ADMIN" && (
          <TableCell className="flex gap-2">
            <Button
              onClick={handleOpenEditModal}
              variant="outline"
              className=" w-9 h-9"
              size={"icon"}
              linearClassName="w-max"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleOpenDeleteModal}
              variant="outline"
              className=" w-9 h-9"
              size={"icon"}
              linearClassName="w-max"
            >
              <Trash className="w-4 h-4" />
            </Button>
            <ChallengeIndexChange
              challenge={challenge}
              prevChallenge={prevChallenge}
              nextChallenge={nextChallenge}
            />
          </TableCell>
        )}
      </TableRow>

      <EditChallengeModal
        open={openModal}
        setOpen={setOpenModal}
        challenge={challenge}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={challenge.id}
      />
    </>
  );
}
