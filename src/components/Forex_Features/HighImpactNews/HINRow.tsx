"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { countryDataByCurrency } from "@/data";
import useIsArabic from "@/hooks/useIsArabic";
import { useCurrentGmt } from "@/redux/gmtSlice";
import { useAppSelector } from "@/redux/store";
import { News } from "@/types/newsType";
import { visibleText } from "@/utils/visibleText";
import Image from "next/image";
import { useCurrentUser } from "@/redux/authSlice";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { DeleteNews, EditNews } from "./NewsActions";

export default function HINRow({ news }: { news: News }) {
  const isArabic = useIsArabic();
  const gmt = useAppSelector(useCurrentGmt);
  const country = countryDataByCurrency(news.currency);
  const role = useAppSelector(useCurrentUser)?.role;

  const newsDate = new Date(news.dateAndTime);
  const gmtOffset = Number(gmt);

  const localTimeString = newsDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: `Etc/GMT${gmtOffset >= 0 ? "-" : "+"}${Math.abs(gmtOffset)}`,
  });

  return (
    <TableRow>
      <TableCell center>
        <div className="w-[100px]  text-center">{localTimeString}</div>
      </TableCell>
      <TableCell center>
        <div className="flex items-center gap-1 justify-center w-[100px]  text-center">
          <div className="w-5 h-5 relative rounded-full overflow-hidden">
            <Image
              src={country?.flag || ""}
              alt="image"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-base font-semibold">{country?.currency}</p>
        </div>
      </TableCell>
      <TableCell center>
        <div className="w-[200px]  text-center whitespace-normal">
          {visibleText(isArabic, news.title, news.titleArabic)}
        </div>
      </TableCell>
      {role === "SUPER_ADMIN" && (
        <TableCell center>
          <div className="flex gap-2">
            <EditNews news={news}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </EditNews>
            <DeleteNews news={news}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </DeleteNews>
          </div>
        </TableCell>
      )}
    </TableRow>
  );
}
