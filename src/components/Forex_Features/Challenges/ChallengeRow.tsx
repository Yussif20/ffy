import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrencyShort } from "@/lib/formatCurrencyShort ";
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
        <TableCell center>
          {formatCurrencyShort(challenge.accountSize, false)}
        </TableCell>
        <TableCell center>{t(challenge?.steps)}</TableCell>
        <TableCell center>
          <div>
            {challenge?.profitTarget.length > 0
              ? challenge.profitTarget.map((item) => item + "%").join(" | ")
              : "-"}
          </div>
        </TableCell>
        <TableCell center>{challenge?.dailyLoss ? `${challenge.dailyLoss}%` : "-"}</TableCell>
        <TableCell center>{challenge?.maxLoss ? `${challenge.maxLoss}%` : "-"}</TableCell>
        <TableCell center>
          <BatteryIndicator
            percentage={challenge?.profitSplit}
          />
        </TableCell>
        <TableCell center>
          {visibleText(
            isArabic,
            challenge.payoutFrequency,
            challenge.payoutFrequencyArabic,
          )}
        </TableCell>
        <TableCell center>
          <div className="flex gap-0.5 items-center justify-center">
            <p className="w-17 text-center">{formatCurrencyShort(challenge?.price)}</p>
            <Link href={challenge.affiliateLink || ""} target="_blank">
              <Button>{t("buy")}</Button>
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
