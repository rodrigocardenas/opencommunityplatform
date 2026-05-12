import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { Trophy, Medal, Star, Target } from 'lucide-react';

interface LeaderboardProps {
    users: any[];
    currentUser: any;
}

export default function Leaderboard({ users, currentUser }: LeaderboardProps) {
    const getIcon = (index: number) => {
        switch (index) {
            case 0: return <Trophy className="text-amber-400" size={24} />;
            case 1: return <Medal className="text-slate-400" size={24} />;
            case 2: return <Medal className="text-amber-700" size={24} />;
            default: return <span className="text-slate-500 font-bold">{index + 1}</span>;
        }
    };

    return (
        <AppLayout title="Leaderboard Comunitario">
            <Head title="Clasificación" />

            <div className="p-6">
                {/* User Stats Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl mb-8 relative overflow-hidden">
                    <div className="relative z-10 flex justify-between items-center">
                        <div>
                            <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Tu Rango Actual</p>
                            <h2 className="text-3xl font-black">{currentUser.rank}</h2>
                            <div className="mt-4 flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1 w-fit">
                                <Star size={16} className="text-amber-300 fill-amber-300" />
                                <span className="font-black text-sm">{currentUser.points} Puntos</span>
                            </div>
                        </div>
                        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-xl border border-white/20">
                            <Trophy size={48} className="text-amber-300" />
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Target className="text-blue-500" />
                    Top Contribuidores
                </h3>

                <div className="space-y-3">
                    {users.map((user, index) => (
                        <div 
                            key={user.id}
                            className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                                user.id === currentUser.id 
                                ? 'bg-blue-50 dark:bg-blue-500/10 border-2 border-blue-500/50' 
                                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
                            }`}
                        >
                            <div className="w-10 flex justify-center">
                                {getIcon(index)}
                            </div>
                            
                            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-500">
                                {user.name.substring(0, 2).toUpperCase()}
                            </div>

                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900 dark:text-white leading-tight">
                                    {user.name}
                                    {user.id === currentUser.id && <span className="ml-2 text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full">TÚ</span>}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{user.rank}</p>
                            </div>

                            <div className="text-right">
                                <span className="block font-black text-slate-900 dark:text-white">{user.points}</span>
                                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Puntos</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
