import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/variables.css';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="app-layout">
			<header
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: 'var(--spacing-sm) 0',
					background: 'var(--color-surface)',
					boxShadow: 'var(--shadow-sm)',
					marginBottom: 'var(--spacing-md)',
				}}
			>
				<Link
					to="/"
					style={{
						textDecoration: 'none',
						color: 'var(--color-text)',
					}}
				>
					<h1
						style={{
							marginBottom: 0,
							fontWeight: 800,
							letterSpacing: '-0.025em',
							fontSize: '1.75rem',
						}}
					>
						Révisions Méca ATS
					</h1>
				</Link>
			</header>

			<main
				style={{
					maxWidth: '1000px',
					margin: '0 auto',
					padding: '0 var(--spacing-md)',
					minHeight: '80vh',
				}}
			>
				{children}
			</main>

			<footer
				style={{
					textAlign: 'center',
					padding: 'var(--spacing-xl) 0',
					color: 'var(--color-text-muted)',
					fontSize: '0.9rem',
					marginTop: 'var(--spacing-xl)',
				}}
			>
				<p>
					Projet réalisé à des fins pédagogiques. Inspiré de l'app «
					Liaison? ».
				</p>
			</footer>
		</div>
	);
};

export default Layout;
