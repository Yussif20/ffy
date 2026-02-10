"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "@/i18n/navigation";

export default function Page() {
  const router = useRouter();
  const pathName = usePathname();
  if (pathName === "/overview") {
    router.replace("/overview/user-management");
  }
  return <></>;
}
