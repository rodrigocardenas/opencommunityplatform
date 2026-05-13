import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { Wifi, WifiOff, RefreshCw, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

import { SyncService } from '@/Services/SyncService';
import axios from 'axios';

interface Category {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
}

interface Props {
    categories: Category[];
}

export default function Index({ categories }: Props) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isSyncing, setIsSyncing] = useState(false);
    const [pendingCount, setPendingCount] = useState(0);

    // Monitor connectivity and sync
    useEffect(() => {
        const handleStatusChange = () => setIsOnline(navigator.onLine);
        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);

        const syncInterval = setInterval(async () => {
            setPendingCount(SyncService.getReports().length);
            
            if (navigator.onLine && SyncService.hasPendingReports() && !isSyncing) {
                setIsSyncing(true);
                const reports = SyncService.getReports();
                
                for (const report of reports) {
                    try {
                        await axios.post(route('antenas.store'), report);
                        SyncService.removeReport(report.id);
                        console.log('Reporte sincronizado con éxito');
                    } catch (error) {
                        console.error('Error al sincronizar reporte', error);
                    }
                }
                
                setPendingCount(SyncService.getReports().length);
                setIsSyncing(false);
            }
        }, 5000);

        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
            clearInterval(syncInterval);
        };
    }, [isSyncing]);

    const handleSync = () => {
        // Trigger manual sync if needed, but interval handles it
    };

    return (
        <AppLayout>
            <Head title="Antenas Comunitarias" />

            <div className="min-h-screen bg-slate-950 pb-24">
                {/* Header with Sync Status */}
                <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 p-6 sticky top-0 z-40">
                    <div className="max-w-xl mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl font-black text-white flex items-center gap-3">
                                <span className="text-2xl">📡</span>
                                Antenas Comunitarias
                            </h1>
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border transition-colors ${
                                isOnline 
                                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                                    : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            }`}>
                                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`}></div>
                                {isOnline ? 'Conectado' : 'Modo Offline'}
                            </div>
                        </div>

                        {/* Location Bar Simulation */}
                        <div className="bg-slate-950/50 border border-slate-800/50 rounded-xl px-4 py-2.5 flex items-center gap-3 text-xs text-slate-400">
                            <span className="text-blue-500">📍</span>
                            <span className="font-medium truncate">San Pedro de Atacama, Región de Antofagasta</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-xl mx-auto p-5">
                    <div className="mb-8">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Selecciona el tipo de datos</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {categories.map(cat => (
                                <Link 
                                    key={cat.id}
                                    href={route('antenas.create', cat.id)}
                                    className="group bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex items-center gap-5 hover:border-blue-500/50 hover:bg-slate-900 transition-all shadow-sm active:scale-[0.98]"
                                >
                                    <div className="text-4xl bg-slate-950 p-4 rounded-2xl border border-slate-800 group-hover:border-blue-500/30 group-hover:scale-110 transition-all shadow-inner">
                                        {cat.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-black text-white mb-1 group-hover:text-blue-400 transition-colors">{cat.title}</h3>
                                        <p className="text-xs text-slate-500 leading-relaxed">{cat.description}</p>
                                    </div>
                                    <ChevronRight className="text-slate-700 group-hover:text-blue-500 transition-colors" size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Pending Sync Floating Button (Real Data) */}
                    {pendingCount > 0 && (
                        <div className="fixed bottom-24 right-5 left-5 max-w-md mx-auto z-50">
                            <div className="w-full bg-blue-600 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-blue-400/30">
                                <div className="flex items-center gap-3">
                                    <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
                                    <span className="text-sm font-bold uppercase tracking-wider">
                                        {pendingCount} {pendingCount === 1 ? 'reporte pendiente' : 'reportes pendientes'}
                                    </span>
                                </div>
                                <span className="text-[10px] bg-blue-500/50 px-2 py-1 rounded-lg">
                                    {isSyncing ? 'Sincronizando...' : 'Esperando Conexión'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
