import { Link } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Layout from './components/layout/Layout';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
// Using Tailwind for styling; legacy CSS removed

const App = () => {
	return (
		<Layout>
			<SpeedInsights />
			<div className="container-center flex flex-col gap-8">
				{/* Hero Section */}
				<div className="text-center py-8">
					<h2 className="text-4xl font-extrabold mb-2 text-slate-100">
						Révisions Mécanique
					</h2>
					<p className="text-lg text-slate-300 max-w-2xl mx-auto">
						Entraînez-vous sur les schémas cinématiques, les
						torseurs et apprenez vos définitions.
					</p>
				</div>

				{/* Modules Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Schémas Cinématiques */}
					<Card className="">
						<div>
							<h3 className="text-lg font-semibold text-slate-100">
								Schémas Cinématiques
							</h3>
							<p className="text-sm text-slate-300">
								Identifiez les liaisons à partir de schémas.
							</p>
						</div>
						<div className="mt-4 flex flex-col gap-3">
							<Link
								to="/schema-cinematique?types=2D"
								className="block"
							>
								<Button variant="secondary" fullWidth>
									2D
								</Button>
							</Link>
							<Link
								to="/schema-cinematique?types=3D"
								className="block"
							>
								<Button variant="secondary" fullWidth>
									3D
								</Button>
							</Link>
							<Link
								to="/schema-cinematique?types=2D et 3D"
								className="block"
							>
								<Button variant="secondary" fullWidth>
									Mixte (2D &amp; 3D)
								</Button>
							</Link>
						</div>
					</Card>

					{/* Torseurs */}
					<Card>
						<div>
							<h3 className="text-lg font-semibold text-slate-100">
								Torseurs
							</h3>
							<p className="text-sm text-slate-300">
								Retrouvez les éléments de réduction.
							</p>
						</div>
						<div className="mt-4 flex flex-col gap-3">
							<Link
								to="/torseurs?type=cinematique"
								className="block"
							>
								<Button variant="secondary" fullWidth>
									Cinématique
								</Button>
							</Link>
							<Link
								to="/torseurs?type=statique"
								className="block"
							>
								<Button variant="secondary" fullWidth>
									Statique
								</Button>
							</Link>
							<Link to="/torseurs?type=mixte" className="block">
								<Button variant="secondary" fullWidth>
									Mixte
								</Button>
							</Link>
						</div>
					</Card>

					{/* Ressources */}
					<Card className="col-span-1 md:col-span-2">
						<div>
							<h3 className="text-lg font-semibold text-slate-100">
								Ressources
							</h3>
							<p className="text-sm text-slate-300">
								Fiches de révision et tableaux.
							</p>
						</div>
						<div className="mt-4 flex flex-col gap-3">
							<Link to="/tableau" className="block">
								<Button variant="primary" fullWidth>
									Tableau des liaisons
								</Button>
							</Link>
							<Link to="/fiche-bilan" className="block">
								<Button variant="primary" fullWidth>
									📐 Fiche Bilan — Liens entre Torseurs
								</Button>
							</Link>
						</div>
					</Card>
				</div>
			</div>
		</Layout>
	);
};

export default App;
