import LinearBorder from "../Global/LinearBorder";
import SectionTitle from "../Global/SectionTitle";
import { getTranslations } from "next-intl/server";

export default async function About() {
    const t = await getTranslations("About");

    const members = [
        { name: "Hassan Chami", role: t("ceo") },
        { name: "Omar Al Saif", role: t("cto") },
    ];

    return (
        <div className="space-y-12 pb-20 md:pb-30">
            {/* Main Title */}
            <SectionTitle
                title={t("aboutUs")}
                subtitle=""
            />

            {/* About Us Section */}
            <LinearBorder
                className="max-w-full rounded-xl ml-0.5"
                className2="w-full rounded-xl"
            >
                <div className="w-full rounded-2xl py-10 md:py-16 relative flex justify-center items-center px-4 sm:px-8 md:px-16 overflow-hidden bg-background">
                    <div className="absolute w-50 aspect-square bg-primary/40 blur-[80px] -left-5 -bottom-5"></div>

                    <div className="space-y-6 relative z-10">
                        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-t from-primary1 to-primary2 text-center">
                            {t("aboutUs")}
                        </h4>
                        <p className="text-base md:text-lg text-center max-w-4xl text-muted-foreground whitespace-pre-line leading-relaxed">
                            {t("intro")}
                        </p>
                    </div>
                </div>
            </LinearBorder>

            {/* Vision */}
            <LinearBorder
                className="max-w-full rounded-xl ml-0.5"
                className2="w-full rounded-xl"
            >
                <div className="w-full rounded-2xl py-10 md:py-16 relative flex justify-center items-center px-4 sm:px-8 md:px-16 overflow-hidden bg-background">
                    <div className="absolute w-50 aspect-square bg-primary/40 blur-[80px] right-5 -bottom-5"></div>

                    <div className="space-y-6 relative z-10">
                        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-t from-primary1 to-primary2 text-center">
                            {t("visionTitle")}
                        </h4>
                        <p className="text-base md:text-lg text-center max-w-4xl leading-relaxed">
                            {t("visionText")}
                        </p>
                    </div>
                </div>
            </LinearBorder>

            {/* Mission */}
            <LinearBorder
                className="max-w-full rounded-xl ml-0.5"
                className2="w-full rounded-xl"
            >
                <div className="w-full rounded-2xl py-10 md:py-16 relative px-4 sm:px-8 md:px-16 overflow-hidden bg-background">
                    <div className="absolute w-50 aspect-square bg-primary/40 blur-[80px] -left-5 -bottom-5"></div>

                    <div className="space-y-6 relative z-10">
                        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-t from-primary1 to-primary2 text-center">
                            {t("missionTitle")}
                        </h4>
                        <ul className="space-y-4 max-w-4xl mx-auto">
                            {t.raw("missionPoints").map((point: string, idx: number) => (
                                <li key={idx} className="flex gap-3 items-start text-base md:text-lg">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span className="leading-relaxed">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </LinearBorder>

            {/* What We Offer */}
            <LinearBorder
                className="max-w-full rounded-xl ml-0.5"
                className2="w-full rounded-xl"
            >
                <div className="w-full rounded-2xl py-10 md:py-16 relative px-4 sm:px-8 md:px-16 overflow-hidden bg-background">
                    <div className="absolute w-50 aspect-square bg-primary/40 blur-[80px] right-5 -bottom-5"></div>

                    <div className="space-y-6 relative z-10">
                        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-t from-primary1 to-primary2 text-center">
                            {t("whatWeOfferTitle")}
                        </h4>
                        <ul className="space-y-4 max-w-4xl mx-auto">
                            {t.raw("whatWeOfferPoints").map((point: string, idx: number) => (
                                <li key={idx} className="flex gap-3 items-start text-base md:text-lg">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span className="leading-relaxed">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </LinearBorder>

            {/* Commitment */}
            <LinearBorder
                className="max-w-full rounded-xl ml-0.5"
                className2="w-full rounded-xl"
            >
                <div className="w-full rounded-2xl py-10 md:py-16 relative flex justify-center items-center px-4 sm:px-8 md:px-16 overflow-hidden bg-background">
                    <div className="absolute w-50 aspect-square bg-primary/40 blur-[80px] -left-5 -bottom-5"></div>

                    <div className="space-y-6 relative z-10">
                        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-t from-primary1 to-primary2 text-center">
                            {t("commitmentTitle")}
                        </h4>
                        <p className="text-base md:text-lg text-center max-w-4xl whitespace-pre-line leading-relaxed">
                            {t("commitmentText")}
                        </p>
                    </div>
                </div>
            </LinearBorder>

            {/* Founding Team */}
            <LinearBorder
                className="max-w-full rounded-xl ml-0.5"
                className2="w-full rounded-xl"
            >
                <div className="w-full rounded-2xl py-10 md:py-16 relative px-4 sm:px-8 md:px-16 overflow-hidden bg-background">
                    <div className="absolute w-50 aspect-square bg-primary/40 blur-[80px] right-5 -bottom-5"></div>

                    <div className="space-y-8 relative z-10">
                        <div>
                            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-t from-primary1 to-primary2 text-center">
                                {t("meetTitle")}
                            </h4>
                            <h2 className="text-xl md:text-2xl font-semibold text-center mt-2">
                                {t("meetSubtitle")}
                            </h2>
                        </div>

                        <div className="flex justify-center items-center gap-5 flex-wrap">
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
            </LinearBorder>
        </div>
    );
}
