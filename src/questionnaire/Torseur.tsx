import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import info_stat from '../asset/json/torseurs_stat.json';
import info_cin from '../asset/json/torseurs_cin.json';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

type Torseur = {
	fichier: string;
	type_liaison: string;
	liaison: string;
	description: string;
	axe?: 'X' | 'Y' | 'Z';
	normale?: 'X' | 'Y' | 'Z';
	folder?: string;
};

const AxeLiaisonList = [
	'Pivot',
	'Pivot glissant',
	'Hélicoïdale',
	'Glissière',
	'Sphère-Cylindre (Linéaire Annulaire)',
	'Cylindre-Plan (Linéaire Rectiligne)',
];

const NormaleLiaisonList = [
	'Sphère-Plan (Ponctuelle)',
	'Cylindre-Plan (Linéaire Rectiligne)',
	'Appui-Plan',
];

const verifierReponse = (
	correctTorseur: Torseur,
	selectedValue?: { normal?: string; axe?: string; type: string }
): boolean => {
	if (
		selectedValue?.type.toUpperCase().trim() !==
		correctTorseur.type_liaison.toUpperCase().trim()
	) {
		return false;
	}
	if (
		selectedValue?.axe?.charAt(1).toUpperCase() ===
			correctTorseur?.axe?.toUpperCase() &&
		selectedValue?.normal?.charAt(1).toUpperCase() ===
			correctTorseur?.normale?.toUpperCase()
	) {
		return true;
	}
	return false;
};

function pickRandom<T>(source: T[], count: number): T[] {
	const shuffled = [...source];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled.slice(0, count);
}

function Torseur() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const type = searchParams.get('type') || 'cinematique';

	const [point, setPoint] = useState<number>(0);
	const [questionNumber, setQuestionNumber] = useState<number>(0);
	const [selectedValue, setSelectedValue] = useState<string>('');
	const [axeValue, setAxeValue] = useState<string>('');
	const [normaleValue, setNormaleValue] = useState<string>('');
	const [feedback, setFeedback] = useState<{
		correct: boolean;
		message: string;
	} | null>(null);
	const [validated, setValidated] = useState<boolean>(false);

	const [listTorseurs] = useState<Torseur[]>(() => {
		let sourceData: Torseur[] = [];
		if (type === 'statique') {
			sourceData = info_stat.torseurs.map((t) => ({
				...t,
				folder: 'torseurStat',
			})) as Torseur[];
		} else if (type === 'mixte') {
			sourceData = [
				...info_cin.torseurs.map((t) => ({
					...t,
					folder: 'torseurCin',
				})),
				...info_stat.torseurs.map((t) => ({
					...t,
					folder: 'torseurStat',
				})),
			] as Torseur[];
		} else {
			sourceData = info_cin.torseurs.map((t) => ({
				...t,
				folder: 'torseurCin',
			})) as Torseur[];
		}
		return pickRandom(sourceData, Math.min(10, sourceData.length));
	});

	const getTitle = () => {
		if (type === 'statique') return 'Torseurs Statiques';
		if (type === 'mixte') return 'Torseurs Mixtes';
		return 'Torseurs Cinématiques';
	};

	const handleValidate = () => {
		const correct = verifierReponse(listTorseurs[questionNumber], {
			axe: axeValue || undefined,
			normal: normaleValue || undefined,
			type: selectedValue,
		});

		const t = listTorseurs[questionNumber];
		const correctStr = `${t.type_liaison}${t.axe ? ' axe ' + t.axe : ''}${t.normale ? ' normale ' + t.normale : ''}`;

		if (correct) setPoint((p) => p + 1);

		setFeedback({
			correct,
			message: correct
				? 'Bonne réponse !'
				: `Mauvaise réponse ! La bonne réponse était : ${correctStr}.`,
		});
		setValidated(true);
	};

	const handleNext = () => {
		if (questionNumber < listTorseurs.length - 1) {
			setQuestionNumber((n) => n + 1);
			setSelectedValue('');
			setAxeValue('');
			setNormaleValue('');
			setFeedback(null);
			setValidated(false);
		} else {
			// Fix: use functional updater to get correct score including last answer
			const finalScore = feedback?.correct ? point + 1 : point;
			navigate(
				`/finish?score=${finalScore}&total=${listTorseurs.length}&quiz=torseurs&types=${type}`
			);
		}
	};

	return (
		<Layout>
			<div className="container-center flex flex-col gap-6">
				<div className="text-center">
					<h2 className="text-2xl font-extrabold text-slate-100">
						{getTitle()}
					</h2>
					<p className="text-sm text-slate-300">
						Question {questionNumber + 1} / {listTorseurs.length}
					</p>
					{/* Barre de progression */}
					<div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden max-w-xs mx-auto">
						<div
							className="h-full bg-blue-500 transition-all duration-300"
							style={{
								width: `${((questionNumber + (validated ? 1 : 0)) / listTorseurs.length) * 100}%`,
							}}
						/>
					</div>
				</div>

				<Card>
					<div className="flex justify-center bg-slate-900 p-4 rounded-md mb-4">
						<img
							src={`/asset/${listTorseurs[questionNumber].folder}/${listTorseurs[questionNumber].fichier.toUpperCase()}`}
							alt="Torseur"
							className="max-h-64 object-contain"
						/>
					</div>

					<div className="flex flex-col gap-3">
						<Select
							label="Type de liaison"
							value={selectedValue}
							onChange={(e) => {
								setSelectedValue(e.target.value);
								setAxeValue('');
								setNormaleValue('');
							}}
							disabled={validated}
						>
							<option value="" disabled>
								Selectionner un type de liaison
							</option>
							{info_cin.metadata.types_liaisons.map(
								(t, index) => (
									<option key={index} value={t}>
										{t}
									</option>
								)
							)}
						</Select>

						{AxeLiaisonList.includes(selectedValue) && (
							<Select
								label="Axe"
								value={axeValue}
								onChange={(e) => setAxeValue(e.target.value)}
								disabled={validated}
							>
								<option value="" disabled>
									Selectionner un axe
								</option>
								<option value="AX">Axe X</option>
								<option value="AY">Axe Y</option>
								<option value="AZ">Axe Z</option>
							</Select>
						)}

						{NormaleLiaisonList.includes(selectedValue) && (
							<Select
								label="Normale"
								value={normaleValue}
								onChange={(e) =>
									setNormaleValue(e.target.value)
								}
								disabled={validated}
							>
								<option value="" disabled>
									Selectionner une normale
								</option>
								<option value="NX">Normale X</option>
								<option value="NY">Normale Y</option>
								<option value="NZ">Normale Z</option>
							</Select>
						)}
					</div>

					{feedback && (
						<p
							className={`text-center font-semibold mt-3 ${
								feedback.correct
									? 'text-emerald-500'
									: 'text-red-500'
							}`}
						>
							{feedback.message}
						</p>
					)}

					<div className="mt-4 flex flex-col gap-3">
						{!validated ? (
							<Button
								id="validate-button"
								fullWidth
								disabled={!selectedValue}
								onClick={handleValidate}
							>
								Valider la réponse
							</Button>
						) : (
							<Button
								id="confirm-button"
								variant="primary"
								fullWidth
								onClick={handleNext}
							>
								{questionNumber < listTorseurs.length - 1
									? 'Prochaine question'
									: 'Voir le résultat'}
							</Button>
						)}
					</div>
				</Card>
			</div>
		</Layout>
	);
}

export default Torseur;
