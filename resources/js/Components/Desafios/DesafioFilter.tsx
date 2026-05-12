interface DesafioFilterProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function DesafioFilter({ activeTab, setActiveTab }: DesafioFilterProps) {
    const tabs = [
        { id: 'todos', label: 'Todos' },
        { id: 'populares', label: 'Populares' },
        { id: 'recientes', label: 'Recientes' },
        { id: 'resueltos', label: 'Resueltos' },
    ];

    return (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                        activeTab === tab.id
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
