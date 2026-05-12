import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Link, Briefcase, Info, AlertCircle, CheckCircle2, Globe, ArrowRight } from 'lucide-react';

interface PuenteDatosProps {
    resources: any[];
    gapAnalysis: any;
}

export default function PuenteDatosIndex({ resources, gapAnalysis }: PuenteDatosProps) {
    return (
        <AdminLayout title="Puente de Datos - Conexión Externa">
            <Head title="Puente de Datos" />

            <div className="flex flex-col gap-8">
                
                {/* TOP SECTION: GAP ANALYSIS */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-blue-500 rounded-lg">
                                    <Globe size={20} />
                                </div>
                                <h2 className="text-xl font-black uppercase tracking-widest">Análisis de Brechas (Gap Analysis)</h2>
                            </div>
                            <p className="text-slate-400 font-medium mb-6 leading-relaxed max-w-2xl">
                                Comparamos los desafíos reportados por la comunidad con la oferta de programas estatales y de ONGs para identificar necesidades no cubiertas.
                            </p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-blue-400">{gapAnalysis.matching_efficiency}%</span>
                                <span className="text-slate-500 font-bold uppercase text-xs tracking-tighter">Eficiencia de Cobertura</span>
                            </div>
                        </div>
                        
                        <div className="w-full md:w-auto flex flex-col gap-3">
                            {gapAnalysis.vulnerability_holes.map((hole: any, i: number) => (
                                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-start gap-4">
                                    <div className="p-2 bg-red-500/20 text-red-400 rounded-lg">
                                        <AlertCircle size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white">{hole.area}</h4>
                                        <p className="text-[10px] text-slate-400">Brecha: {hole.need_level} / Recurso: {hole.resource_availability}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Decoration */}
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
                </div>

                {/* BOTTOM SECTION: EXTERNAL PROGRAMS TABLE */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                            <Briefcase className="text-blue-500" size={20} />
                            Programas y Recursos Externos Detectados
                        </h3>
                        <button className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline">
                            Actualizar Fuentes
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {resources.map((res) => (
                            <div 
                                key={res.id}
                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Info size={24} />
                                    </div>
                                    <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-widest">
                                        {res.status}
                                    </span>
                                </div>

                                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 leading-tight">{res.program}</h4>
                                <p className="text-xs font-bold text-blue-600 dark:text-blue-500 mb-4 uppercase tracking-widest">{res.provider}</p>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500 font-medium">Categoría:</span>
                                        <span className="text-slate-900 dark:text-slate-300 font-bold">{res.category}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500 font-medium">Población:</span>
                                        <span className="text-slate-900 dark:text-slate-300 font-bold">{res.target_population}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500 font-medium">Presupuesto:</span>
                                        <span className="text-slate-900 dark:text-slate-300 font-bold">{res.budget_available}</span>
                                    </div>
                                </div>

                                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                    Conectar Desafíos
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
