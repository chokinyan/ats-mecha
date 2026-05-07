import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import info from '../asset/json/liaisons_tableau.json';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

type Liaison = {
	fichier: string;
	dimension: '2D' | '3D';
	variante: string;
	type_liaison: string;
	liaison: string;
	description: string;
	axe?: 'X' | 'Y' | 'Z';
	normale?: 'X' | 'Y' | 'Z';
};

const AxeLiaisonList = [
	'Pivot',
	'Pivot glissant',
	'Hélicoïdale',
	'Sphère-Cylindre (Linéaire Annulaire)',
	'Cylindre-Plan (Linéaire Rectiligne)',
];

const NormaleLiaisonList = [
	'Sphère-Plan (Ponctuelle)',
	'Cylindre-Plan (Linéaire Rectiligne)',
	'Appui-Plan',
];

const verifierReponse = (
	correctLiaison: Liaison,
	selectedValue?: { normal?: string; axe?: string; type: string }
): boolean => {
	if (
		selectedValue?.type.toUpperCase().trim() !==
		correctLiaison.type_liaison.toUpperCase().trim()
	) {
		return false;
	}
	if (
		selectedValue?.axe?.charAt(1).toUpperCase() ===
			correctLiaison?.axe?.toUpperCase() &&
		selectedValue?.normal?.charAt(1).toUpperCase() ===
			correctLiaison?.normale?.toUpperCase()
	) {
		return true;
	}
	return false;
};

// Shuffle proper using Fisher-Yates then slice 10
function pickRandom(source: Liaison[], count: number): Liaison[] {
	const shuffled = [...source];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled.slice(0, count);
}

function SchemaCinematique() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const types =
		(searchParams.get('types') as '2D' | '3D' | '2D et 3D') || '2D';

	const [point, setPoint] = useState<number>(0);
	const [questionNumber, setQuestionNumber] = useState<number>(0);
	const [selectedValue, setSelectedValue] = useState<string>('');
	const [axeValue, setAxeValue] = useState<string>('');
	const [normaleValue, setNormaleValue] = useState<string>('');
	const [directionValue, setDirectionValue] = useState<string>('');
	const [feedback, setFeedback] = useState<{
		correct: boolean;
		message: string;
	} | null>(null);
	const [validated, setValidated] = useState<boolean>(false);

	const [listLiaisons] = useState<Liaison[]>(() => {
		// Fix: proper filtering then Fisher-Yates shuffle — no more rand-1 bug
		const filtered = (info.liaisons as Liaison[]).filter(
			(l) => types === '2D et 3D' || l.dimension === types
		);
		return pickRandom(filtered, Math.min(10, filtered.length));
	});

	const handleValidate = () => {
		const axeOrDir = AxeLiaisonList.includes(selectedValue)
			? axeValue
			: directionValue;
		const normal = NormaleLiaisonList.includes(selectedValue)
			? normaleValue
			: undefined;

		const correct = verifierReponse(listLiaisons[questionNumber], {
			axe: axeOrDir || undefined,
			normal: normal || undefined,
			type: selectedValue,
		});

		const l = listLiaisons[questionNumber];
		const correctStr = `${l.type_liaison}${l.axe ? ' axe ' + l.axe : ''}${l.normale ? ' normale ' + l.normale : ''}`;

		const newPoint = correct ? point + 1 : point;
		if (correct) setPoint(newPoint);

		setFeedback({
			correct,
			message: correct
				? 'Bonne réponse !'
				: `Mauvaise réponse ! La bonne réponse était : ${correctStr}.`,
		});
		setValidated(true);
	};

	const handleNext = () => {
		if (questionNumber < listLiaisons.length - 1) {
			setQuestionNumber((n) => n + 1);
			setSelectedValue('');
			setAxeValue('');
			setNormaleValue('');
			setDirectionValue('');
			setFeedback(null);
			setValidated(false);
		} else {
			navigate(
				`/finish?score=${point}&total=${listLiaisons.length}&quiz=schema-cinematique&types=${types}`
			);
		}
	};

	const getTitle = () => {
		if (types === '3D') return 'Schéma Cinématique — 3D';
		if (types === '2D et 3D') return 'Schéma Cinématique — Mixte';
		return 'Schéma Cinématique — 2D';
	};

	return (
		<Layout>
			<div className="container-center flex flex-col gap-6">
				<div className="text-center">
					<h2 className="text-2xl font-extrabold text-slate-100">
						{getTitle()}
					</h2>
					<p className="text-sm text-slate-300">
						Question {questionNumber + 1} / {listLiaisons.length}
					</p>
					{/* Barre de progression */}
					<div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden max-w-xs mx-auto">
						<div
							className="h-full bg-blue-500 transition-all duration-300"
							style={{
								width: `${((questionNumber + (validated ? 1 : 0)) / listLiaisons.length) * 100}%`,
							}}
						/>
					</div>
				</div>

				<Card>
					<div className="flex justify-center bg-slate-900 p-4 rounded-md mb-4">
						<img
							src={`/asset/liaison/${listLiaisons[questionNumber].fichier.toUpperCase()}`}
							alt="Schéma Cinématique"
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
								setDirectionValue('');
							}}
							disabled={validated}
						>
							<option value="" disabled>
								Selectionner un type de liaison
							</option>
							{info.metadata.types_liaisons.map((type, index) => (
								<option key={index} value={type}>
									{type}
								</option>
							))}
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

						{selectedValue === 'Glissière' && (
							<Select
								label="Direction"
								value={directionValue}
								onChange={(e) =>
									setDirectionValue(e.target.value)
								}
								disabled={validated}
							>
								<option value="" disabled>
									Selectionner une direction
								</option>
								<option value="AX">Direction X</option>
								<option value="AY">Direction Y</option>
								<option value="AZ">Direction Z</option>
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
								{questionNumber < listLiaisons.length - 1
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

export default SchemaCinematique;
