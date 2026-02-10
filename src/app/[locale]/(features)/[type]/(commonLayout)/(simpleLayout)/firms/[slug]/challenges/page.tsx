import ChallengeFilter from "@/components/Forex_Features/Challenges/ChallengeFilter";
import ChallengeTable from "@/components/Forex_Features/Challenges/ChallengeTable";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  return (
    <div className="space-y-8 pb-20 md:pb-30">
      <ChallengeFilter hideAllFilter />
      <div className="flex">
        <ChallengeTable companySlug={slug} locale={locale} />
      </div>
    </div>
  );
}
