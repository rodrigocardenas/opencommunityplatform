import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeft, MapPin, Calendar, ThumbsUp, MessageCircle, Share2, Award, Zap, ShieldCheck } from 'lucide-react';
import Timeline from '@/Components/Desafios/Timeline';

// ... interfaces ...

export default function Show({ challenge, steps }: Props) {
    const progressPercentage = Math.round((steps.length > 0 ? steps.filter(s => s.status === 'completed').length / steps.length : 0) * 100);
    const fundingPercentage = challenge.funding_goal > 0 ? Math.round((challenge.funding_raised / challenge.funding_goal) * 100) : 0;

    const handleContribute = () => {
        router.post(route('projects.contribute', challenge.id), {
            amount: 5000 // Monto simulado para el demo
        }, { preserveScroll: true });
    };

    const handleJoin = () => {
        router.post(route('projects.join', challenge.id), {}, { preserveScroll: true });
    };

    return (
        <AppLayout>
            <Head title={`Ruta del Cambio: ${challenge.title}`} />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors">
                {/* Header Section */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-6 sticky top-0 z-40">
                    <div className="max-w-xl mx-auto flex items-center justify-between">
                        <Link href={route('desafios.index')} className="p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors">
                            <ChevronLeft size={24} />
                        </Link>
                        <div className="text-center">
                            <h1 className="text-lg font-black text-slate-900 dark:text-white leading-tight">Ruta del Cambio</h1>
                            <p className="text-[10px] text-blue-600 dark:text-blue-500 font-black uppercase tracking-[0.2em]">Módulo de Gestión OCP</p>
                        </div>
                        <button className="p-2 -mr-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                <div className="max-w-xl mx-auto p-5">
                    {/* Info Card */}
                    <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 mb-6 relative overflow-hidden shadow-sm">
                        <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-20">
                            <Award className="text-blue-600 dark:text-blue-500 w-24 h-24" />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="flex gap-2 mb-4">
                                <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                    {challenge.category}
                                </span>
                                {challenge.is_project && (
                                    <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                        <Zap size={10} className="fill-current" />
                                        PROYECTO ACTIVO
                                    </span>
                                )}
                            </div>
                            
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 leading-tight tracking-tight">{challenge.title}</h2>
                            
                            <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 mb-6 font-bold uppercase tracking-tighter">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={14} className="text-blue-600 dark:text-blue-500" />
                                    <span>{challenge.address}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-blue-600 dark:text-blue-500" />
                                    <span>Iniciado hace 12 días</span>
                                </div>
                            </div>

                            {/* Overall Progress */}
                            <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Ejecución del Proyecto</span>
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg shadow-blue-500/20">{progressPercentage}%</span>
                                </div>
                                <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-3 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                                    <span>PLANIFICACIÓN</span>
                                    <span>ENTREGA FINAL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Crowdfunding & Volunteers (Only if project) */}
                    {challenge.is_project && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                                <div className="relative z-10">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-80">Crowdfunding Social</h4>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <span className="text-2xl font-black">${Number(challenge.funding_raised).toLocaleString()}</span>
                                        <span className="text-[10px] font-bold">Meta: ${Number(challenge.funding_goal).toLocaleString()}</span>
                                    </div>
                                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white transition-all duration-1000" style={{ width: `${fundingPercentage}%` }}></div>
                                    </div>
                                    <button 
                                        onClick={handleContribute}
                                        className="w-full mt-6 bg-white text-emerald-700 font-black py-2 rounded-xl text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all active:scale-95 shadow-lg"
                                    >
                                        Donar ahora
                                    </button>
                                </div>
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                                <div className="relative z-10">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-80">Banco de Voluntarios</h4>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <span className="text-2xl font-black">{challenge.volunteers_count}</span>
                                        <span className="text-[10px] font-bold">Cupos: {challenge.volunteers_needed}</span>
                                    </div>
                                    <div className="flex gap-1 mb-6">
                                        {Array.from({ length: challenge.volunteers_needed }).map((_, i) => (
                                            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < challenge.volunteers_count ? 'bg-white' : 'bg-white/20'}`}></div>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={handleJoin}
                                        className="w-full bg-white text-blue-700 font-black py-2 rounded-xl text-xs uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95 shadow-lg"
                                    >
                                        Ser voluntario
                                    </button>
                                </div>
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            </div>
                        </div>
                    )}

                    {/* Transparency Section (Open Government) */}
                    {challenge.is_project && (
                        <div className="mb-8">
                            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-6 px-2 flex items-center gap-3">
                                Transparencia de Fondos
                                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                            </h3>
                            
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={18} className="text-blue-600" />
                                        <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Portal de Probidad</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500">Última boleta: 12 Mayo</span>
                                </div>
                                <div className="p-0">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-100 dark:border-slate-800">
                                                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ítem</th>
                                                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Monto</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs">
                                            <tr className="border-b border-slate-100 dark:border-slate-800/50">
                                                <td className="p-4 text-slate-600 dark:text-slate-300 font-medium">Materiales de construcción (Ferretería Central)</td>
                                                <td className="p-4 text-slate-900 dark:text-white font-black text-right">$45.000</td>
                                            </tr>
                                            <tr className="border-b border-slate-100 dark:border-slate-800/50">
                                                <td className="p-4 text-slate-600 dark:text-slate-300 font-medium">Alquiler de maquinaria (Pala mecánica)</td>
                                                <td className="p-4 text-slate-900 dark:text-white font-black text-right">$80.000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
                                    <span className="text-xs font-black uppercase tracking-widest">Inversión Social Total</span>
                                    <span className="text-lg font-black">$125.000</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Timeline Section */}
                    <div className="mb-8">
                        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-8 px-2 flex items-center gap-3">
                            Gestión de Obra Comunitaria
                            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                        </h3>
                        <Timeline steps={steps} />
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group shadow-sm">
                            <ThumbsUp className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 mb-2" size={28} />
                            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest group-hover:text-blue-600 dark:group-hover:text-blue-400">Apoyar</span>
                            <span className="text-[10px] text-slate-500 font-bold">{challenge.votes_count} Votos</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group shadow-sm">
                            <MessageCircle className="text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 mb-2" size={28} />
                            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Comentar</span>
                            <span className="text-[10px] text-slate-500 font-bold">8 Mensajes</span>
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
