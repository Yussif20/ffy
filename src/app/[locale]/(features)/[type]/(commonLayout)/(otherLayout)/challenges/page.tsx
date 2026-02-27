import { Suspense } from "react";
import Challenges from "@/components/Forex_Features/Challenges/Challenges";
import TableSkeleton from "@/components/Global/TableSkeleton";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { locale } = await params;
  const resolvedParams = await searchParams;
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Challenges locale={locale} initialSearchParams={resolvedParams} />
    </Suspense>
  );
}
