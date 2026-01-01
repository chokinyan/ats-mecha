import { Link } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Layout from './components/layout/Layout';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
import './assets/css/Home.css';

const App = () => {
	return (
		<Layout>
			<SpeedInsights />
			<div className="home-container">
				{/* Hero Section */}
				<div className="hero-section">
					<h2 className="hero-title">Révisions Mécanique</h2>
					<p className="hero-subtitle">
						Entraînez-vous sur les schémas cinématiques, les
						torseurs et apprenez vos définitions.
					</p>
				</div>

				{/* Modules Grid */}
				<div className="modules-grid">
					{/* Schémas Cinématiques */}
					<Card className="module-card">
						<div className="module-header">
							<h3>Schémas Cinématiques</h3>
							<p className="module-description">
								Identifiez les liaisons à partir de schémas.
							</p>
						</div>
						<div className="module-actions">
							<Link
								to="/schema-cinematique?types=2D"
								style={{ textDecoration: 'none' }}
							>
								<Button
									variant="secondary"
									fullWidth
									className="module-action-button"
								>
									2D
								</Button>
							</Link>
							<Link
								to="/schema-cinematique?types=3D"
								style={{ textDecoration: 'none' }}
							>
								<Button
									variant="secondary"
									fullWidth
									className="module-action-button"
								>
									3D
								</Button>
							</Link>
							<Link
								to="/schema-cinematique?types=2D et 3D"
								style={{ textDecoration: 'none' }}
							>
								<Button
									variant="secondary"
									fullWidth
									className="module-action-button"
								>
									Mixte (2D & 3D)
								</Button>
							</Link>
						</div>
					</Card>

					{/* Torseurs */}
					<Card className="module-card">
						<div className="module-header">
							<h3>Torseurs</h3>
							<p className="module-description">
								Retrouvez les éléments de réduction.
							</p>
						</div>
						<div className="module-actions">
							<Link
								to="/torseurs?type=cinematique"
								style={{ textDecoration: 'none' }}
							>
								<Button
									variant="secondary"
									fullWidth
									className="module-action-button"
								>
									Cinématique
								</Button>
							</Link>
							<Link
								to="/torseurs?type=statique"
								style={{ textDecoration: 'none' }}
							>
								<Button
									variant="secondary"
									fullWidth
									className="module-action-button"
								>
									Statique
								</Button>
							</Link>
							<Link
								to="/torseurs?type=mixte"
								style={{ textDecoration: 'none' }}
							>
								<Button
									variant="secondary"
									fullWidth
									className="module-action-button"
								>
									Mixte
								</Button>
							</Link>
						</div>
					</Card>

					{/* Ressources */}
					<Card className="module-card-full">
						<div className="module-header">
							<h3>Ressources</h3>
							<p className="module-description">
								Fiches de révision et tableaux.
							</p>
						</div>
						<div className="module-actions">
							<Link
								to="/tableau"
								style={{ textDecoration: 'none' }}
							>
								<Button variant="primary" fullWidth>
									Tableau des liaisons
								</Button>
							</Link>
							<div className="disabled-action">
								<Button variant="secondary" fullWidth disabled>
									Questions de khole (Bientôt)
								</Button>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</Layout>
	);
};

export default App;
