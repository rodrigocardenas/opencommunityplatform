import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-lg bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-600 ' +
                className
            }
            ref={localRef}
        />
    );
});
