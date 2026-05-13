import AppLayout from '@/Layouts/AppLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { User } from 'lucide-react';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AppLayout title="Mi Perfil">
            <Head title="Perfil" />

            <div className="px-5 py-6 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                        <User size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">Configuración</h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Gestiona tu cuenta y seguridad</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm overflow-hidden relative opacity-80">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AppLayout>
    );
}
