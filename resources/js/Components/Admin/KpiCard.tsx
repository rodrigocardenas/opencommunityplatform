import { ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface KpiCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
        label: string;
    };
    delay?: number;
}

export default function KpiCard({ title, value, icon, trend, delay = 0 }: KpiCardProps) {
    return (
        <div 
            className="bg-white dark:bg-[#1E2639] rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 relative overflow-hidden group hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                    {icon}
                </div>
                
                {trend && (
                    <div className={`flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-md border ${
                        trend.isPositive 
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20' 
                        : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-100 dark:border-red-500/20'
                    }`}>
                        {trend.isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                        {Math.abs(trend.value)}%
                    </div>
                )}
            </div>
            
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">{title}</span>
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</span>
                
                {trend && (
                    <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-bold uppercase tracking-tighter flex items-center gap-1">
                        {trend.label}
                    </span>
                )}
            </div>
        </div>
    );
}
