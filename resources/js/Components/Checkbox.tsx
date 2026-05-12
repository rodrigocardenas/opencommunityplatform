import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded bg-slate-950 border-slate-800 text-blue-600 shadow-sm focus:ring-blue-500 focus:ring-offset-slate-900 ' +
                className
            }
        />
    );
}
