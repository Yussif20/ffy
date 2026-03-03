import { Suspense } from "react";
import Offers from "@/components/Forex_Features/Offers/Offers";
import TableSkeleton from "@/components/Global/TableSkeleton";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const resolvedParams = await searchParams;
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Offers initialSearchParams={resolvedParams} />
    </Suspense>
  );
}
