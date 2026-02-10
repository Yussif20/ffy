import FAQ from "@/components/FAQ/FAQ";

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <FAQ locale={locale} />;
}
