import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Camera, MapPin, Save, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

interface Props {
    type: string;
}

export default function Create({ type }: Props) {
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [isLocating, setIsLocating] = useState(false);
    const [isDraftSaved, setIsDraftSaved] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        type: type,
        data: {} as any,
        lat: null as number | null,
        lng: null as number | null,
    });

    const getFormTitle = () => {
        switch (type) {
            case 'demografico': return 'Reporte Demográfico';
            case 'agricola': return 'Producción Agrícola';
            case 'infraestructura': return 'Estado de Infraestructura';
            default: return 'Reporte Comunitario';
        }
    };

    const handleLocation = () => {
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setLocation(coords);
                setData(prev => ({
                    ...prev,
                    lat: coords.lat,
                    lng: coords.lng
                }));
                setIsLocating(false);
            }, (error) => {
                console.error(error);
                setIsLocating(false);
            });
        }
    };

    const saveDraft = () => {
        localStorage.setItem(`draft_${type}_${Date.now()}`, JSON.stringify(data));
        setIsDraftSaved(true);
        setTimeout(() => setIsDraftSaved(false), 3000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('antenas.store'));
    };

    // Sub-forms based on type
    const renderFormFields = () => {
        switch (type) {
            case 'demografico':
                return (
                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="poblacion" value="Población Total Estimada" />
                            <TextInput 
                                id="poblacion" 
                                type="number" 
                                className="mt-1 block w-full" 
                                value={data.data.total || ''}
                                onChange={e => setData('data', { ...data.data, total: e.target.value })}
                            />
                        </div>
                        <div>
                            <InputLabel value="Grupos Etarios Predominantes" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                {['Niños (0-14)', 'Jóvenes (15-29)', 'Adultos (30-64)', 'Mayores (65+)'].map(age => (
                                    <label key={age} className="flex items-center gap-2 p-3 bg-slate-900/50 border border-slate-800 rounded-xl cursor-pointer hover:border-blue-500/50 transition-colors">
                                        <input 
                                            type="checkbox" 
                                            className="rounded bg-slate-950 border-slate-800 text-blue-500 focus:ring-blue-500" 
                                            onChange={e => {
                                                const current = data.data.age_groups || [];
                                                const next = e.target.checked ? [...current, age] : current.filter((a: string) => a !== age);
                                                setData('data', { ...data.data, age_groups: next });
                                            }}
                                        />
                                        <span className="text-xs text-slate-300">{age}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'infraestructura':
                return (
                    <div className="space-y-4">
                        <div>
                            <InputLabel value="Elemento Afectado" />
                            <select 
                                className="mt-1 block w-full bg-slate-950 border-slate-800 rounded-lg text-white text-sm focus:border-blue-500 focus:ring-blue-500"
                                onChange={e => setData('data', { ...data.data, element: e.target.value })}
                            >
                                <option value="">Seleccionar...</option>
                                <option value="caminos">Caminos / Rutas</option>
                                <option value="alumbrado">Alumbrado Público</option>
                                <option value="agua">Red de Agua</option>
                                <option value="electricidad">Tendal Eléctrico</option>
                                <option value="plaza">Espacio Público / Plaza</option>
                            </select>
                        </div>
                        <div>
                            <InputLabel value="Estado de Gravedad" />
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {['Bajo', 'Medio', 'Crítico'].map(lvl => (
                                    <button 
                                        key={lvl}
                                        type="button"
                                        onClick={() => setData('data', { ...data.data, severity: lvl })}
                                        className={`p-2 text-[10px] font-bold rounded-lg border transition-all ${data.data.severity === lvl ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <InputLabel value="Descripción de la Falla" />
                            <textarea 
                                className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white text-sm focus:border-blue-500 min-h-[80px]"
                                onChange={e => setData('data', { ...data.data, description: e.target.value })}
                            />
                        </div>
                    </div>
                );
            case 'agricola':
                return (
                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="cultivo" value="Tipo de Cultivo Principal" />
                            <TextInput 
                                id="cultivo" 
                                className="mt-1 block w-full" 
                                placeholder="Ej: Maíz, Trigo, Uva..."
                                onChange={e => setData('data', { ...data.data, crop: e.target.value })}
                            />
                        </div>
                        <div>
                            <InputLabel value="Estado de la Cosecha" />
                            <select 
                                className="mt-1 block w-full bg-slate-950 border-slate-800 rounded-lg text-white text-sm focus:border-blue-500 focus:ring-blue-500"
                                onChange={e => setData('data', { ...data.data, stage: e.target.value })}
                            >
                                <option>Siembra</option>
                                <option>Crecimiento</option>
                                <option>Cosecha Próxima</option>
                                <option>Finalizado</option>
                            </select>
                        </div>
                        <div>
                            <InputLabel value="Presencia de Plagas" />
                            <div className="flex gap-4 mt-2">
                                {['No', 'Sí'].map(opt => (
                                    <label key={opt} className="flex items-center gap-2 text-xs text-slate-300">
                                        <input 
                                            type="radio" 
                                            name="plagas" 
                                            className="bg-slate-950 border-slate-800 text-blue-500" 
                                            onChange={() => setData('data', { ...data.data, pests: opt === 'Sí' })}
                                        /> {opt}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'ambiental':
                return (
                    <div className="space-y-4">
                        <div>
                            <InputLabel value="Tipo de Alerta Ambiental" />
                            <select 
                                className="mt-1 block w-full bg-slate-950 border-slate-800 rounded-lg text-white text-sm focus:border-blue-500 focus:ring-blue-500"
                                onChange={e => setData('data', { ...data.data, hazard_type: e.target.value })}
                            >
                                <option value="">Seleccionar...</option>
                                <option value="fuego">Riesgo de Incendio</option>
                                <option value="agua">Inundación / Desborde</option>
                                <option value="basura">Microbasural</option>
                                <option value="contaminacion">Olores / Humo</option>
                            </select>
                        </div>
                        <div>
                            <InputLabel value="Nivel de Riesgo Observado" />
                            <input 
                                type="range" min="1" max="5" 
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer mt-4" 
                                onChange={e => setData('data', { ...data.data, risk_level: e.target.value })}
                            />
                            <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1 uppercase">
                                <span>Seguro</span>
                                <span>Moderado</span>
                                <span>Peligro</span>
                            </div>
                        </div>
                    </div>
                );
            case 'social':
                return (
                    <div className="space-y-4">
                        <div>
                            <InputLabel value="Clima Comunitario" />
                            <select 
                                className="mt-1 block w-full bg-slate-950 border-slate-800 rounded-lg text-white text-sm focus:border-blue-500 focus:ring-blue-500"
                                onChange={e => setData('data', { ...data.data, sentiment: e.target.value })}
                            >
                                <option value="positivo">Positivo / Colaborativo</option>
                                <option value="neutral">Estable / Neutral</option>
                                <option value="tenso">Tenso / Conflictivo</option>
                            </select>
                        </div>
                        <div>
                            <InputLabel value="Evento o Necesidad Detectada" />
                            <textarea 
                                className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white text-sm focus:border-blue-500 min-h-[80px]"
                                placeholder="Ej: Asamblea vecinal, falta de transporte escolar..."
                                onChange={e => setData('data', { ...data.data, event_detail: e.target.value })}
                            />
                        </div>
                    </div>
                );
            case 'economico':
                return (
                    <div className="space-y-4">
                        <div>
                            <InputLabel value="Actividad Local" />
                            <select 
                                className="mt-1 block w-full bg-slate-950 border-slate-800 rounded-lg text-white text-sm focus:border-blue-500 focus:ring-blue-500"
                                onChange={e => setData('data', { ...data.data, activity: e.target.value })}
                            >
                                <option value="normal">Actividad Normal</option>
                                <option value="baja">Baja en el Comercio</option>
                                <option value="alta">Alta Demanda / Feria</option>
                            </select>
                        </div>
                        <div>
                            <InputLabel value="Precio de Insumo Básico (Referencia)" />
                            <TextInput 
                                type="number" 
                                className="mt-1 block w-full" 
                                placeholder="Precio Pan / Harina / Combustible"
                                onChange={e => setData('data', { ...data.data, price_ref: e.target.value })}
                            />
                        </div>
                    </div>
                );
            default:
                return (
                    <div>
                        <InputLabel htmlFor="obs" value="Observaciones Generales" />
                        <textarea 
                            id="obs"
                            className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors min-h-[120px]"
                            placeholder="Describe lo observado en el territorio..."
                            onChange={e => setData('data', { ...data.data, observations: e.target.value })}
                        />
                    </div>
                );
        }
    };

    return (
        <AppLayout>
            <Head title={getFormTitle()} />

            <div className="min-h-screen bg-slate-950 pb-32">
                <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-6 sticky top-0 z-40">
                    <div className="max-w-xl mx-auto flex items-center justify-between">
                        <Link href={route('antenas.index')} className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                            <ChevronLeft size={24} />
                        </Link>
                        <h1 className="text-lg font-bold text-white">{getFormTitle()}</h1>
                        <button onClick={saveDraft} className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                            <Save size={20} />
                        </button>
                    </div>
                </div>

                <div className="max-w-xl mx-auto p-5">
                    {isDraftSaved && (
                        <div className="mb-6 bg-blue-500/10 border border-blue-500/20 text-blue-400 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                            <CheckCircle size={20} />
                            <span className="text-xs font-bold uppercase">Borrador guardado localmente</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <section>
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                                Información de Campo
                                <div className="h-px flex-1 bg-slate-800"></div>
                            </h3>
                            {renderFormFields()}
                        </section>

                        <section>
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                                Evidencia Digital
                                <div className="h-px flex-1 bg-slate-800"></div>
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" className="flex flex-col items-center justify-center p-6 bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group">
                                    <Camera className="text-slate-600 group-hover:text-blue-500 mb-2" size={32} />
                                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-blue-400 uppercase">Tomar Foto</span>
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleLocation}
                                    disabled={isLocating}
                                    className={`flex flex-col items-center justify-center p-6 bg-slate-900/50 border border-dashed rounded-2xl transition-all group ${location ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/5'}`}
                                >
                                    <MapPin className={`${location ? 'text-emerald-500' : 'text-slate-600 group-hover:text-blue-500'} mb-2 ${isLocating ? 'animate-bounce' : ''}`} size={32} />
                                    <span className={`text-[10px] font-bold uppercase ${location ? 'text-emerald-400' : 'text-slate-500 group-hover:text-blue-400'}`}>
                                        {isLocating ? 'Ubicando...' : location ? 'Ubicación OK' : 'Capturar GPS'}
                                    </span>
                                </button>
                            </div>
                            {location && (
                                <div className="mt-3 text-center">
                                    <code className="text-[10px] text-emerald-500/80 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                                        Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                                    </code>
                                </div>
                            )}
                        </section>

                        <div className="fixed bottom-0 left-0 w-full p-5 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent z-40">
                            <div className="max-w-xl mx-auto flex gap-4">
                                <button 
                                    type="button"
                                    onClick={saveDraft}
                                    className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl border border-slate-800 hover:bg-slate-800 transition-colors uppercase text-xs tracking-widest"
                                >
                                    Guardar Borrador
                                </button>
                                <PrimaryButton 
                                    className="flex-[2] py-4 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                                    disabled={processing}
                                >
                                    {processing ? 'Enviando...' : (
                                        <span className="flex items-center gap-2">
                                            Enviar Reporte <Send size={16} />
                                        </span>
                                    )}
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
