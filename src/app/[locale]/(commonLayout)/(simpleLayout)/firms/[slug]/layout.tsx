import FDTabs from "@/components/FirmDetails/FDTabs";
import FirmDetails from "@/components/FirmDetails/FirmDetails";
import FirmNavigate from "@/components/Forex_Features/Firms/FirmNavigate";
import SingleOffer from "@/components/Forex_Features/Offers/SingleOffer";
import { serverApi } from "@/lib/serverAxios";
import "@/styles/globals.css";
import { SinglePropFirm } from "@/types/firm.types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Funded For You",
  description: "Explore You Want",
};
export const revalidate = 5;
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const { data } = await serverApi.get<{ data: SinglePropFirm }>(
    `/firms/${slug}?header=true`
  );
  return (
    <div>
      <FirmNavigate firmType={data.data.firmType} />
      <div className="space-y-12 relative">
        <FirmDetails data={data.data} />

        <div className=" bg-background z-30">
          <SingleOffer hideBlackHoles data={data.data} />
        </div>
        <FDTabs slug={slug} count={data?.data?.count} />
        <div>{children}</div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
