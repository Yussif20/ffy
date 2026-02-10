"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LinearBorder from "../LinearBorder";
import { Globe } from "lucide-react";
import { TiArrowSortedDown } from "react-icons/ti";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function NavLanguageChange() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Detect current locale from path
  const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";
  const [language, setLanguage] = useState(currentLocale);

  // Function to remove any locale prefix (/en or /ar)
  const stripLocalePrefix = (path: string) => {
    return path.replace(/^\/(en|ar)(?=\/|$)/, "") || "/";
  };

  // Handle language change
  const handleChange = (newLang: string) => {
    setLanguage(newLang);

    const params = searchParams.toString();
    const queryString = params ? `?${params}` : "";

    // Remove any locale prefix first
    const basePath = stripLocalePrefix(pathname);

    let newPath = basePath;

    if (newLang === "ar") {
      newPath = `/ar${basePath}`;
    } else if (newLang === "en") {
      newPath = `/en${basePath}`;
    }

    router.push(`${newPath}${queryString}#top`);
  };

  // Update language state when pathname changes externally
  useEffect(() => {
    setLanguage(pathname.startsWith("/ar") ? "ar" : "en");
  }, [pathname]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative" asChild>
        <div className="z-30">
          <LinearBorder>
            <div className="px-1 sm:px-2 py-1 flex items-center gap-1 cursor-pointer text-sm sm:text-base">
              <Globe className="w-5 sm:w-6" />
              <span className="hidden md:block">
                {language === "en" ? "E" : "أب"}
              </span>
              <TiArrowSortedDown />
            </div>
          </LinearBorder>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-36 p-2">
        <RadioGroup
          value={language}
          onValueChange={handleChange}
          className="flex flex-col gap-2"
        >
          <DropdownMenuItem asChild>
            <label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="en" />
              English
            </label>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="ar" />
              Arabic
            </label>
          </DropdownMenuItem>
        </RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
