import SectionTitle from '@/components/Global/SectionTitle';
import { getTranslations } from 'next-intl/server';
import HINFilter from './HINFilter';
import HINTable from './HINTable';

export default async function HighImpactNews() {
    const t = await getTranslations('HighImpactNews');

    return (
        <div className='space-y-8 pb-20 md:pb-30'>
            <SectionTitle
                title={t('title')}
                subtitle={t('subtitle')}
                subtitleClass="font-semibold"
            />
            <HINFilter />
            <HINTable />
        </div>
    );
}