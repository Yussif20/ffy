import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrencyShort } from "@/lib/formatCurrencyShort ";
import { Button } from "@/components/ui/button";
import BatteryIndicator from "@/components/Global/BatteryIndecator";
import FirmCell from "../Firms/FirmCell";
import { TChallenge } from "@/types/Challenge ";
import { Edit, Trash } from "lucide-react";
import EditChallengeModal from "./EditChallengeModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteModal from "./DeleteChallengeModal";
import { useAppSelector } from "@/redux/store";
import { useCurrentUser } from "@/redux/authSlice";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { visibleText } from "@/utils/visibleText";

export default function ChallengeRow({
  challenge,
  isArabic,
}: {
  challenge: TChallenge;
  isArabic: boolean;
}) {
  const router = useRouter();

  const t = useTranslations("Challenges");
  const user = useAppSelector(useCurrentUser);
  const role = user?.role;
  const [openModal, setOpenModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
        <TableCell center>{challenge?.dailyLoss}%</TableCell>
        <TableCell center>{challenge?.maxLoss}%</TableCell>
        <TableCell center>
          <BatteryIndicator
            tooltip={challenge.title}
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
          <div className="flex gap-0.5 items-center">
            <p className="w-17">{formatCurrencyShort(challenge?.price)}</p>
            <Link href={challenge.affiliateLink || ""} target="_blank">
              <Button>{t("buy")}</Button>
            </Link>
          </div>
        </TableCell>
        {role === "SUPER_ADMIN" && (
          <TableCell className="flex gap-2">
            <Button
              onClick={() => {
                router.push(`?id=${challenge.id}`, { scroll: false });
                setOpenModal(true);
              }}
              variant="outline"
              className=" w-9 h-9"
              size={"icon"}
              linearClassName="w-max"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => {
                router.push(`?id=${challenge.id}`, { scroll: false });
                setIsDeleteModalOpen(true);
              }}
              variant="outline"
              className=" w-9 h-9"
              size={"icon"}
              linearClassName="w-max"
            >
              <Trash className="w-4 h-4" />
            </Button>
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
