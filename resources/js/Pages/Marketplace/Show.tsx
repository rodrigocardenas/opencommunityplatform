import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, MapPin, Phone, MessageCircle, Star, ShieldCheck } from 'lucide-react';

interface Business {
    id: number;
    name: string;
    slug: string;
    description: string;
    category: string;
    image_url: string | null;
    contact_phone: string | null;
    contact_whatsapp: string | null;
    status: string;
}

interface Props {
    business: Business;
}

export default function Show({ business }: Props) {
    return (
        <AppLayout>
            <Head title={business.name} />

            <div className="min-h-screen bg-slate-950 pb-32">
                {/* Hero / Header */}
                <div className="relative h-[40vh] bg-slate-800">
                    {business.image_url && (
                        <img src={business.image_url} alt={business.name} className="w-full h-full object-cover opacity-60" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                        <Link href={route('marketplace.index')} className="p-3 bg-black/50 backdrop-blur-md rounded-2xl text-white hover:bg-black/70 transition-colors inline-block">
                            <ChevronLeft size={24} />
                        </Link>
                    </div>
                </div>

                <div className="max-w-xl mx-auto px-6 -mt-32 relative z-10">
                    <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 shadow-2xl">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full mb-3 inline-block">
                                    {business.category}
                                </span>
                                <h1 className="text-3xl font-black text-white tracking-tight">{business.name}</h1>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-1 text-amber-500 mb-1">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-sm font-black">4.8</span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-500">(12 reseñas)</span>
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                            {business.description}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <span className="block text-[10px] font-black text-slate-600 uppercase">Ubicación</span>
                                    <span className="text-xs font-bold text-slate-300">Futaleufú, Región de Los Lagos</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                                    <ShieldCheck size={18} />
                                </div>
                                <div>
                                    <span className="block text-[10px] font-black text-slate-600 uppercase">Verificación</span>
                                    <span className="text-xs font-bold text-emerald-400">Emprendimiento Verificado por Municipio</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="grid grid-cols-2 gap-4">
                            <a 
                                href={`tel:${business.contact_phone}`}
                                className="flex flex-col items-center justify-center p-6 bg-slate-950 border border-slate-800 rounded-[2rem] hover:bg-slate-800 transition-all group"
                            >
                                <Phone className="text-slate-500 group-hover:text-white mb-2" size={24} />
                                <span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest">Llamar</span>
                            </a>
                            <a 
                                href={`https://wa.me/${business.contact_whatsapp}`}
                                target="_blank"
                                className="flex flex-col items-center justify-center p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] hover:bg-emerald-500/10 transition-all group"
                            >
                                <MessageCircle className="text-emerald-500 mb-2" size={24} />
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
