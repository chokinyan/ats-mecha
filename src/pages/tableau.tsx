import { Link } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import Katex from '@matejmazur/react-katex';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import tableau_toseur from '../asset/json/tableau_toseur.json';
import qcm_config from '../asset/json/qcm_config.json';

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

	return (
		<div className="katex-white">
			<Katex block math={latex} />
		</div>
	);
};

const Tableau = () => {
	return (
		<Layout>
			<div className="container-wide flex flex-col gap-6">
				<div className="flex justify-start">
					<Link to="/" className="block">
						<Button
							variant="secondary"
							className="text-sm py-2 px-3"
						>
							← Retour
						</Button>
					</Link>
				</div>

				<div className="text-center">
					<h2 className="text-2xl font-extrabold text-slate-100">
						Tableau des liaisons
					</h2>
					<p className="text-sm text-slate-300">
						Toutes les formules cinématiques et statiques.
					</p>
				</div>

				<div className="flex flex-col gap-8">
					{tableau_toseur.toseurs.map((toseur) => {
						// Trouver la config correspondante dans qcm_config
						const config = qcm_config.types_liaisons.find(
							(c) => c.nom === toseur.nom
						);

						return (
							<div
								key={toseur.nom}
								className="pt-8 border-t border-slate-700 flex flex-col gap-6"
							>
								{/* En-tête : Titre + Description */}
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-3">
										<h3 className="text-2xl font-bold text-slate-100">
											{toseur.nom}
										</h3>
										{config && (
											<span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm font-bold px-3 py-1 rounded-full">
												{config.degres_liberte} DDL
											</span>
										)}
									</div>
									{config && (
										<p className="text-slate-300 text-lg">
											{config.description}
										</p>
									)}
								</div>

								{/* Grille principale : Images / Mouvements / Torseurs */}
								<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
									{/* Colonne 1 : Images (Prend 5/12 de la largeur) */}
									<div className="lg:col-span-5 flex flex-col gap-4">
										<div className="grid grid-cols-2 gap-4">
											<div className="bg-slate-200 border border-slate-300 rounded-xl p-4 flex flex-col justify-center text-center shadow-md">
												<div className="text-sm font-bold text-slate-700 uppercase mb-3">
													2D
												</div>
												<img
													src={`/asset/tableau/2D/${toseur.Img}.webp`}
													alt={`Schéma 2D ${toseur.nom}`}
													className="mx-auto w-full h-auto max-h-48 object-contain mix-blend-multiply"
													loading="lazy"
												/>
											</div>
											<div className="bg-slate-200 border border-slate-300 rounded-xl p-4 flex flex-col justify-center text-center shadow-md">
												<div className="text-sm font-bold text-slate-700 uppercase mb-3">
													3D
												</div>
												<img
													src={`/asset/tableau/3D/${toseur.Img}.webp`}
													alt={`Schéma 3D ${toseur.nom}`}
													className="mx-auto w-full h-auto max-h-48 object-contain mix-blend-multiply"
													loading="lazy"
												/>
											</div>
										</div>

										{config && (
											<div className="text-sm text-slate-300 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 shadow-sm mt-2">
												<span className="font-semibold text-slate-200">
													Exemples :{' '}
												</span>
												{config.exemple}
											</div>
										)}
									</div>

									{/* Colonne 2 : Mouvements (Prend 3/12) */}
									<div className="lg:col-span-3 flex flex-col gap-6 bg-slate-800/30 p-5 rounded-xl border border-slate-700/30">
										{config && (
											<>
												<div>
													<div className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
														Mouvements possibles
													</div>
													<ul className="flex flex-col gap-3">
														{config.mouvements_possibles.map((m, idx) => (
															<li
																key={idx}
																className="flex items-start gap-3 text-sm text-emerald-400 font-medium"
															>
																<span className="mt-0.5 text-emerald-500 text-lg leading-none">
																	✓
																</span>
																<span className="leading-tight">{m}</span>
															</li>
														))}
													</ul>
												</div>
												<div className="w-full h-px bg-slate-700/50 my-1"></div>
												<div>
													<div className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
														Mouvements bloqués
													</div>
													<ul className="flex flex-col gap-3">
														{config.mouvements_bloques.map((m, idx) => (
															<li
																key={idx}
																className="flex items-start gap-3 text-sm text-red-400 font-medium"
															>
																<span className="mt-0.5 text-red-500 text-lg leading-none">
																	✗
																</span>
																<span className="leading-tight">{m}</span>
															</li>
														))}
													</ul>
												</div>
											</>
										)}
									</div>

									{/* Colonne 3 : Torseurs (Prend 4/12) */}
									<div className="lg:col-span-4 flex flex-col gap-5">
										{toseur.cinematique && (
											<div>
												<div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider pl-1">
													Torseur Cinématique
												</div>
												<div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-5 rounded-xl overflow-x-auto flex justify-center shadow-inner">
													<TorseurDisplay
														type="V"
														data={toseur.cinematique}
													/>
												</div>
											</div>
										)}
										{toseur.statique && (
											<div>
												<div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider pl-1">
													Torseur Statique
												</div>
												<div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-5 rounded-xl overflow-x-auto flex justify-center shadow-inner">
													<TorseurDisplay
														type="T"
														data={toseur.statique}
													/>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Layout>
	);
};

export default Tableau;
