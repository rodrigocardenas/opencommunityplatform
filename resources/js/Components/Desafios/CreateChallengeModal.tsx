import { X } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateChallengeModal({ isOpen, onClose }: ModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        category: 'Infraestructura',
        address: '',
    });

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('desafios.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative">
                <div className="flex justify-between items-center p-5 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-white">Nuevo Desafío</h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-5">
                    <div>
                        <InputLabel htmlFor="title" value="Título del desafío" />
                        <TextInput
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Ej: Bache en la calle principal"
                        />
                        <InputError message={errors.title} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="address" value="Dirección/Ubicación" />
                        <TextInput
                            id="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Ej: Av. Central 123"
                        />
                        <InputError message={errors.address} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="category" value="Categoría" />
                        <select
                            id="category"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-blue-500 transition-colors"
                        >
                            <option value="Infraestructura">Infraestructura</option>
                            <option value="Medio Ambiente">Medio Ambiente</option>
                            <option value="Servicios">Servicios Públicos</option>
                            <option value="Social">Social</option>
                        </select>
                        <InputError message={errors.category} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="description" value="Descripción detallada" />
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-blue-500 transition-colors min-h-[100px] resize-none"
                            placeholder="Describe el problema y por qué es importante resolverlo..."
                        />
                        <InputError message={errors.description} className="mt-1" />
                    </div>

                    <div className="pt-2">
                        <PrimaryButton
                            className="w-full"
                            disabled={processing}
                        >
                            {processing ? 'Publicando...' : 'Publicar Desafío'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
