import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import FirmTable from "@/components/Forex_Features/Firms/FirmTable";
import { useGetAllFirmsQuery } from "@/redux/api/firms.api";
import useIsFutures from "@/hooks/useIsFutures";
import { useSearchParams } from "next/navigation";
import { handleSetSearchParams } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NavSearch() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isFuturesPage = useIsFutures();
  const t = useTranslations("Navbar");
  const searchTerm = searchParams.get("searchTerm") || "";
  const query = [
    { name: "searchTerm", value: searchTerm },
    {
      name: "firmType",
      value: isFuturesPage ? "FUTURES" : "FOREX",
    },
  ];
  const { data: dataRaw, isLoading, isFetching } = useGetAllFirmsQuery(query);
  const firms = dataRaw?.firms || [];
  const firmsMeta = dataRaw?.meta || {};
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSetSearchParams({ searchTerm: search }, searchParams, router);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="md:hidden">
          <Button variant="outline" size="icon" className="w-8 h-8">
            <Search />
          </Button>
        </div>
        <div className="hidden md:block">
          <Input
            disabled
            placeholder={t("searchPlaceholder")}
            className="w-[200px] "
          />
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="container! max-w-3xl! h-[60vh] overflow-y-auto justify-start! border-none flex flex-col gap-5 py-10">
          <DialogHeader className="h-max">
            <div className="w-full">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
              />
            </div>
          </DialogHeader>
          <div className="h-max">
            <FirmTable
              firms={firms}
              shortVersion
              // @ts-ignore
              meta={firmsMeta}
              isFuturesPage={isFuturesPage}
              isLoading={isLoading || isFetching}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
