import DiscountCard from "@/components/Global/DiscountCard";
import GaugeMeter from "@/components/Global/Icons/GaugeMeter";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  countryData,
  countryDataByCountry,
  propFirmInstrumentTypes,
} from "@/data";
import { formatCurrencyShort } from "@/lib/formatCurrencyShort ";
import { SinglePropFirm } from "@/types/firm.types";
import Image from "next/image";
import FirmCell from "./FirmCell";
import PlatformCell from "./PlatformCell";
import { EditFirmDialog } from "@/components/FirmDetails/EditFirmDialog";
import { useAppSelector } from "@/redux/store";
import { useCurrentUser } from "@/redux/authSlice";
import DeleteFirmDialog from "@/components/FirmDetails/DeleteFirmDialog";
import FirmIndexChange from "./FirmIndexChange";
import { calculateYearsInOperation } from "@/utils/calculateYearsInOperation";

export default function FirmRow({
  company,
  prevCompany,
  nextCompany,
  shortVersion,
}: {
  company: SinglePropFirm;
  prevCompany: SinglePropFirm;
  nextCompany: SinglePropFirm;
  shortVersion?: boolean;
}) {
  const user = useAppSelector(useCurrentUser);
  const instrumentSet = new Set(company.typeOfInstruments);
  const country =
    countryDataByCountry(company.country) || countryData(company.country);
  const instruments = propFirmInstrumentTypes.reduce<string[]>((a, b) => {
    if (instrumentSet.has(b.value)) {
      a.push(b.name);
    }
    return a;
  }, []);

  // New = established within the last 2 years
  const isNew = (() => {
    if (!company.dateEstablished) return false;
    const established = new Date(company.dateEstablished).getTime();
    const twoYearsAgo = Date.now() - 2 * 365 * 24 * 60 * 60 * 1000;
    return established >= twoYearsAgo;
  })();

  // Trending = has an active discount offer >= 15%
  const isTrending = Boolean(company.offerPercentage && company.offerPercentage >= 15);

  return (
    <TableRow className="relative border-l-2 border-l-transparent hover:border-l-primary hover:bg-foreground/5 transition-all duration-150">
      <FirmCell
        company={{
          image: company.logoUrl,
          name: company.title,
          slug: company.slug,
        }}
        isNew={isNew}
        isTrending={isTrending}
      />
      <TableCell>
        <div className="flex items-center gap-1 justify-center">
          <div className="w-6  h-4 relative">
            <Image
              src={country?.flag || ""}
              alt="image"
              fill
              unoptimized
              className="object-cover "
            />
          </div>
          <p className="text-base  font-semibold"> {country?.code}</p>
        </div>
      </TableCell>
      <TableCell>
        <GaugeMeter
          value={calculateYearsInOperation(company.dateEstablished)}
        />
      </TableCell>
      {!shortVersion && (
        <>
          <TableCell>
            <div className="flex flex-wrap gap-2 max-w-[180px]">
              {instruments?.map((item) => (
                <Badge variant={"secondary"} key={item}>
                  {item}
                </Badge>
              ))}
            </div>
          </TableCell>
          <PlatformCell platforms={company.platforms} />
          <TableCell>
            <p className="text-center font-bold text-base">
              {formatCurrencyShort(company.maxAllocation)}
            </p>
          </TableCell>
          <TableCell>
            {company.offerPercentage ? (
              <DiscountCard
                discount={{
                  code: company.offerCode,
                  description: company.offerCode,
                  offerPercentage: company.offerPercentage,
                }}
              />
            ) : (
              <p className="text-center text-foreground/30 text-base font-medium">—</p>
            )}
          </TableCell>
        </>
      )}
      {user?.role === "SUPER_ADMIN" && (
        <TableCell>
          <div className="flex gap-2">
            <EditFirmDialog firmId={company.id} />
            <DeleteFirmDialog id={company.id} />
            {/* Move Top */}
            <FirmIndexChange
              firm={company}
              prevCompany={prevCompany}
              nextCompany={nextCompany}
            />
          </div>
        </TableCell>
      )}
    </TableRow>
  );
}
