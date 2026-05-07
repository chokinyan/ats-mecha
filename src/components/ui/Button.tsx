import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'danger' | 'success';
	fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	fullWidth = false,
	className = '',
	style = {},
	...props
}) => {
	const base =
		'inline-flex items-center justify-center rounded-lg text-base font-semibold transition-all duration-200 active:scale-[0.98]';
	const size = fullWidth ? 'w-full py-3.5' : 'py-2.5 px-5';

	const variantClasses: Record<string, string> = {
		primary: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg hover:from-blue-400 hover:to-indigo-500 border border-indigo-400/20',
		secondary: 'bg-slate-800 text-slate-100 border border-slate-600 shadow-sm hover:bg-slate-700 hover:border-slate-500',
		success: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md hover:shadow-lg hover:from-emerald-400 hover:to-teal-400',
		danger: 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md hover:shadow-lg hover:from-rose-400 hover:to-red-500',
	};

	const disabledCls = props.disabled
		? 'opacity-50 cursor-not-allowed saturate-50'
		: 'hover:-translate-y-0.5';

	return (
		<button
			className={`${base} ${size} ${variantClasses[variant]} ${disabledCls} ${className}`}
			style={{ ...(style as React.CSSProperties) }}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
