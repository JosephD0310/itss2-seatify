import type { ReactNode } from 'react';
import Header from '../components/Header';

type LayoutProps = {
    children: ReactNode;
};

function DefaultLayout({ children }: LayoutProps) {
    return (
        <div className='bg-[#EDFFF4] h-screen w-screen'>
            <Header />
            <main className="px-20 py-8 w-full">
                {children}
            </main>
        </div>
    );
}

export default DefaultLayout;
