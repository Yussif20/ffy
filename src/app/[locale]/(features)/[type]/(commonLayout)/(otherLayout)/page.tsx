import { Suspense } from "react";
import Firms from "@/components/Forex_Features/Firms/Firms";
import TableSkeleton from "@/components/Global/TableSkeleton";
import ScrollToTopOnMount from "@/components/Global/ScrollToTopOnMount";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const resolvedParams = await searchParams;
  return (
    <>
      <ScrollToTopOnMount />
      <Suspense fallback={<TableSkeleton />}>
        <Firms initialSearchParams={resolvedParams} />
      </Suspense>
    </>
  );
}
