import LinearBorder from "../Global/LinearBorder";
import SectionTitle from "../Global/SectionTitle";
import { getTranslations } from "next-intl/server";

export default async function Privacy() {
    const t = await getTranslations("Privacy");

    const sections = [
        {
            title: t("dataCollection.title"),
            subsections: [
                {
                    subtitle: t("dataCollection.personal.title"),
                    points: t.raw("dataCollection.personal.points")
                },
                {
                    subtitle: t("dataCollection.nonPersonal.title"),
                    points: t.raw("dataCollection.nonPersonal.points")
                },
                {
                    subtitle: t("dataCollection.analytics.title"),
                    content: t("dataCollection.analytics.content")
                }
            ]
        },
        {
            title: t("purpose.title"),
            points: t.raw("purpose.points")
        },
        {
            title: t("legalBasis.title"),
            points: t.raw("legalBasis.points")
        },
        {
            title: t("dataSharing.title"),
            points: t.raw("dataSharing.points")
        },
        {
            title: t("retention.title"),
            content: t("retention.content"),
            points: t.raw("retention.points")
        },
        {
            title: t("rights.title"),
            points: t.raw("rights.points")
        },
        {
            title: t("security.title"),
            content: t("security.content")
        },
        {
            title: t("thirdParty.title"),
            content: t("thirdParty.content")
        },
        {
            title: t("children.title"),
            content: t("children.content")
        },
        {
            title: t("international.title"),
            content: t("international.content")
        },
        {
            title: t("changes.title"),
            content: t("changes.content")
        },
        {
            title: t("contact.title"),
            content: t("contact.content")
        }
    ];

    return (
        <div className="space-y-12 pb-20 md:pb-30 max-w-6xl mx-auto">
            {/* Main Title */}
            <SectionTitle
                title={t("title")}
                subtitle=""
            />

            {/* Introduction */}
            <LinearBorder
                className="max-w-full rounded-xl ml-0.5"
                className2="w-full rounded-xl"
            >
                <div className="w-full rounded-2xl py-10 md:py-16 relative px-4 sm:px-8 md:px-16 overflow-hidden bg-background">
                    <div className="absolute w-50 aspect-square bg-primary/40 blur-[80px] -left-5 -bottom-5"></div>

                    <div className="space-y-6 relative z-10">
                        <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
                            {t("intro")}
                        </p>
                    </div>
                </div>
            </LinearBorder>

            {/* Sections */}
            {sections.map((section, idx) => (
                <LinearBorder
                    key={idx}
                    className="max-w-full rounded-xl ml-0.5"
                    className2="w-full rounded-xl"
                >
                    <div className="w-full rounded-2xl py-10 md:py-16 relative px-4 sm:px-8 md:px-16 overflow-hidden bg-background">
                        <div className={`absolute w-50 aspect-square bg-primary/40 blur-[80px] ${idx % 2 === 0 ? '-left-5' : 'right-5'} -bottom-5`}></div>

                        <div className="space-y-6 relative z-10">
                            <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-t from-primary1 to-primary2">
                                {section.title}
                            </h4>

                            {section.content && (
                                <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
                                    {section.content}
                                </p>
                            )}

                            {section.subsections && section.subsections.map((sub, subIdx) => (
                                <div key={subIdx} className="space-y-4">
                                    <h5 className="text-lg md:text-xl font-semibold text-primary">
                                        {sub.subtitle}
                                    </h5>
                                    {sub.content && (
                                        <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
                                            {sub.content}
                                        </p>
                                    )}
                                    {sub.points && (
                                        <ul className="space-y-3">
                                            {sub.points.map((point: string, pointIdx: number) => (
                                                <li key={pointIdx} className="flex gap-3 items-start text-base md:text-lg">
                                                    <span className="text-primary font-bold mt-1">•</span>
                                                    <span className="leading-relaxed">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}

                            {section.points && (
                                <ul className="space-y-4">
                                    {section.points.map((point: string, pointIdx: number) => (
                                        <li key={pointIdx} className="flex gap-3 items-start text-base md:text-lg">
                                            <span className="text-primary font-bold mt-1">•</span>
                                            <span className="leading-relaxed whitespace-pre-line">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </LinearBorder>
            ))}
        </div>
    );
}
