import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

import ThemeToggle from '@/Components/ThemeToggle';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-slate-50 dark:bg-slate-950 pt-6 sm:justify-center sm:pt-0 transition-colors duration-300">
            <div className="fixed top-5 right-5">
                <ThemeToggle />
            </div>

            <div className="relative">
                <div className="absolute -inset-4 bg-blue-600/10 dark:bg-blue-600/20 blur-3xl rounded-full"></div>
                <Link href="/" className="relative z-10">
                    <ApplicationLogo className="h-20 w-20 fill-current text-blue-600 dark:text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] dark:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                </Link>
            </div>

            <div className="mt-8 w-full overflow-hidden bg-white dark:bg-slate-900/50 backdrop-blur-xl px-8 py-10 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl sm:max-w-md sm:rounded-3xl relative">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                {children}
            </div>
            
            <p className="mt-8 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                Open Community Platform
            </p>
        </div>
    );
}
