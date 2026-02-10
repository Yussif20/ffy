import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DrawDownText } from "@/types/firm.types";
const drawDowns = {
  balanceBased: "Balance Based",
  equityBased: "Equity Based",
  trailingEod: "Trailing EOD",
  trailingIntraday: "Trailing Intraday",
  smartDd: "Smart DD",
} as const;
type DrawDownKey = keyof typeof drawDowns;
import { Card, CardContent } from "../ui/card";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updateDate } from "@/utils/updateDate";

export function MonthAndYear() {
  const t = useTranslations("FirmManagement");
  const { control } = useFormContext();

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => currentYear - i,
  ).map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));
  const months = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];
  return (
    <>
      <Controller
        name="dateEstablished"
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field }) => {
          const dateEstablished = field.value as string | null;
          const year = dateEstablished?.split("-")[0] || "";
          return (
            <div className="space-y-4">
              <Label>{t("year")}</Label>
              <Select
                value={year}
                onValueChange={(value) =>
                  field.onChange(
                    updateDate({
                      date: dateEstablished || undefined,
                      year: value,
                    }),
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("selectYear")} />
                </SelectTrigger>
                <SelectContent>
                  {years.map((opt) => (
                    <SelectItem key={opt.label} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }}
      />
      <Controller
        name="dateEstablished"
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field }) => {
          const dateEstablished = field.value as string | null;
          return (
            <div className="space-y-4">
              <Label>{t("month")}</Label>
              <Select
                value={dateEstablished?.split("-")[1] || ""}
                onValueChange={(value) =>
                  field.onChange(
                    updateDate({
                      date: dateEstablished || undefined,
                      month: value,
                    }),
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("selectMonth")} />
                </SelectTrigger>
                <SelectContent>
                  {months.map((opt) => (
                    <SelectItem key={opt.label} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }}
      />
    </>
  );
}

export function DrawDownTexts() {
  const tSidebar = useTranslations("FOSidebar");
  const { control } = useFormContext();

  return (
    <Controller
      name="drawDownTexts"
      control={control}
      rules={{ required: "This field is required" }}
      render={({ field }) => {
        const drawDownTexts = field.value as DrawDownText[];
        const handleChangeValue = (
          index: number,
          key: keyof DrawDownText,
          newValue: string,
        ) => {
          const newDrawDownTexts = [...drawDownTexts];
          newDrawDownTexts[index] = {
            ...newDrawDownTexts[index],
            [key]: newValue,
          };
          field.onChange(newDrawDownTexts);
        };
        return (
          <div className="space-y-4">
            <Label>{tSidebar("items.drawdownTexts")}</Label>
            <div className="space-y-4">
              {drawDownTexts.map((drawDownText, index) => (
                <Card key={index}>
                  <CardContent className="space-y-4 relative pt-3">
                    <div className="flex justify-between items-center gap-2">
                      <Label className="font-semibold">
                        {drawDowns[drawDownText.drawdown as DrawDownKey]}
                      </Label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>English Text</Label>
                        <Input
                          type="text"
                          placeholder="English Text"
                          value={drawDownText.englishText}
                          onChange={(e) =>
                            handleChangeValue(
                              index,
                              "englishText",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Arabic Text</Label>
                        <Input
                          type="text"
                          placeholder="Arabic Text"
                          value={drawDownText.arabicText}
                          onChange={(e) =>
                            handleChangeValue(
                              index,
                              "arabicText",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
}
