import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { AlertTriangle, TrendingUp, Zap, ShieldCheck, Map as MapIcon } from 'lucide-react';

interface AntenaIndexProps {
    alerts: any[];
    heatmapData: any[];
}

export default function AntenaIndex({ alerts, heatmapData }: AntenaIndexProps) {
    return (
        <AdminLayout title="Antena IA - Predicción de Riesgos">
            <Head title="Antena IA" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT: ALERTS LIST */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                            <Zap className="text-amber-500 fill-amber-500" size={24} />
                            Alertas Predictivas
                        </h2>
                        <span className="text-[10px] font-black bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full uppercase tracking-widest">IA Activa</span>
                    </div>

                    <div className="space-y-4">
                        {alerts.map((alert) => (
                            <div 
                                key={alert.id}
                                className={`p-6 rounded-3xl border-2 transition-all hover:scale-[1.01] ${
                                    alert.severity === 'high' 
                                    ? 'bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20' 
                                    : alert.severity === 'medium'
                                    ? 'bg-amber-50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-500/20'
                                    : 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-2xl ${
                                        alert.severity === 'high' ? 'bg-red-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                                    }`}>
                                        <AlertTriangle size={24} />
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-[10px] font-black uppercase tracking-tighter text-slate-500">Probabilidad</span>
                                        <span className={`text-2xl font-black ${
                                            alert.severity === 'high' ? 'text-red-600' : 'text-slate-900 dark:text-white'
                                        }`}>{alert.probability}%</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">{alert.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 font-medium">{alert.description}</p>

                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/5">
                                        <MapIcon size={14} className="text-slate-500" />
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{alert.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/5">
                                        <TrendingUp size={14} className="text-slate-500" />
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{alert.prediction_date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: HEATMAP SIMULATION & STATS */}
                <div className="flex flex-col gap-6">
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <ShieldCheck className="text-emerald-400 mb-4" size={40} />
                            <h3 className="text-2xl font-black mb-2 tracking-tight">Estado de Red</h3>
                            <p className="text-slate-400 text-sm font-medium mb-6 leading-relaxed">Las antenas comunitarias están operando al 98% de capacidad.</p>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400 font-bold uppercase tracking-widest">Nodos Activos</span>
                                    <span className="font-black">124</span>
                                </div>
                                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full w-[98%]"></div>
                                </div>
                            </div>
                        </div>
                        {/* Decoration */}
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="bg-white dark:bg-[#1A1F2E] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                            <TrendingUp className="text-blue-500" size={18} />
                            Tendencias IA
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-center justify-between">
                                <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">Resiliencia</span>
                                <span className="text-xs font-black text-emerald-500">+12%</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">Riesgo Urbano</span>
                                <span className="text-xs font-black text-red-500">+5%</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">Confianza</span>
                                <span className="text-xs font-black text-blue-500">Alta</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
