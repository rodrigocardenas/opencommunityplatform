import React from 'react';
import { Check, Clock, User as UserIcon, ChevronRight } from 'lucide-react';

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

export function TimelineStep({ step }: { step: Step }) {
    const getStatusStyles = (status: Step['status']) => {
        switch (status) {
            case 'completed':
                return {
                    indicator: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]',
                    card: 'border-l-emerald-500 bg-emerald-500/5',
                    title: 'text-emerald-400',
                    badge: 'border-emerald-500/50 text-emerald-500 bg-emerald-500/10'
                };
            case 'active':
                return {
                    indicator: 'bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse',
                    card: 'border-l-amber-500 bg-amber-500/5 shadow-[0_0_30px_rgba(245,158,11,0.1)]',
                    title: 'text-amber-400',
                    badge: 'border-amber-500/50 text-amber-500 bg-amber-500/10'
                };
            default:
                return {
                    indicator: 'bg-slate-700',
                    card: 'border-l-slate-800 bg-slate-900/40',
                    title: 'text-slate-100',
                    badge: 'border-slate-700 text-slate-500 bg-slate-800/50'
                };
        }
    };

    const styles = getStatusStyles(step.status);

    return (
        <div className="relative pl-10 mb-8 last:mb-0 group">
            {/* Dot Indicator */}
            <div className={`absolute left-2.5 top-1.5 w-4 h-4 rounded-full z-10 border-2 border-slate-950 ${styles.indicator}`}>
                {step.status === 'completed' && <Check size={10} className="text-white mx-auto mt-0.5" />}
            </div>

            {/* Card Content */}
            <div className={`rounded-2xl p-5 border border-slate-800 border-l-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${styles.card}`}>
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 block">
                            {step.phase}
                        </span>
                        <h3 className={`text-lg font-bold ${styles.title}`}>
                            {step.title}
                        </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles.badge}`}>
                        {step.status === 'completed' ? 'Completado' : step.status === 'active' ? 'En Progreso' : 'Pendiente'}
                    </span>
                </div>

                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                    {step.description}
                </p>

                {/* Tasks */}
                <div className="space-y-2 mb-4 bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
                    {step.tasks.map(task => (
                        <div key={task.id} className="flex items-center gap-3 text-xs">
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${task.completed ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-500' : 'border-slate-700 text-slate-600'}`}>
                                {task.completed && <Check size={12} />}
                            </div>
                            <span className={task.completed ? 'text-slate-300' : 'text-slate-500 italic'}>
                                {task.text}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Meta & Actions */}
                <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-slate-800/50">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <UserIcon size={14} className="text-blue-500" />
                        <span className="font-medium">{step.responsible}</span>
                    </div>
                    
                    <button className="flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-wider">
                        Ver Detalles <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Timeline({ steps }: { steps: Step[] }) {
    return (
        <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500 via-amber-500 to-slate-800"></div>
            
            <div className="space-y-2">
                {steps.map(step => (
                    <TimelineStep key={step.id} step={step} />
                ))}
            </div>
        </div>
    );
}
