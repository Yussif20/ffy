import SectionTitle from "@/components/Global/SectionTitle";
import BS_Filter from "./BS_Filter";
import BS_Table from "./BS_Table";
import { getTranslations } from "next-intl/server";

export default async function BestSellers() {
     const t = await getTranslations('BestSellers')
    return (
        <div className='space-y-8 pb-20 md:pb-30'>
            <SectionTitle
                title={t('title')}
                subtitle={t('subtitle')}
            />
            <BS_Filter />

            <BS_Table />
            
        </div>
    );
}