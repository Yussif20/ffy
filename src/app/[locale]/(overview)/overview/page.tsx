"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === "/overview") {
      router.replace("/overview/user-management");
    }
  }, [pathName, router]);

  return null;
}
