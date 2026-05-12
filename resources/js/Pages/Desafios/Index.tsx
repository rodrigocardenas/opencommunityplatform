import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MapContainer from '@/Components/Map/MapContainer';
import DesafioCard from '@/Components/Desafios/DesafioCard';
import DesafioFilter from '@/Components/Desafios/DesafioFilter';
import CreateChallengeModal from '@/Components/Desafios/CreateChallengeModal';
import { Plus, Trophy, Star } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import LootBox from '@/Components/Gamification/LootBox';

export default function DesafiosIndex({ challenges, userStats }: { challenges: any[], userStats: any }) {
    const { flash } = usePage().props as any;
    const [activeTab, setActiveTab] = useState('todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showReward, setShowReward] = useState(!!flash?.reward);

    // Filter logic
    const filteredChallenges = challenges.filter(c => {
        if (activeTab === 'todos') return true;
        if (activeTab === 'resueltos') return c.status === 'resolved';
        if (activeTab === 'populares') return c.votes_count >= 50;
        return true;
    });

    return (
        <AppLayout title="Desafíos del Pueblo">
            <Head title="Desafíos" />

            <div className="px-5 py-4 flex flex-col gap-6">
                
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">El Mapa</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Explora las necesidades de tu zona</p>
                    </div>
                    <Link 
                        href={route('desafios.leaderboard')}
                        className="flex flex-col items-end group"
                    >
                        <div className="flex items-center gap-2 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 px-4 py-2 rounded-2xl group-hover:scale-105 transition-transform">
                            <Trophy className="text-amber-600 dark:text-amber-400" size={18} />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-amber-600 dark:text-amber-500 uppercase leading-none">{userStats.rank}</span>
                                <span className="text-sm font-black text-slate-900 dark:text-white leading-none">{userStats.points} pts</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Map Section */}
                <div>
                    <MapContainer challenges={challenges} />
                </div>

                {/* Stats / Numbers */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-black text-blue-400">{challenges.length}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Totales</span>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-black text-emerald-400">{challenges.filter(c => c.status === 'resolved').length}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resueltos</span>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-black text-amber-400">{challenges.filter(c => c.status === 'pending' || c.status === 'in_progress').length}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Activos</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="mt-2">
                    <DesafioFilter activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                {/* List of Challenges */}
                <div className="flex flex-col gap-4 pb-10">
                    {filteredChallenges.length > 0 ? (
                        filteredChallenges.map(challenge => (
                            <DesafioCard key={challenge.id} challenge={challenge} />
                        ))
                    ) : (
                        <div className="text-center py-10 text-slate-500">
                            No hay desafíos en esta categoría.
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Action Button (FAB) for creating new challenge */}
            <button 
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-[80px] right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-[0_8px_24px_rgba(37,99,235,0.4)] hover:scale-105 hover:shadow-[0_12px_32px_rgba(37,99,235,0.6)] transition-all z-40"
            >
                <Plus size={28} />
            </button>

            {/* Modal */}
            <CreateChallengeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Recompensa */}
            {flash?.reward && (
                <LootBox 
                    isOpen={showReward} 
                    onClose={() => setShowReward(false)} 
                    reward={flash.reward} 
                />
            )}
        </AppLayout>
    );
}
