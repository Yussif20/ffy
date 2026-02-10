import Challenges from "@/components/Forex_Features/Challenges/Challenges";

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Challenges locale={locale} />
    </>
  );
}
