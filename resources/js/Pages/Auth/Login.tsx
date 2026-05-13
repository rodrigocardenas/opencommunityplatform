import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Ingresar" />

            <div className="mb-8 text-center">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Bienvenido de nuevo</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Tu comunidad te está esperando</p>
            </div>

            {status && (
                <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-sm font-black text-emerald-600 dark:text-emerald-400 text-center animate-pulse">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
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
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="tu@correo.com"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                        <InputLabel htmlFor="password" value="Contraseña" className="text-[10px] font-black uppercase tracking-widest text-slate-400" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors"
                            >
                                ¿Olvidaste tu clave?
                            </Link>
                        )}
                    </div>
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
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) =>
                            setData(
                                'remember',
                                (e.target.checked || false) as false,
                            )
                        }
                    />
                    <span className="ms-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                        Recordarme
                    </span>
                </div>

                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50" 
                        disabled={processing}
                    >
                        {processing ? 'Ingresando...' : 'Entrar a la Plataforma'}
                        <LogIn size={18} />
                    </PrimaryButton>
                </div>

                <div className="text-center pt-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        ¿No tienes cuenta?{' '}
                        <Link
                            href={route('register')}
                            className="text-blue-500 font-black hover:text-blue-400 transition-colors"
                        >
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
