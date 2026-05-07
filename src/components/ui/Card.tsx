import React from 'react';

interface CardProps {
	children: React.ReactNode;
	title?: string;
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
	children,
	title,
	className = '',
	style = {},
	onClick,
}) => {
	const base =
		'bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 shadow-lg flex flex-col gap-4 relative overflow-hidden';
	const interactive = onClick
		? 'cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:bg-slate-800/90 transition-all duration-300'
		: '';

	return (
		<div
			className={`${base} ${interactive} ${className}`}
			onClick={onClick}
			style={style}
		>
			{title && (
				<h3 className="m-0 text-lg font-semibold text-slate-100 -tracking-[0.01em]">
					{title}
				</h3>
			)}
			{children}
		</div>
	);
};

export default Card;
