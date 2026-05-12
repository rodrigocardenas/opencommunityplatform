import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:from-blue-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-95 ${
                    disabled && 'opacity-50 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
