import React from 'react';
import '../../assets/css/variables.css';

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
	let bgColor = 'var(--color-primary)';
	let color = '#000000'; // Primary button (white bg) needs black text

	if (variant === 'success') bgColor = 'var(--color-success)';
	if (variant === 'danger') bgColor = 'var(--color-error)';
	if (variant === 'secondary') {
		bgColor = 'var(--color-secondary)'; // Use variable for bg
		color = 'var(--color-text)'; // Keep text variable
	}

	return (
		<button
			className={`ui-button ${className}`}
			style={{
				backgroundColor: bgColor,
				color: color,
				border:
					variant === 'secondary'
						? '1px solid var(--color-border)'
						: 'none',
				borderRadius: 'var(--radius-sm)',
				padding: '0.75rem 1.5rem',
				fontSize: '1rem',
				cursor: 'pointer',
				width: fullWidth ? '100%' : 'auto',
				transition: 'opacity 0.2s',
				...style,
			}}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
