import { Link } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import Katex from '@matejmazur/react-katex';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import tableau_toseur from '../asset/json/tableau_toseur.json';
import '../assets/css/Tableau.css';

const TorseurDisplay = ({
	type,
	data,
}: {
	type: 'V' | 'T';
	data: number[][]; // 2D array of 0s and 1s
}) => {
	const symbol =
		type === 'V' ? '\\mathcal{V}_{2/1}' : '\\mathcal{T}_{1 \\rightarrow 2}';

	const axes = ['x', 'y', 'z'];
	const staticForces = ['X', 'Y', 'Z'];
	const staticMoments = ['L', 'M', 'N'];

	// Construct the matrix content
	const matrixRows = data.map((row, i) => {
		const col1 =
			row[0] === 1
				? type === 'V'
					? `\\omega_${axes[i]}`
					: `${staticForces[i]}_{1 \\rightarrow 2}`
				: '0';
		const col2 =
			row[1] === 1
				? type === 'V'
					? `v_${axes[i]}`
					: `${staticMoments[i]}_{1 \\rightarrow 2}`
				: '0';
		return `${col1} & ${col2}`;
	});

	const latex = `{ ${symbol} } = \\left\\{ \\begin{matrix} ${matrixRows.join(
		' \\\\ '
	)} \\end{matrix} \\right\\}_{O, (\\vec{x}, \\vec{y}, \\vec{z})}`;

	return <Katex block math={latex} />;
};

const Tableau = () => {
	return (
		<Layout>
			<div className="tableau-container">
				<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
					<Link to="/" style={{ textDecoration: 'none' }}>
						<Button
							variant="secondary"
							style={{
								padding: '0.5rem 1rem',
								fontSize: '0.9rem',
							}}
						>
							← Retour
						</Button>
					</Link>
				</div>
				<div className="tableau-header">
					<h2 className="tableau-title">Tableau des liaisons</h2>
					<p className="tableau-subtitle">
						Toutes les formules cinématiques et statiques.
					</p>
				</div>

				{tableau_toseur.toseurs.map((toseur) => (
					<div key={toseur.nom} className="liaison-row">
						{/* 1. Header: Name & Images */}
						<div className="liaison-info">
							<h3 className="liaison-name">{toseur.nom}</h3>
							<div className="liaison-images">
								<div className="liaison-image-card">
									<div className="liaison-image-label">
										2D
									</div>
									<img
										src={`/asset/tableau/2D/${toseur.Img}.webp`}
										alt=""
										className="liaison-image"
										loading="lazy"
									/>
								</div>
								<div className="liaison-image-card">
									<div className="liaison-image-label">
										3D
									</div>
									<img
										src={`/asset/tableau/3D/${toseur.Img}.webp`}
										alt=""
										className="liaison-image"
										loading="lazy"
									/>
								</div>
							</div>
						</div>

						{/* 2. Formulas */}
						<div className="liaison-formulas">
							{toseur.cinematique && (
								<div>
									<div className="formula-section-title">
										CINÉMATIQUE
									</div>
									<div className="formula-content">
										<TorseurDisplay
											type="V"
											data={toseur.cinematique}
										/>
									</div>
								</div>
							)}
							{toseur.statique && (
								<div>
									<div className="formula-section-title">
										STATIQUE
									</div>
									<div className="formula-content">
										<TorseurDisplay
											type="T"
											data={toseur.statique}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</Layout>
	);
};

export default Tableau;
