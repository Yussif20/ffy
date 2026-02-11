import { Instagram } from "lucide-react";
import Container from "./Container";
import Subtitle from "./Subtitle";
import NavbarLogo from "./Navbar/NavbarLogo";
import { PiTiktokLogo } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";
import { FiYoutube } from "react-icons/fi";
import { LiaTelegramPlane } from "react-icons/lia";
import { AiOutlineDiscord } from "react-icons/ai";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import HomeHref from "./HomeHref";

const Footer = async () => {
  const t = await getTranslations("Footer");

  const footerLinks = [
    {
      id: 0,
      title: t("propFirms"),
      links: [
        { label: t("compareChallenges"), href: "challenges" },
      ],
    },
    {
      id: 1,
      title: t("offers"),
      links: [
        { label: t("exclusiveOffers"), href: "exclusive-offers" },
        { label: t("allCurrentOffers"), href: "exclusive-offers" },
        { label: t("privacyPolicy"), href: "privacy-policy" },
        { label: t("termsConditions"), href: "terms-and-conditions" },
      ],
      subItems: {
        title: t("resources"),
        links: [{ label: t("highImpactNews"), href: "high-impact-news" }],
      },
    },
    {
      id: 3,
      title: t("company"),
      links: [
        { label: t("aboutUs"), href: "about" },
        { label: t("careers"), href: "careers" },
        { label: t("faq"), href: "faq" },
      ],
    },
    {
      title: t("getHelp"),
      links: [
        { label: t("contactUs"), href: "contact" },
        { label: t("howItWorks"), href: "how-it-works" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, href: "https://instagram.com" },
    { icon: <PiTiktokLogo size={20} />, href: "https://tiktok.com" },
    { icon: <FaXTwitter size={20} />, href: "https://twitter.com" },
    { icon: <SlSocialFacebook size={20} />, href: "https://facebook.com" },
    { icon: <FiYoutube size={20} />, href: "https://youtube.com" },
    { icon: <LiaTelegramPlane size={20} />, href: "https://t.me" },
    { icon: <AiOutlineDiscord size={20} />, href: "https://discord.com" },
  ];

  return (
    <div className="bg-foreground rounded-t-4xl">
      <div className="px-2 relative bg-background/95">
        <div className="bg-primary/60 absolute w-50 aspect-square rounded-full right-5 bottom-5 blur-3xl"></div>
        <div className="flex justify-center w-full h-full absolute top-0 left-0 flex-col gap-20">
          <div className="bg-primary/60 w-[60vw] h-20 rounded-full right-5 bottom-5 blur-[80px] ml-auto mr-20"></div>
          <div className="bg-primary/60 w-[60vw] h-20 rounded-full blur-[80px]"></div>
        </div>

        <Container className="text-foreground relative overflow-hidden pb-10 lg:pb-0">
          <div className="text-lg font-normal py-16 relative z-10">
            <div className="lg:col-span-2 max-w-[440px] space-y-4 mb-12">
              <NavbarLogo
                logoClassName="h-16 md:h-22"
                textClassName="text-lg sm:text-xl md:text-2xl"
                isScrolled={false}
              />
            </div>
            <div className="grid grid-cols-2  lg:grid-cols-4 gap-0 md:gap-10">
              {footerLinks.map((section, index) => (
                <div key={index} className="flex flex-col space-y-1.5 md:space-y-4">
                  <h1 className="text-base md:text-lg lg:text-xl font-bold uppercase">
                    {section.title}
                  </h1>
                  {index === 0 && (
                    <HomeHref link={{ label: t("allPropFirms"), href: "" }} />
                  )}
                  {/* Main Links */}
                  {section.links.map((link, i) => (
                    <Link key={i} href={link.href} className="hover:underline">
                      <Subtitle className="text-foreground/80">
                        {link.label}
                      </Subtitle>
                    </Link>
                  ))}

                  {/* Social Links */}
                  {section.title === t("getHelp") && (
                    <div className="mt-4">
                      <Subtitle className="font-bold mb-2 text-foreground">
                        {t("socialLinks")}
                      </Subtitle>
                      <div className="flex gap-1.5 flex-wrap">
                        {socialLinks.map((social, i) => (
                          <Link
                            key={i}
                            href={social.href}
                            target="_blank"
                            className="hover:text-primary transition-colors"
                          >
                            {social.icon}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SubItems */}
                  {section?.subItems && (
                    <div className="flex flex-col space-y-4">
                      <h1 className="text-base md:text-lg lg:text-xl font-bold uppercase">
                        {section.subItems.title}
                      </h1>
                      {section.subItems.links.map((subLink, i) => (
                        <Link
                          key={i}
                          href={subLink.href}
                          className="hover:underline"
                        >
                          <Subtitle className="text-foreground/80">
                            {subLink.label}
                          </Subtitle>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-[#707070]">
            <p className="text-foreground/80 text-sm text-center py-8" dir="auto">
              {t("copyright")}
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
