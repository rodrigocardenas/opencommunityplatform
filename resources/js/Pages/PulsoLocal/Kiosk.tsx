import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, Home, Droplets, Zap, ShieldAlert, Heart, ChevronRight } from 'lucide-react';

export default function Kiosk() {
    const categories = [
        { id: 'infraestructura', title: 'Calle o Camino', icon: <Home size={48} />, color: 'bg-blue-500' },
        { id: 'agua', title: 'Agua Potable', icon: <Droplets size={48} />, color: 'bg-cyan-500' },
        { id: 'luz', title: 'Luz Eléctrica', icon: <Zap size={48} />, color: 'bg-amber-500' },
        { id: 'seguridad', title: 'Seguridad', icon: <ShieldAlert size={48} />, color: 'bg-red-500' },
        { id: 'salud', title: 'Salud / Posta', icon: <Heart size={48} />, color: 'bg-emerald-500' },
        { id: 'otros', title: 'Otro Problema', icon: <AlertTriangle size={48} />, color: 'bg-slate-500' },
    ];

    return (
        <AppLayout title="Pulso Local - Kiosco">
            <Head title="Modo Kiosco" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
                <div className="max-w-xl mx-auto text-center mb-8">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                        ¿Qué quieres reportar hoy?
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest">
                        Toca el dibujo que mejor represente tu situación
                    </p>
                </div>

                <div className="max-w-xl mx-auto grid grid-cols-2 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={route('antenas.create', cat.id)}
                            className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-xl hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-2xl transition-all active:scale-95 group overflow-hidden relative"
                        >
                            <div className={`p-6 rounded-3xl mb-4 text-white ${cat.color} shadow-lg group-hover:scale-110 transition-transform`}>
                                {cat.icon}
                            </div>
                            <span className="text-lg font-black text-slate-900 dark:text-white text-center leading-tight">
                                {cat.title}
                            </span>
                            
                            {/* Decorative background circle */}
                            <div className={`absolute -bottom-10 -right-10 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity ${cat.color}`}></div>
                        </Link>
                    ))}
                </div>

                <div className="max-w-xl mx-auto mt-12">
                    <div className="bg-blue-500/10 border-2 border-blue-500/20 rounded-3xl p-6 flex items-center gap-6">
                        <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg">
                            <ChevronRight size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-blue-600 dark:text-blue-400 leading-tight">
                                Ver otros reportes
                            </h3>
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                                Mira lo que tus vecinos están diciendo
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
