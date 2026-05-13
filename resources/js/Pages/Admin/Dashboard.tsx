import AdminLayout from '@/Layouts/AdminLayout';
import KpiCard from '@/Components/Admin/KpiCard';
import { DemographicChart, CategoriesChart } from '@/Components/Admin/Charts';
import { Users, Home, Sprout, Droplets, Target, AlertCircle } from 'lucide-react';

interface DashboardProps {
    kpis: {
        poblacion: number;
        familias: number;
        produccion: number;
        recursos: number;
        desafios_totales: number;
        desafios_pendientes: number;
        reportes_totales: number;
    };
    charts: {
        categories: any[];
        demographic: any[];
    };
    foda: {
        fortalezas: string[];
        oportunidades: string[];
        debilidades: string[];
        amenazas: string[];
    };
    pilot_stats: {
        priorities: any[];
        business: {
            total: number;
            active: number;
            pending: number;
        }
    };
}

import { Users, Home, Sprout, Droplets, Target, AlertCircle, ShoppingBag, ThumbsUp } from 'lucide-react';

export default function Dashboard({ kpis, charts, foda, pilot_stats }: DashboardProps) {
    return (
        <AdminLayout title="Dashboard de Indicadores">
            
            {/* FILTROS (MOCK) */}
            <div className="bg-[#1E2639] p-4 sm:p-6 rounded-xl border border-slate-700/50 mb-8 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-400">Período:</span>
                        <select className="bg-[#0A0E14] border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
                            <option>Último año</option>
                            <option>Último mes</option>
                            <option>Todo el tiempo</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-400">Sector:</span>
                        <select className="bg-[#0A0E14] border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
                            <option>Todos</option>
                            <option>Norte</option>
                            <option>Sur</option>
                        </select>
                    </div>
                </div>
                <button className="text-sm px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors">
                    Aplicar Filtros
                </button>
            </div>

            {/* KPI GRID */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Target className="text-blue-500" size={20} />
                    Indicadores Territoriales
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <KpiCard 
                        title="Población Total" 
                        value={kpis.poblacion} 
                        icon={<Users size={24} />} 
                        trend={{ value: 3.2, isPositive: true, label: "vs año anterior" }}
                        delay={0}
                    />
                    <KpiCard 
                        title="Familias" 
                        value={kpis.familias} 
                        icon={<Home size={24} />} 
                        trend={{ value: 1.5, isPositive: true, label: "Promedio 3.4/familia" }}
                        delay={100}
                    />
                    <KpiCard 
                        title="Prod. Agrícola (Ton)" 
                        value={kpis.produccion} 
                        icon={<Sprout size={24} />} 
                        trend={{ value: 8.3, isPositive: true, label: "Este año" }}
                        delay={200}
                    />
                    <KpiCard 
                        title="Recursos Hídricos" 
                        value={kpis.recursos} 
                        icon={<Droplets size={24} />} 
                        trend={{ value: 15, isPositive: false, label: "Litros/día promedio" }}
                        delay={300}
                    />
                </div>
            </div>

            {/* PLATFORM KPIS */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="text-amber-500" size={20} />
                    Estado de la Plataforma
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <KpiCard 
                        title="Desafíos Reportados" 
                        value={kpis.desafios_totales} 
                        icon={<Target size={24} />} 
                    />
                    <KpiCard 
                        title="Desafíos Pendientes" 
                        value={kpis.desafios_pendientes} 
                        icon={<AlertCircle size={24} />} 
                    />
                </div>
            </div>

            {/* PILOT PLAN SECTION */}
            <div className="mb-8">
                <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Target className="text-blue-500" size={20} />
                    Eje Plan Piloto (Futaleufú)
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Top Priorities */}
                    <div className="lg:col-span-2 bg-[#1E2639] border border-slate-700/50 rounded-xl p-6 shadow-xl">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <ThumbsUp size={16} className="text-blue-400" />
                            Prioridades Ciudadanas (Más Votados)
                        </h3>
                        <div className="space-y-4">
                            {pilot_stats.priorities.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-[#0F172A] rounded-xl border border-white/5 hover:border-blue-500/30 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 font-black text-xs">
                                            #{i + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</h4>
                                            <span className="text-[10px] text-slate-500 uppercase font-black">{item.category}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-600/10 rounded-full border border-blue-500/20">
                                        <span className="text-xs font-black text-blue-400">{item.votes}</span>
                                        <ThumbsUp size={12} className="text-blue-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Local Economy */}
                    <div className="bg-[#1E2639] border border-slate-700/50 rounded-xl p-6 shadow-xl">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <ShoppingBag size={16} className="text-emerald-400" />
                            Estado del Mercado Local
                        </h3>
                        <div className="flex flex-col h-full">
                            <div className="text-center py-8 border-b border-white/5 mb-6">
                                <span className="text-4xl font-black text-white block mb-1">{pilot_stats.business.total}</span>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Negocios Registrados</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-400">Activos</span>
                                    <span className="text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                                        {pilot_stats.business.active}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-400">Pendientes</span>
                                    <span className="text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                                        {pilot_stats.business.pending}
                                    </span>
                                </div>
                            </div>
                            <button className="mt-auto w-full py-3 bg-slate-950 border border-white/10 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-800 transition-colors">
                                Gestionar Directorio
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* FODA ANALYSIS */}
            <div className="mb-8">
                <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Target className="text-purple-500" size={20} />
                    Evaluación Territorial Automática (FODA)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Fortalezas */}
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5">
                        <h3 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Fortalezas
                        </h3>
                        <ul className="space-y-2">
                            {foda.fortalezas.map((item: string, i: number) => (
                                <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2 font-medium">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500/50 shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Oportunidades */}
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5">
                        <h3 className="text-sm font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Oportunidades
                        </h3>
                        <ul className="space-y-2">
                            {foda.oportunidades.map((item: string, i: number) => (
                                <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2 font-medium">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-500/50 shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Debilidades */}
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5">
                        <h3 className="text-sm font-black text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            Debilidades
                        </h3>
                        <ul className="space-y-2">
                            {foda.debilidades.map((item: string, i: number) => (
                                <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2 font-medium">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500/50 shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Amenazas */}
                    <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                        <h3 className="text-sm font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Amenazas
                        </h3>
                        <ul className="space-y-2">
                            {foda.amenazas.map((item: string, i: number) => (
                                <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2 font-medium">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-500/50 shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* CHARTS GRID */}
            <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4">Análisis de Datos</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-[#1E2639] rounded-xl p-5 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-900 dark:text-slate-200">Evolución Demográfica</h3>
                        </div>
                        <DemographicChart data={charts.demographic} />
                    </div>

                    <div className="bg-white dark:bg-[#1E2639] rounded-xl p-5 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-900 dark:text-slate-200">Desafíos por Categoría</h3>
                        </div>
                        <CategoriesChart data={charts.categories} />
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}
