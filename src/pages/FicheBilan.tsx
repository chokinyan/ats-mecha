import { Link } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import Katex from '@matejmazur/react-katex';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

/* ─────────────────────────────────────────────
   Petit composant utilitaire : bloc de formule
───────────────────────────────────────────── */
const Formula = ({ math, block = true }: { math: string; block?: boolean }) => (
	<div className="my-2 overflow-x-auto text-slate-100">
		<Katex block={block} math={math} />
	</div>
);

/* ─────────────────────────────────────────────
   Section avec titre numéroté + trait
───────────────────────────────────────────── */
const Section = ({
	num,
	title,
	color,
	children,
}: {
	num: string;
	title: string;
	color: string;
	children: React.ReactNode;
}) => (
	<div className={`border-l-4 ${color} pl-4 py-1`}>
		<div className="flex items-center gap-2 mb-3">
			<span
				className={`text-xs font-bold px-2 py-0.5 rounded ${color.replace('border-', 'bg-').replace('-500', '-900')} ${color.replace('border-', 'text-').replace('-900', '-400')}`}
			>
				{num}
			</span>
			<h2 className="text-xl font-bold text-slate-100">{title}</h2>
		</div>
		{children}
	</div>
);

/* ─────────────────────────────────────────────
   Flèche de transition entre deux torseurs
───────────────────────────────────────────── */
const Arrow = ({ label }: { label: string }) => (
	<div className="flex flex-col items-center my-2 gap-1">
		<div className="w-px h-5 bg-slate-500" />
		<div className="flex items-center gap-2">
			<div className="w-12 h-px bg-slate-500" />
			<span className="text-xs text-slate-400 italic px-2">{label}</span>
			<div className="w-12 h-px bg-slate-500" />
		</div>
		<div
			className="w-0 h-0"
			style={{
				borderLeft: '6px solid transparent',
				borderRight: '6px solid transparent',
				borderTop: '8px solid #64748b',
			}}
		/>
	</div>
);

/* ─────────────────────────────────────────────
   Boîte torseur (affichage visuel)
───────────────────────────────────────────── */
const TorseurBox = ({
	label,
	color,
	children,
}: {
	label: string;
	color: string;
	children: React.ReactNode;
}) => (
	<div className={`rounded-lg border ${color} bg-slate-900 p-4 my-2`}>
		<div
			className={`text-xs font-bold uppercase mb-2 ${color.replace('border-', 'text-')}`}
		>
			{label}
		</div>
		{children}
	</div>
);

