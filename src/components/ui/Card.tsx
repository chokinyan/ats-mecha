import React from 'react';
import '../../assets/css/variables.css';

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
	return (
		<div
			className={`ui-card ${className}`}
			onClick={onClick}
			style={{
				backgroundColor: 'var(--color-surface)',
				border: '1px solid var(--color-border)',
				borderRadius: 'var(--radius-md)',
				padding: 'var(--spacing-lg)',
				boxShadow: 'var(--shadow-sm)',
				display: 'flex',
				flexDirection: 'column',
				gap: 'var(--spacing-md)',
				transition: 'transform 0.2s, box-shadow 0.2s',
				cursor: onClick ? 'pointer' : 'default',
				...style,
			}}
			onMouseEnter={(e) => {
				if (onClick) {
					e.currentTarget.style.transform = 'translateY(-2px)';
					e.currentTarget.style.boxShadow = 'var(--shadow-md)';
				}
			}}
			onMouseLeave={(e) => {
				if (onClick) {
					e.currentTarget.style.transform = 'none';
					e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
				}
			}}
		>
			{title && (
				<h3
					style={{
						marginTop: 0,
						marginBottom: 0,
						fontSize: '1.25rem',
						fontWeight: 600,
						color: 'var(--color-text)',
						letterSpacing: '-0.01em',
					}}
				>
					{title}
				</h3>
			)}
			{children}
		</div>
	);
};

export default Card;
