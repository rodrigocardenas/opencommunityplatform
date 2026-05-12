import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, MapPin, Calendar, ThumbsUp, MessageCircle, Share2, Award } from 'lucide-react';
import Timeline from '@/Components/Desafios/Timeline';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface Step {
    id: number;
    title: string;
    description: string;
    status: 'completed' | 'active' | 'pending';
    phase: string;
    responsible: string;
    tasks: Task[];
}

interface Challenge {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    address: string;
    votes_count: number;
    user?: { name: string };
}

interface Props {
    challenge: Challenge;
    steps: Step[];
}

export default function Show({ challenge, steps }: Props) {
    const progressPercentage = Math.round((steps.filter(s => s.status === 'completed').length / steps.length) * 100);

    return (
        <AppLayout>
            <Head title={`Ruta del Cambio: ${challenge.title}`} />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 pb-24">
                {/* Header Section */}
                <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-6 sticky top-0 z-40">
                    <div className="max-w-xl mx-auto flex items-center justify-between">
                        <Link href={route('desafios.index')} className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                            <ChevronLeft size={24} />
                        </Link>
                        <div className="text-center">
                            <h1 className="text-lg font-bold text-white leading-tight">Ruta del Cambio</h1>
                            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.2em]">Módulo de Gestión OCP</p>
                        </div>
                        <button className="p-2 -mr-2 text-slate-400 hover:text-white transition-colors">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                <div className="max-w-xl mx-auto p-5">
                    {/* Info Card */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <Award className="text-blue-500/20 w-16 h-16" />
                        </div>
                        
                        <div className="relative z-10">
                            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                                {challenge.category}
                            </span>
                            <h2 className="text-2xl font-black text-white mb-3 leading-tight">{challenge.title}</h2>
                            
                            <div className="flex flex-wrap gap-4 text-xs text-slate-400 mb-6">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={14} className="text-blue-500" />
                                    <span>{challenge.address}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-blue-500" />
                                    <span>Iniciado hace 12 días</span>
                                </div>
                            </div>

                            {/* Overall Progress */}
                            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm font-bold text-white">Progreso General</span>
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black">{progressPercentage}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                    <span>Identificación</span>
                                    <span>Impacto Social</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Section */}
                    <div className="mb-6">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-6 px-2 flex items-center gap-3">
                            Línea de Tiempo del Proyecto
                            <div className="h-px flex-1 bg-slate-800"></div>
                        </h3>
                        <Timeline steps={steps} />
                    </div>

                    {/* Quick Actions / Interaction */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center justify-center p-4 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group">
                            <ThumbsUp className="text-slate-400 group-hover:text-blue-500 mb-2" size={24} />
                            <span className="text-xs font-bold text-white group-hover:text-blue-400">Apoyar Proyecto</span>
                            <span className="text-[10px] text-slate-500">{challenge.votes_count} votos</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group">
                            <MessageCircle className="text-slate-400 group-hover:text-emerald-500 mb-2" size={24} />
                            <span className="text-xs font-bold text-white group-hover:text-emerald-400">Comentar</span>
                            <span className="text-[10px] text-slate-500">8 mensajes</span>
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
