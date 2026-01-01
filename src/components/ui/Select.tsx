import React from 'react';
import '../../assets/css/variables.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	fullWidth?: boolean;
}

const Select: React.FC<SelectProps> = ({
	label,
	children,
	fullWidth = false,
	className = '',
	style = {},
	...props
}) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
				width: fullWidth ? '100%' : 'auto',
			}}
		>
			{label && (
				<label
					style={{
						fontSize: '0.9rem',
						fontWeight: 500,
						color: 'var(--color-text-muted)',
					}}
				>
					{label}
				</label>
			)}
			<select
				className={className}
				style={{
					backgroundColor: 'var(--color-surface)',
					color: 'var(--color-text)',
					border: '1px solid var(--color-border)',
					borderRadius: 'var(--radius-sm)',
					padding: '0.75rem',
					fontSize: '1rem',
					cursor: 'pointer',
					width: '100%',
					boxShadow: 'var(--shadow-sm)',
					appearance: 'none', // Remove default arrow in some browsers for custom feel, but simple is better
					backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111827%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'right 0.7rem top 50%',
					backgroundSize: '0.65rem auto',
					paddingRight: '2.5rem',
					...style,
				}}
				{...props}
			>
				{children}
			</select>
		</div>
	);
};

export default Select;
