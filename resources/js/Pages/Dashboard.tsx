import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { Trophy, Star, MapPin, Zap, MessageSquare, ArrowRight } from 'lucide-react';

export default function Dashboard({ auth }: { auth: any }) {
    const user = auth.user;
    
    return (
        <AppLayout title="Mi Dashboard">
            <Head title="Dashboard" />

            <div className="px-5 py-6 space-y-8">
                {/* User Welcome Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-2xl">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-black border border-white/30">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-black leading-tight">Hola, {user.name.split(' ')[0]} 👋</h2>
                                <p className="text-blue-100 text-xs font-medium opacity-80 italic">"Cambiando Futaleufú, un reporte a la vez"</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <Trophy size={14} className="text-amber-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Rango</span>
                                </div>
                                <span className="text-lg font-black tracking-tight">Líder Local</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <Star size={14} className="text-amber-400 fill-current" />
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Puntos</span>
                                </div>
                                <span className="text-lg font-black tracking-tight">1,250 pts</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Decorative element */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex items-center justify-between group hover:border-blue-500/50 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-slate-900 dark:text-white">Mis Reportes</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">5 activos • 2 resueltos</p>
                            </div>
                        </div>
                        <ArrowRight size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex items-center justify-between group hover:border-amber-500/50 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-slate-900 dark:text-white">Proyectos Apoyados</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">3 en ejecución</p>
                            </div>
                        </div>
                        <ArrowRight size={20} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                    </div>
                </div>

                {/* Active Challenges Map Preview Shortcut */}
                <Link 
                    href={route('desafios.index')}
                    className="block bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden group border border-slate-800"
                >
                    <div className="relative z-10 flex flex-col h-full justify-between min-h-[120px]">
                        <div>
                            <h3 className="text-xl font-black leading-tight mb-2">Explora el Mapa<br />de Desafíos</h3>
                            <p className="text-slate-400 text-xs font-medium max-w-[200px]">Mira lo que está pasando en tu barrio ahora mismo.</p>
                        </div>
                        <div className="flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-widest mt-4">
                            <span>Abrir Mapa Interactivo</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                    {/* Fake Map Illustration */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-blue-500/20 skew-x-[-12deg] translate-x-8 blur-2xl group-hover:bg-blue-500/30 transition-colors"></div>
                    <div className="absolute top-8 right-8 w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                </Link>

                {/* Footer Section / Action Button */}
                <div className="pt-4 text-center">
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6">
                        ¿Viste algo nuevo en el pueblo?
                    </p>
                    <Link 
                        href={route('antenas.index')}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        <Zap size={18} />
                        Crear Nuevo Reporte
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
