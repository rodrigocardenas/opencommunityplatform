import { Link } from '@inertiajs/react';
import { Home, Compass, Plus, Users, User, LogOut } from 'lucide-react';
import { ReactNode } from 'react';

import ThemeToggle from '@/Components/ThemeToggle';

interface AppLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AppLayout({ children, title = 'OCP' }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans pb-24 transition-colors duration-300">
            <div className="max-w-md mx-auto min-h-screen relative bg-transparent">
                {/* Header */}
                <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-6 pt-8 shadow-sm relative overflow-hidden">
                    <div className="relative z-10 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                                {title}
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Open Community Platform</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            <Link 
                                href={route('logout')} 
                                method="post" 
                                as="button"
                                className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors"
                                title="Cerrar Sesión"
                            >
                                <LogOut size={20} />
                            </Link>
                        </div>
                    </div>
                    {/* Decorative gradient */}
                    <div className="absolute -top-1/2 -right-5 w-24 h-[200%] bg-blue-500/10 rotate-12 blur-xl rounded-full pointer-events-none"></div>
                </header>

                {/* Main Content */}
                <main>
                    {children}
                </main>

                {/* Bottom Navigation */}
                <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_12px_rgba(0,0,0,0.4)] z-50 transition-colors duration-300">
                    <Link 
                        href={route('dashboard')} 
                        className={`flex flex-col items-center gap-1 transition-colors font-semibold text-[10px] ${route().current('dashboard') ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Home size={20} />
                        <span>Inicio</span>
                    </Link>
                    <Link 
                        href={route('desafios.index')} 
                        className={`flex flex-col items-center gap-1 transition-colors font-semibold text-[10px] ${route().current('desafios.*') ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Compass size={20} />
                        <span>Explorar</span>
                    </Link>
                    <Link 
                        href={route('antenas.index')} 
                        className={`flex flex-col items-center gap-1 transition-colors font-semibold text-[10px] ${route().current('antenas.*') ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Plus size={20} />
                        <span>Reportar</span>
                    </Link>
                    <Link 
                        href={route('marketplace.index')} 
                        className={`flex flex-col items-center gap-1 transition-colors font-semibold text-[10px] ${route().current('marketplace.*') ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Users size={20} />
                        <span>Mercado</span>
                    </Link>
                    <Link 
                        href={route('profile.edit')} 
                        className={`flex flex-col items-center gap-1 transition-colors font-semibold text-[10px] ${route().current('profile.edit') ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <User size={20} />
                        <span>Perfil</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}
