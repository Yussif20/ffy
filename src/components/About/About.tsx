import LinearBorder from "../Global/LinearBorder";
import SectionTitle from "../Global/SectionTitle";
import { Separator } from "../ui/separator";
import { getTranslations } from "next-intl/server";

export default async function About() {
    const t = await getTranslations("About");

    const members = [
        { name: "Hassan Chami", role: t("ceo") },
        { name: "Omar Al Saif", role: t("cto") },
    ];

    return (
        <div className="space-y-12 pb-20 md:pb-30">
            {/* About Us */}
            <div>
                <h3 className="text-transparent bg-clip-text bg-linear-to-t from-primary1 to-primary2 font-bold text-lg md:text-xl lg:text-2xl text-center">
                    {t("aboutUs")}
                </h3>
                <SectionTitle
                    title={t("title")}
                    subtitle={t("subtitle")}
                />
            </div>

            {/* Founded & Languages */}
            <div className="flex gap-8 justify-center items-center ">
                <div className="space-y-2 max-w-max text-center">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-t from-primary1 to-primary2">
                        2023
                    </h1>
                    <p>{t("founded")}</p>
                </div>
                <div className="h-15">
                    <Separator orientation="vertical" />
                </div>
                <div className="space-y-2 max-w-max text-center">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-t from-primary1 to-primary2">
                        8+
                    </h1>
                    <p>{t("language")}</p>
                </div>
            </div>

            {/* Vision */}
            <LinearBorder
                className="max-w-full rounded-xl ml-0.5"
                className2="w-full rounded-xl"
            >
                <div className="w-full rounded-2xl py-16 relative flex justify-center items-center px-4 sm:px-8 md:px-16 overflow-hidden bg-background">
                    <div className="absolute w-50 aspect-square bg-primary/40 blur-[80px] -left-5 -bottom-5"></div>

                    <div className="space-y-8">
                        <h4 className="text-base md:text-lg font-semibold text-primary text-center uppercase">
                            {t("vision")}
                        </h4>
                        <h1 className="text-2xl md:text-3xl font-semibold uppercase text-center max-w-5xl">
                            {t("description")}
                        </h1>
                    </div>
                </div>
            </LinearBorder>

            {/* Founding Team */}
            <div className="space-y-8">
                <div>
                    <h3 className="text-transparent bg-clip-text bg-linear-to-t from-primary1 to-primary2 font-bold text-lg md:text-xl lg:text-2xl text-center">
                        {t("meetTitle")}
                    </h3>
                    <SectionTitle title={t("meetSubtitle")} />
                </div>

                <div className="flex justify-center items-center gap-5">
                    {members.map((item, idx) => (
                        <div
                            key={idx}
                            className="rounded-lg w-full max-w-[400px] aspect-square bg-foreground/10 relative overflow-hidden"
                        >
                            <div className="absolute w-full py-1 sm:py-2 bg-foreground/10 bottom-0 px-3 sm:px-5">
                                <h3 className="font-bold text-sm sm:text-lg lg:text-xl">
                                    {item.name}
                                </h3>
                                <h4 className="font-medium text-sm sm:text-lg lg:text-xl">
                                    {item.role}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
