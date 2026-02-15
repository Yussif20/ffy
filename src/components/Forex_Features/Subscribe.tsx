import { getTranslations } from 'next-intl/server';
import Container from '../Global/Container';
import SubscribeForm from './SubscribeForm';
import SubscribeCoinClient from './SubscribeCoinClient';

export default async function Subscribe() {
    const t = await getTranslations('Subscribe');

    return (
        <Container className='pb-8 md:pb-12'>
            <div className='w-full rounded-2xl py-12 md:py-16 border-primary border relative flex justify-center items-center px-5 sm:px-10 md:px-20 overflow-hidden shadow-[0_0_40px_rgba(5,150,102,0.08)] hover:shadow-[0_0_60px_rgba(5,150,102,0.15)] transition-shadow duration-500'>
                {/* Asymmetric glow blobs */}
                <div className='absolute w-72 h-72 bg-primary/30 blur-[100px] -left-10 bottom-0 rounded-full pointer-events-none'></div>
                <div className='absolute w-28 h-28 bg-primary/20 blur-[60px] right-10 top-4 rounded-full pointer-events-none'></div>
                {/* 3D coin decoration */}
                <SubscribeCoinClient />

                <div className='space-y-6 relative z-10 w-full max-w-2xl'>
                    <h4 className='text-base md:text-lg font-semibold text-primary text-center uppercase'>{t('stayConnected')}</h4>
                    <h1 className='text-2xl md:text-3xl font-semibold uppercase text-center'>{t('title')}</h1>
                    <SubscribeForm />
                    <p className='text-center text-xs text-foreground/40'>
                        {t('socialProof')}
                    </p>
                </div>
            </div>
        </Container>
    );
}