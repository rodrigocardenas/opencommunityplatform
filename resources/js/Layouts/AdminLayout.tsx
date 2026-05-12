import { useState, PropsWithChildren } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Map as MapIcon, 
    Database, 
    FileText, 
    Bell, 
    Settings, 
    Menu, 
    X
} from 'lucide-react';

import ThemeToggle from '@/Components/ThemeToggle';

interface AdminLayoutProps {
    title: string;
    user?: any;
}

export default function AdminLayout({ children, title, user }: PropsWithChildren<AdminLayoutProps>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: route('admin.dashboard'), active: route().current('admin.dashboard') },
        { name: 'Antena IA', icon: Bell, href: route('admin.antenas'), active: route().current('admin.antenas'), tag: 'PREDICTIVE' },
        { name: 'Kiosco Pulso Local', icon: Database, href: route('pulso.kiosk') },
        { name: 'Mapa Territorial', icon: MapIcon, href: '#', tag: 'F2' },
        { name: 'Reportes', icon: FileText, href: '#' },
        { name: 'Configuración', icon: Settings, href: '#' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0A0E14] text-slate-900 dark:text-slate-200 font-sans flex transition-colors duration-300">
            <Head title={title} />

            {/* OVERLAY MOBILE */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[280px] bg-white dark:bg-[#1A1F2E] border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex flex-col items-center justify-center p-6 border-b border-slate-200 dark:border-slate-800/50">
                    <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-3">
                        <span className="text-3xl font-black text-white tracking-tighter">OCP</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-wide">Puente de Datos</span>
                </div>

                <nav className="p-4 flex flex-col gap-2">
                    {navItems.map((item, index) => (
                        <Link 
                            key={index} 
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                                item.active 
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                                : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                            }`}
                        >
                            <item.icon size={20} className={item.active ? 'text-white' : ''} />
                            <span>{item.name}</span>
                            {item.tag && (
                                <span className="ml-auto text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                                    {item.tag}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* HEADER */}
                <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#1A1F2E]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-4 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-4">
                        <button 
                            className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 hidden sm:block">{title}</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            En línea
                        </div>

                        <button className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                                {user ? user.name.substring(0, 2).toUpperCase() : 'AD'}
                            </div>
                            <div className="hidden sm:flex flex-col items-start">
                                <span className="text-sm font-bold text-slate-900 dark:text-slate-200 leading-none group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{user ? user.name : 'Administrador'}</span>
                                <span className="text-[10px] text-slate-500">Mi Perfil</span>
                            </div>
                        </button>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="p-4 sm:p-8 flex-1 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
