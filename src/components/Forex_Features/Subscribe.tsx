import { getTranslations } from 'next-intl/server';
import Container from '../Global/Container';
import SubscribeForm from './SubscribeForm';

export default async function Subscribe() {
    const t = await getTranslations('Subscribe');

    return (
        <Container className='pb-20 md:pb-30'>
            <div className='w-full rounded-2xl py-20 border-primary border relative flex justify-center items-center px-5 sm:px-10 md:px-20'>
                <div className='absolute w-50 aspect-square bg-primary/40 blur-[80px] left-20 top-5'></div>
                <div className='absolute w-50 aspect-square bg-primary/40 blur-[80px] right-20 top-5'></div>
                <div className='space-y-8'>
                    <h4 className='text-base md:text-lg font-semibold text-primary text-center uppercase'>{t('stayConnected')}</h4>
                    <h1 className='text-2xl md:text-3xl font-semibold uppercase text-center max-w-2xl'>{t('title')}</h1>
                    <SubscribeForm />
                </div>
            </div>
        </Container>
    );
}