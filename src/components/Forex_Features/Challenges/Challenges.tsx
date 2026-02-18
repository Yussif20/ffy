import FirmAllFilters from "../Firms/FirmAllFilters";
import ChallengeFilter from "./ChallengeFilter";
import ChallengeTable from "./ChallengeTable";

export default function Challenges({ locale }: { locale: string }) {
  return (
    <div className="space-y-8 pb-10 md:pb-14">
      <ChallengeFilter />
      <div className="flex items-start gap-6">
        <div className="max-w-sm flex shrink-0">
          <FirmAllFilters showCompanyFilter />
        </div>
        <ChallengeTable locale={locale} />
      </div>
    </div>
  );
}