/* ─────────────────────────────────────────────
   Composant principal
───────────────────────────────────────────── */
const FicheBilan = () => {
	return (
		<Layout>
			<div className="container-center flex flex-col gap-8 pb-12">
				{/* En-tête */}
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
					<h1 className="text-3xl font-extrabold text-slate-100 mb-2">
						Liens entre les Torseurs
					</h1>
					<p className="text-slate-400 max-w-2xl mx-auto text-sm">
						Fiche de bilan — comprendre comment passer du torseur
						cinématique au torseur dynamique, cinétique et des
						actions mécaniques, de façon progressive et structurée.
					</p>
				</div>

				{/* Schéma de navigation */}
				<div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
					<p className="text-xs text-slate-400 uppercase font-bold mb-3">
						Vue d'ensemble — fil conducteur
					</p>
					<div className="flex flex-col items-center gap-0 text-sm">
						<div className="bg-blue-900 border border-blue-500 text-blue-200 rounded px-4 py-2 font-semibold">
							Torseur Cinématique <Katex math="\{V(S/R)\}" />
						</div>
						<Arrow label="dériver → masse × ..." />
						<div className="bg-emerald-900 border border-emerald-500 text-emerald-200 rounded px-4 py-2 font-semibold">
							Torseur Cinétique <Katex math="\{D(S/R)\}" />
						</div>
						<Arrow label="dériver par rapport au temps" />
						<div className="bg-orange-900 border border-orange-500 text-orange-200 rounded px-4 py-2 font-semibold">
							Torseur Dynamique <Katex math="\{\Delta(S/R)\}" />
						</div>
						<Arrow label="principe fondamental (PFD)" />
						<div className="bg-purple-900 border border-purple-500 text-purple-200 rounded px-4 py-2 font-semibold">
							Torseur des Actions Mécaniques{' '}
							<Katex math="\{T_{Ext \to S}\}" />
						</div>
						<Arrow label="⊗ produit hémi-symétrique" />
						<div className="bg-rose-900 border border-rose-500 text-rose-200 rounded px-4 py-2 font-semibold">
							Puissance
						</div>
					</div>
				</div>

				{/* ── 1. TORSEUR CINÉMATIQUE ── */}
				<Section
					num="1"
					title="Torseur Cinématique {V(S/R)}"
					color="border-blue-500"
				>
					<p className="text-slate-300 text-sm mb-3">
						C'est le torseur qui décrit le{' '}
						<strong>mouvement</strong> d'un solide S par rapport à
						un référentiel R. Il contient la vitesse de rotation et
						la vitesse d'un point du solide.
					</p>
					<TorseurBox label="Définition" color="border-blue-700">
						<Formula math="\{V(S/R)\} = \left\{ \begin{matrix} \vec{\Omega}(S/R) \\ \vec{V}(O, S/R) \end{matrix} \right\}_O = \begin{pmatrix} \omega_x & v_x \\ \omega_y & v_y \\ \omega_z & v_z \end{pmatrix}_{(O,\,\vec{x},\vec{y},\vec{z})}" />
					</TorseurBox>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
						<div className="bg-slate-800 rounded-lg p-3 text-sm text-slate-300">
							<span className="text-blue-400 font-semibold">
								<Katex math="\vec{\Omega}(S/R)" />
							</span>{' '}
							— Vecteur vitesse <strong>de rotation</strong>{' '}
							instantanée de S par rapport à R (en rad/s).
						</div>
						<div className="bg-slate-800 rounded-lg p-3 text-sm text-slate-300">
							<span className="text-blue-400 font-semibold">
								<Katex math="\vec{V}(O, S/R)" />
							</span>{' '}
							— Vecteur vitesse <strong>de translation</strong> du
							point O appartenant à S, par rapport à R (en m/s).
						</div>
					</div>
					<div className="bg-slate-800 rounded-lg p-3 mt-3 text-sm text-slate-300 border-l-2 border-blue-400">
						<strong className="text-blue-300">
							Changement de point :
						</strong>{' '}
						Pour passer du moment en A au moment en B :
						<Formula math="\vec{V}(B, S/R) = \vec{V}(A, S/R) + \vec{\Omega}(S/R) \wedge \overrightarrow{AB}" />
					</div>
				</Section>

				{/* ── 2. TORSEUR CINÉTIQUE ── */}
				<Section
					num="2"
					title="Torseur Cinétique {D(S/R)}"
					color="border-emerald-500"
				>
					<p className="text-slate-300 text-sm mb-3">
						Le torseur cinétique quantifie la{' '}
						<strong>quantité de mouvement</strong> (translation) et
						la quantité de mouvement de rotation d'un solide. Il est
						directement construit à partir du torseur cinématique.
					</p>
					<TorseurBox label="Définition" color="border-emerald-700">
						<Formula math="\{D(S/R)\} = \left\{ \begin{matrix} \vec{p}(S/R) \\ \vec{\sigma}(A, S/R) \end{matrix} \right\}_A" />
					</TorseurBox>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
						<div className="bg-slate-800 rounded-lg p-3 text-sm text-slate-300">
							<span className="text-emerald-400 font-semibold">
								Résultante cinétique :
							</span>
							<Formula math="\vec{p}(S/R) = m \cdot \vec{V}(G, S/R)" />
							<span className="text-xs text-slate-400">
								m : masse du solide, G : centre de gravité
							</span>
						</div>
						<div className="bg-slate-800 rounded-lg p-3 text-sm text-slate-300">
							<span className="text-emerald-400 font-semibold">
								Moment cinétique en A :
							</span>
							<Formula math="\vec{\sigma}(A, S/R) = \overrightarrow{AG} \wedge m\,\vec{V}(G,S/R) + \overline{\overline{I}}(A,S)\,\vec{\Omega}(S/R)" />
							<span className="text-xs text-slate-400">
								<Katex math="\overline{\overline{I}}(A,S)" /> :
								matrice d'inertie en A
							</span>
						</div>
					</div>

					<div className="bg-slate-800 rounded-lg p-3 mt-3 text-sm text-slate-300 border-l-2 border-emerald-400">
						<strong className="text-emerald-300">
							Énergie cinétique :
						</strong>
						<Formula math="E_c(S/R) = \frac{1}{2}\,\{D(S/R)\} \otimes \{V(S/R)\}" />
						<Formula math="E_c(S/R) = \frac{1}{2}\left(\vec{\Omega}(S/R) \cdot \vec{\sigma}(G,S/R) + \vec{p}(S/R) \cdot \vec{V}(G,S/R)\right)" />
						<p className="text-xs text-slate-400 mt-1">
							Le produit hémi-symétrique ⊗ entre deux torseurs
							donne un scalaire.
						</p>
					</div>
				</Section>

				{/* ── 3. TORSEUR DYNAMIQUE ── */}
				<Section
					num="3"
					title="Torseur Dynamique {Δ(S/R)}"
					color="border-orange-500"
				>
					<p className="text-slate-300 text-sm mb-3">
						Le torseur dynamique est la{' '}
						<strong>
							dérivée par rapport au temps du torseur cinétique
						</strong>{' '}
						dans le référentiel R. Il représente les efforts
						nécessaires pour modifier le mouvement du solide.
					</p>
					<TorseurBox label="Définition" color="border-orange-700">
						<Formula math="\{\Delta(S/R)\} = \frac{d}{dt}\{D(S/R)\}\bigg|_R = \left\{ \begin{matrix} \vec{R}_{dyn} \\ \vec{M}_{dyn}(A) \end{matrix} \right\}_A" />
					</TorseurBox>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
						<div className="bg-slate-800 rounded-lg p-3 text-sm text-slate-300">
							<span className="text-orange-400 font-semibold">
								Résultante dynamique :
							</span>
							<Formula math="\vec{R}_{dyn} = \frac{d\vec{p}}{dt}\bigg|_R = m\,\vec{a}(G, S/R)" />
							<span className="text-xs text-slate-400">
								Force nécessaire pour modifier la translation
							</span>
						</div>
						<div className="bg-slate-800 rounded-lg p-3 text-sm text-slate-300">
							<span className="text-orange-400 font-semibold">
								Moment dynamique :
							</span>
							<Formula math="\vec{M}_{dyn}(A) = \frac{d\vec{\sigma}(A,S/R)}{dt}\bigg|_R" />
							<span className="text-xs text-slate-400">
								Couple nécessaire pour modifier la rotation
							</span>
						</div>
					</div>
				</Section>

				{/* ── 4. TORSEUR DES ACTIONS MÉCANIQUES ── */}
				<Section
					num="4"
					title="Torseur des Actions Mécaniques {T}"
					color="border-purple-500"
				>
					<p className="text-slate-300 text-sm mb-3">
						C'est le torseur qui représente l'ensemble des{' '}
						<strong>forces et moments extérieurs</strong> exercés
						sur un solide. Pour une liaison, il représente les
						efforts de la liaison.
					</p>
					<TorseurBox label="Définition" color="border-purple-700">
						<Formula math="\{T_{Ext \to S}\} = \left\{ \begin{matrix} \vec{R} \\ \vec{M}(A) \end{matrix} \right\}_A = \begin{pmatrix} X & L \\ Y & M \\ Z & N \end{pmatrix}_{(A,\,\vec{x},\vec{y},\vec{z})}" />
					</TorseurBox>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
						<div className="bg-slate-800 rounded-lg p-3 text-sm text-slate-300">
							<span className="text-purple-400 font-semibold">
								Résultante{' '}
								<Katex math="\vec{R} = X\vec{x} + Y\vec{y} + Z\vec{z}" />{' '}
								:
							</span>
							<p className="mt-1 text-xs">
								X, Y, Z sont les{' '}
								<strong>composantes de force</strong> selon les
								trois axes. Les composantes nulles correspondent
								aux degrés de liberté en translation.
							</p>
						</div>
						<div className="bg-slate-800 rounded-lg p-3 text-sm text-slate-300">
							<span className="text-purple-400 font-semibold">
								Moment{' '}
								<Katex math="\vec{M}(A) = L\vec{x} + M\vec{y} + N\vec{z}" />{' '}
								:
							</span>
							<p className="mt-1 text-xs">
								L, M, N sont les{' '}
								<strong>composantes de moment</strong>. Les
								composantes nulles correspondent aux degrés de
								liberté en rotation.
							</p>
						</div>
					</div>
					<div className="bg-slate-800 rounded-lg p-3 mt-3 text-sm text-slate-300 border-l-2 border-purple-400">
						<strong className="text-purple-300">
							Lien avec le torseur cinématique :
						</strong>{' '}
						Pour une liaison parfaite, les composantes non nulles du
						TAM correspondent aux <em>composantes nulles</em> du
						torseur cinématique (et vice-versa).
						<div className="mt-2 grid grid-cols-2 gap-2 text-xs">
							<div className="bg-purple-950 rounded p-2">
								<span className="text-purple-300">
									TCin = 0 selon axe x
								</span>
								<br />→ Bloqué en translation/rotation
								<br />→{' '}
								<span className="text-orange-300">
									TAM ≠ 0 (X ou L ≠ 0)
								</span>
							</div>
							<div className="bg-purple-950 rounded p-2">
								<span className="text-purple-300">
									TCin ≠ 0 selon axe x
								</span>
								<br />→ Libre en translation/rotation
								<br />→{' '}
								<span className="text-emerald-300">
									TAM = 0 (X ou L = 0)
								</span>
							</div>
						</div>
					</div>
				</Section>

				{/* ── 5. PUISSANCES ── */}
				<Section num="5" title="Puissances" color="border-rose-500">
					<p className="text-slate-300 text-sm mb-3">
						La puissance se calcule via le{' '}
						<strong>produit hémi-symétrique (dualité)</strong> entre
						le torseur des actions mécaniques et le torseur
						cinématique.
					</p>

					<div className="flex flex-col gap-3">
						<TorseurBox
							label="Puissance extérieure"
							color="border-rose-700"
						>
							<Formula math="\mathcal{P}_{Ext \to S/R} = \{T_{Ext \to S}\} \otimes \{V(S/R)\}" />
							<Formula math="= \vec{R} \cdot \vec{V}(A, S/R) + \vec{M}(A) \cdot \vec{\Omega}(S/R)" />
							<p className="text-xs text-slate-400 mt-1">
								Scalaire — indépendant du point A choisi.
							</p>
						</TorseurBox>

						<TorseurBox
							label="Puissance intérieure (entre Si et Sj)"
							color="border-rose-800"
						>
							<Formula math="\mathcal{P}_{int}(S_i / S_j) = \{T_{S_i \to S_j}\} \otimes \{V(S_j/S_i)\}" />
							<div className="bg-slate-900 rounded p-2 mt-2 text-xs text-slate-300">
								<strong className="text-rose-300">
									Liaison parfaite :
								</strong>{' '}
								<Katex math="\mathcal{P}_{int} = 0" /> pour tout
								mouvement compatible avec la liaison.
								<br />
								<span className="text-slate-400">
									→ Pas de dissipation d'énergie dans la
									liaison.
								</span>
							</div>
						</TorseurBox>

						<div className="bg-slate-800 rounded-lg p-3 text-sm border-l-2 border-rose-400">
							<strong className="text-rose-300">
								Signe de la puissance :
							</strong>
							<div className="grid grid-cols-3 gap-2 mt-2 text-xs text-center">
								<div className="bg-emerald-950 rounded p-2">
									<span className="text-emerald-400 font-bold">
										P &gt; 0
									</span>
									<br />
									Action motrice
								</div>
								<div className="bg-red-950 rounded p-2">
									<span className="text-red-400 font-bold">
										P &lt; 0
									</span>
									<br />
									Action réceptrice
								</div>
								<div className="bg-slate-700 rounded p-2">
									<span className="text-slate-300 font-bold">
										P = 0
									</span>
									<br />
									Liaison parfaite
								</div>
							</div>
						</div>
					</div>
				</Section>

				{/* ── 6. PFD / ÉQUATION FONDAMENTALE ── */}
				<Section
					num="6"
					title="Principe Fondamental de la Dynamique (PFD)"
					color="border-yellow-500"
				>
					<p className="text-slate-300 text-sm mb-3">
						C'est le lien qui relie le{' '}
						<strong>
							torseur dynamique au torseur des actions mécaniques
						</strong>
						. C'est l'équivalent de Newton (F = ma) mais en version
						torseur.
					</p>
					<TorseurBox
						label="Équation fondamentale"
						color="border-yellow-700"
					>
						<Formula math="\{\Delta(S/R_0)\} = \sum \{T_{Ext \to S}\}" />
						<p className="text-xs text-slate-400 mt-1">
							En projection sur les axes, cela donne 6 équations
							scalaires (3 en résultante + 3 en moment).
						</p>
					</TorseurBox>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-sm text-slate-300">
						<div className="bg-slate-800 rounded-lg p-3">
							<span className="text-yellow-400 font-semibold">
								Résultante :
							</span>
							<Formula math="m\,\vec{a}(G) = \sum \vec{F}_{ext}" />
						</div>
						<div className="bg-slate-800 rounded-lg p-3">
							<span className="text-yellow-400 font-semibold">
								Moment en G :
							</span>
							<Formula math="\frac{d\vec{\sigma}(G)}{dt}\bigg|_{R_0} = \sum \vec{M}_{ext}(G)" />
						</div>
					</div>
				</Section>

				{/* ── 7. THÉORÈME DE L'ÉNERGIE CINÉTIQUE ── */}
				<Section
					num="7"
					title="Théorème de l'Énergie Cinétique (TEC)"
					color="border-cyan-500"
				>
					<p className="text-slate-300 text-sm mb-3">
						Le TEC est une <strong>forme scalaire</strong> du PFD.
						Il relie la variation d'énergie cinétique à la somme des
						puissances.
					</p>
					<TorseurBox label="Théorème" color="border-cyan-700">
						<Formula math="\frac{dE_c(S/R_0)}{dt} = \mathcal{P}_{ext}(S/R_0) + \mathcal{P}_{int}" />
					</TorseurBox>
					<div className="bg-slate-800 rounded-lg p-3 mt-3 text-sm text-slate-300 border-l-2 border-cyan-400">
						<strong className="text-cyan-300">
							Cas simplifié :
						</strong>{' '}
						Si toutes les liaisons sont parfaites (P_int = 0) et le
						bâti est fixe :
						<Formula math="\frac{dE_c}{dt} = \mathcal{P}_{ext}" />
					</div>
				</Section>

				{/* ── RÉCAPITULATIF ── */}
				<div className="bg-slate-800 border border-slate-600 rounded-xl p-5">
					<h2 className="text-lg font-bold text-slate-100 mb-4">
						🗺️ Récapitulatif — Comment passer de l'un à l'autre
					</h2>
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left">
							<thead>
								<tr className="border-b border-slate-600">
									<th className="py-2 pr-4 text-slate-400 font-semibold">
										De
									</th>
									<th className="py-2 pr-4 text-slate-400 font-semibold">
										À
									</th>
									<th className="py-2 text-slate-400 font-semibold">
										Comment
									</th>
								</tr>
							</thead>
							<tbody className="text-slate-300">
								<tr className="border-b border-slate-700">
									<td className="py-2 pr-4 text-blue-400 font-medium">
										TCin {'{V}'}
									</td>
									<td className="py-2 pr-4 text-emerald-400 font-medium">
										TCinétique {'{D}'}
									</td>
									<td className="py-2">
										Multiplier par la masse (
										<Katex math="m\,\vec{V}(G)" />) +
										matrice d'inertie
									</td>
								</tr>
								<tr className="border-b border-slate-700">
									<td className="py-2 pr-4 text-emerald-400 font-medium">
										TCinétique {'{D}'}
									</td>
									<td className="py-2 pr-4 text-orange-400 font-medium">
										TDynamique {'{Δ}'}
									</td>
									<td className="py-2">
										Dériver par rapport au temps dans R₀ :{' '}
										<Katex math="\frac{d}{dt}\{D\}|_{R_0}" />
									</td>
								</tr>
								<tr className="border-b border-slate-700">
									<td className="py-2 pr-4 text-orange-400 font-medium">
										TDynamique {'{Δ}'}
									</td>
									<td className="py-2 pr-4 text-purple-400 font-medium">
										TAM {'{T}'}
									</td>
									<td className="py-2">
										PFD :{' '}
										<Katex math="\{\Delta\} = \sum\{T_{ext}\}" />
									</td>
								</tr>
								<tr className="border-b border-slate-700">
									<td className="py-2 pr-4 text-purple-400 font-medium">
										TAM {'{T}'}
									</td>
									<td className="py-2 pr-4 text-rose-400 font-medium">
										Puissance P
									</td>
									<td className="py-2">
										Produit hémi-symétrique :{' '}
										<Katex math="\{T\} \otimes \{V(S/R)\}" />
									</td>
								</tr>
								<tr className="border-b border-slate-700">
									<td className="py-2 pr-4 text-blue-400 font-medium">
										TCin {'{V}'} point A
									</td>
									<td className="py-2 pr-4 text-blue-400 font-medium">
										TCin {'{V}'} point B
									</td>
									<td className="py-2">
										<Katex math="\vec{V}(B) = \vec{V}(A) + \vec{\Omega} \wedge \overrightarrow{AB}" />
									</td>
								</tr>
								<tr>
									<td className="py-2 pr-4 text-emerald-400 font-medium">
										TCinétique {'{D}'}
									</td>
									<td className="py-2 pr-4 text-cyan-400 font-medium">
										Énergie cinétique Ec
									</td>
									<td className="py-2">
										<Katex math="E_c = \frac{1}{2}\{D\} \otimes \{V\}" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				{/* Navigation */}
				<div className="flex justify-center">
					<Link to="/tableau">
						<Button variant="primary">
							Voir le tableau des liaisons →
						</Button>
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default FicheBilan;
