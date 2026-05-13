import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Registrarse" />

            <div className="mb-8 text-center">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Únete a la Red</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Sé parte del cambio en Futaleufú</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div className="space-y-1.5">
                    <InputLabel htmlFor="name" value="Nombre Completo" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1" />
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                            <User size={18} />
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-full pl-11 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-blue-500 focus:border-blue-500 rounded-2xl h-12 transition-all font-medium"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            placeholder="Juan Pérez"
                        />
                    </div>
                    <InputError message={errors.name} className="mt-1" />
                </div>

                <div className="space-y-1.5">
                    <InputLabel htmlFor="email" value="Correo Electrónico" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1" />
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                            <Mail size={18} />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full pl-11 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-blue-500 focus:border-blue-500 rounded-2xl h-12 transition-all font-medium"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            placeholder="tu@correo.com"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div className="space-y-1.5">
                    <InputLabel htmlFor="password" value="Contraseña" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1" />
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                            <Lock size={18} />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full pl-11 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-blue-500 focus:border-blue-500 rounded-2xl h-12 transition-all font-medium"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="space-y-1.5">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1" />
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                            <Lock size={18} />
                        </div>
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full pl-11 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-blue-500 focus:border-blue-500 rounded-2xl h-12 transition-all font-medium"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1"
                    />
                </div>

                <div className="pt-4">
                    <PrimaryButton 
                        className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50" 
                        disabled={processing}
                    >
                        {processing ? 'Registrando...' : 'Crear Mi Cuenta'}
                        <UserPlus size={18} />
                    </PrimaryButton>
                </div>

                <div className="text-center pt-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        ¿Ya tienes cuenta?{' '}
                        <Link
                            href={route('login')}
                            className="text-blue-500 font-black hover:text-blue-400 transition-colors"
                        >
                            Ingresa aquí
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
