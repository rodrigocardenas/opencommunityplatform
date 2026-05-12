import React, { useState } from 'react';
import { Package, Star, X, Sparkles } from 'lucide-react';

interface LootBoxProps {
    isOpen: boolean;
    onClose: () => void;
    reward: {
        type: string;
        name: string;
        points: number;
    };
}

export default function LootBox({ isOpen, onClose, reward }: LootBoxProps) {
    const [phase, setPhase] = useState<'idle' | 'opening' | 'reward'>('idle');

    if (!isOpen) return null;

    const handleOpen = () => {
        setPhase('opening');
        setTimeout(() => setPhase('reward'), 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative w-full max-w-sm">
                
                {phase === 'idle' && (
                    <div className="text-center">
                        <div className="mb-8 relative inline-block animate-bounce">
                            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-50 rounded-full"></div>
                            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[3rem] shadow-2xl border-4 border-white/20">
                                <Package size={120} className="text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4">¡Misión Cumplida!</h2>
                        <p className="text-slate-400 font-bold mb-8 uppercase tracking-widest">Tienes una recompensa simbólica esperando</p>
                        <button 
                            onClick={handleOpen}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-3xl shadow-xl shadow-blue-500/30 transition-all active:scale-95 text-xl tracking-tight"
                        >
                            ABRIR CAJA
                        </button>
                    </div>
                )}

                {phase === 'opening' && (
                    <div className="text-center animate-pulse">
                        <div className="mb-8 relative inline-block scale-110">
                            <div className="absolute inset-0 bg-amber-500 blur-3xl opacity-80 rounded-full animate-ping"></div>
                            <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 p-10 rounded-[3rem] shadow-2xl border-4 border-white/20 rotate-12">
                                <Package size={120} className="text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-black text-white mb-2">Abriendo...</h2>
                    </div>
                )}

                {phase === 'reward' && (
                    <div className="text-center animate-in zoom-in duration-500">
                        <div className="mb-8 relative inline-block">
                            <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-50 rounded-full"></div>
                            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-10 rounded-full shadow-2xl border-4 border-white/20">
                                <Star size={120} className="text-white fill-white" />
                                <div className="absolute -top-4 -right-4 bg-amber-400 p-3 rounded-2xl shadow-lg border-2 border-white rotate-12">
                                    <Sparkles size={32} className="text-white" />
                                </div>
                            </div>
                        </div>
                        <h2 className="text-4xl font-black text-white mb-2 tracking-tight">¡{reward.name}!</h2>
                        <p className="text-emerald-400 text-xl font-black mb-10">+{reward.points} PUNTOS</p>
                        
                        <button 
                            onClick={onClose}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-3xl transition-all active:scale-95"
                        >
                            GENIAL, GRACIAS
                        </button>
                    </div>
                )}

                <button 
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 text-slate-500 hover:text-white transition-colors"
                >
                    <X size={32} />
                </button>
            </div>
        </div>
    );
}
