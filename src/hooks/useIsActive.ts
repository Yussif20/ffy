import { usePathname } from "@/i18n/navigation";

export default function useIsActive() {
  const pathName = usePathname();
  const isActive = (path: string, strictCheck: string[] = ["/"]) => {
    if (strictCheck.includes(path)) {
      const active = pathName === path;
      return active;
    }
    const active = pathName.startsWith(path);
    return active;
  };
  return isActive;
}
