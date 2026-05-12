import { MessageSquare, Share2, ThumbsUp } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface DesafioCardProps {
    challenge: {
        id: number;
        title: string;
        description: string;
        category: string;
        status: string;
        votes_count: number;
        user?: { name: string };
        created_at: string;
    };
}

export default function DesafioCard({ challenge }: DesafioCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-500 border-amber-200 dark:border-amber-500/30';
            case 'in_progress': return 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-500 border-blue-200 dark:border-blue-500/30';
            case 'resolved': return 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-500 border-emerald-200 dark:border-emerald-500/30';
            default: return 'bg-slate-500/10 dark:bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-500/30';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending': return 'Pendiente';
            case 'in_progress': return 'En progreso';
            case 'resolved': return 'Resuelto';
            default: return status;
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            <div className="flex justify-between items-start mb-3 gap-2">
                <span className="bg-blue-500/5 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {challenge.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(challenge.status)}`}>
                    {getStatusText(challenge.status)}
                </span>
            </div>
            
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 leading-tight">
                {challenge.title}
            </h3>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed font-medium">
                {challenge.description}
            </p>
            
            <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-500 mb-4 uppercase tracking-widest font-bold">
                <span className="text-slate-700 dark:text-slate-300">
                    {challenge.user?.name || 'Usuario Anónimo'}
                </span>
                <span>Hace {Math.floor(Math.random() * 10) + 1} días</span>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    <ThumbsUp size={14} />
                    <span>{challenge.votes_count} Votos</span>
                </button>
                
                <div className="flex gap-2">
                    <Link 
                        href={route('desafios.show', challenge.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors font-black text-[10px] uppercase tracking-tighter"
                    >
                        Colaborar
                    </Link>
                    <button className="p-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/50 transition-colors">
                        <MessageSquare size={14} />
                    </button>
                    <button className="p-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-colors">
                        <Share2 size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
