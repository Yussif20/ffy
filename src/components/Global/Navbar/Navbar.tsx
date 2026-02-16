"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { useCurrentUser } from "@/redux/authSlice";
import { useAppSelector } from "@/redux/store";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Container from "../Container";
import ForexFeatureToggle from "../ForexFeatureToggle";
import NavProfile from "../NavProfile";
import NavbarLogo from "./NavbarLogo";
import NavItems from "./NavItems";
import NavLanguageChange from "./NavLanguageChange";
import NavSearch from "./NavSearch";
import WebToggler from "./WebToggler";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const userData = useAppSelector(useCurrentUser);
  const isLogIn = userData?.id;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Hysteresis: different thresholds for going down vs going up
          if (scrollY > 100 && !isScrolled) {
            setIsScrolled(true);
          } else if (scrollY < 50 && isScrolled) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <nav
      className={`sticky z-50 w-full top-0 shadow-sm transition-all duration-150 ${isScrolled ? "py-2 bg-background/80 backdrop-blur-sm" : "py-6"
        }`}
    >
      <Container>
        <div className="">
          <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center">
            {/* Left Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div
                className={`hidden md:block transition-all duration-150 ease-out ${isScrolled
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8 absolute pointer-events-none"
                  }`}
              >
                <NavbarLogo isScrolled={isScrolled} />
              </div>

              {/* Search */}
              <div className="flex items-center gap-2 sm:gap-4 transition-all duration-150">
                <WebToggler />
                <div className="bg-border h-9 w-0.5 hidden sm:block"></div>
                <NavSearch />
              </div>
            </div>

            {/* Center Section */}
            <div className="relative flex items-center justify-center">
              {/* Logo (Main State) */}
              <div
                className={`transition-all duration-150 ease-out ${!isScrolled
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-8 absolute pointer-events-none"
                  }`}
              >
                <NavbarLogo isScrolled={isScrolled} />
              </div>

              {/* Feature Toggle (Scrolled State) */}
              <div
                className={`transition-all duration-150 ease-out ${isScrolled
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 absolute pointer-events-none"
                  }`}
              >
                <ForexFeatureToggle />
              </div>
            </div>

            {/* Right Actions */}

            <div className="flex items-center justify-end gap-1 md:gap-2 lg:gap-3">
              <NavLanguageChange />

              {isLogIn ? (
                <NavProfile />
              ) : (
                <>
                  <div className="hidden md:flex items-center justify-end gap-2 lg:gap-3">
                    <Link className="hidden sm:block" href="/auth/sign-in">
                      <Button variant="outline" className="h-9 px-4! font-bold">
                        {t("signIn")}
                      </Button>
                    </Link>
                    <Link href="/auth/sign-up">
                      <Button className="h-9 px-2 sm:px-4! font-bold">
                        {t("signUp")}
                      </Button>
                    </Link>
                  </div>
                  <div className="md:hidden">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Menu className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-[280px] px-5">
                        <div className="flex flex-col gap-6 mt-8">
                          {/* Nav links */}
                          <nav className="flex flex-col gap-1">
                            {[
                              { label: t("home"), href: "/" },
                              { label: t("offers"), href: "/exclusive-offers" },
                              { label: t("challenges"), href: "/challenges" },
                              { label: t("bestSellers"), href: "/best-sellers" },
                              { label: t("spreads"), href: "/spreads" },
                            ].map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="text-foreground/70 hover:text-foreground hover:bg-foreground/5 px-3 py-2 rounded-md transition-colors text-sm font-medium"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </nav>
                          <div className="h-px bg-border" />
                          {!isLogIn && (
                            <div className="flex flex-col gap-3">
                              <Link href="/auth/sign-in">
                                <Button variant="outline" className="w-full font-bold">
                                  {t("signIn")}
                                </Button>
                              </Link>
                              <Link href="/auth/sign-up">
                                <Button className="w-full font-bold">
                                  {t("signUp")}
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Feature Toggle Below (Normal State) */}
          <div
            className={`flex justify-center items-center  transition-all duration-500 ease-in-out overflow-hidden mb-3  ${!isScrolled
                ? "opacity-100 max-h-20 mt-4 mb-4"
                : "opacity-0 max-h-0"
              }`}
          >
            <ForexFeatureToggle />
          </div>

          <div className="hidden md:block">
            <NavItems />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
