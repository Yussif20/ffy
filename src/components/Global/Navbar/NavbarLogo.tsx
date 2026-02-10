import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import Logo from "@/utils/Logo";

interface NavbarLogoProps {
  isScrolled: boolean;
  logoClassName?: string;
  textClassName?: string;
}

export default function NavbarLogo({
  isScrolled,
  logoClassName,
  textClassName,
}: NavbarLogoProps) {
  return (
    <Link href="/#top">
      <div className="w-max flex items-center" dir="ltr">
        <div
          className={cn(
            `aspect-8/9 ${isScrolled ? "h-6 md:h-9" : "h-12 md:h-16"} relative`,
            logoClassName
          )}
        >
          <Logo />
        </div>
        {!isScrolled && (
          <h2
            className={cn(
              "font-bold text-sm sm:text-base md:text-lg md:text-xl",
              textClassName
            )}
          >
            Funded For You
          </h2>
        )}
      </div>
    </Link>
  );
}
