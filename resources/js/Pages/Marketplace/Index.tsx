import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { Search, ShoppingBag, MapPin, Star, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface Business {
    id: number;
    name: string;
    slug: string;
    description: string;
    category: string;
    image_url: string | null;
    contact_whatsapp: string | null;
}

interface Props {
    businesses: Business[];
    categories: any[];
}

export default function Index({ businesses, categories }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredBusinesses = selectedCategory 
        ? businesses.filter(b => b.category === selectedCategory)
        : businesses;

    return (
        <AppLayout>
            <Head title="Mercado Comunitario" />

            <div className="min-h-screen bg-slate-950 pb-24">
                {/* Header */}
                <div className="bg-[#0F172A] p-8 pb-12 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto relative z-10 text-center">
                        <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Mercado Local</h1>
                        <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 font-medium">
                            Apoya el emprendimiento de Futaleufú. Compra local, fortalece tu comunidad.
                        </p>
                        
                        <div className="relative max-w-lg mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input 
                                type="text" 
                                placeholder="Buscar servicios, comida o artesanía..."
                                className="w-full bg-slate-900/80 border border-slate-700/50 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-2xl"
                            />
                        </div>
                    </div>
                    {/* Background glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[100px]"></div>
                </div>

                <div className="max-w-4xl mx-auto px-5 -mt-6">
                    {/* Categories Horizontal Scroll */}
                    <div className="flex gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
                        <button 
                            onClick={() => setSelectedCategory(null)}
                            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border ${!selectedCategory ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                        >
                            Todos
                        </button>
                        {categories.map(cat => (
                            <button 
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border flex items-center gap-2 ${selectedCategory === cat.id ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                            >
                                <span>{cat.icon}</span>
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Business Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {filteredBusinesses.map(business => (
                            <div key={business.id} className="group bg-slate-900/50 border border-slate-800 rounded-[2rem] overflow-hidden hover:border-blue-500/50 transition-all shadow-xl hover:shadow-blue-500/5">
                                <div className="aspect-[16/9] bg-slate-800 relative">
                                    {business.image_url ? (
                                        <img src={business.image_url} alt={business.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-700">
                                            <ShoppingBag size={48} />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-tighter border border-white/5">
                                        {business.category}
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">{business.name}</h3>
                                        <div className="flex items-center gap-1 text-amber-500">
                                            <Star size={14} fill="currentColor" />
                                            <span className="text-xs font-black">4.8</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-6 line-clamp-2 font-medium leading-relaxed">
                                        {business.description}
                                    </p>
                                    
                                    <div className="flex items-center gap-3">
                                        <Link 
                                            href={route('marketplace.show', business.slug)}
                                            className="flex-1 bg-slate-950 hover:bg-slate-800 text-white text-center py-3 rounded-xl border border-slate-800 text-[10px] font-black uppercase tracking-widest transition-colors"
                                        >
                                            Ver Detalles
                                        </Link>
                                        {business.contact_whatsapp && (
                                            <a 
                                                href={`https://wa.me/${business.contact_whatsapp}`}
                                                target="_blank"
                                                className="p-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-colors"
                                            >
                                                <MessageCircle size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredBusinesses.length === 0 && (
                        <div className="text-center py-20 bg-slate-900/30 rounded-[3rem] border border-dashed border-slate-800">
                            <ShoppingBag className="mx-auto text-slate-800 mb-4" size={64} />
                            <h3 className="text-white font-bold mb-2">No hay emprendimientos en esta categoría</h3>
                            <p className="text-slate-500 text-xs">Sé el primero en registrar tu servicio local.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
