import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	fullWidth?: boolean;
}

const Select: React.FC<SelectProps> = ({
	label,
	children,
	fullWidth = false,
	className = '',
	...props
}) => {
	return (
		<div
			className={`flex flex-col gap-2 ${fullWidth ? 'w-full' : 'w-auto'}`}
		>
			{label && (
				<label className="text-sm font-medium text-slate-300">
					{label}
				</label>
			)}
			<select
				className={`bg-slate-800 text-slate-100 border border-slate-700 rounded-md p-3 text-base w-full shadow-sm ${className}`}
				{...props}
			>
				{children}
			</select>
		</div>
	);
};

export default Select;
