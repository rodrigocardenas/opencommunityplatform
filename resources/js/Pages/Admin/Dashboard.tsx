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
}

export default function Dashboard({ kpis, charts, foda }: DashboardProps) {
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
