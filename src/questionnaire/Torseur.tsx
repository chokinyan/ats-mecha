import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import info_stat from '../asset/json/torseurs_stat.json';
import info_cin from '../asset/json/torseurs_cin.json';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import '../assets/css/Quiz.css';
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

function Torseur() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const type = searchParams.get('type') || 'cinematique';

	const [point, setPoint] = useState<number>(0);
	const [questionNumber, setQuestionNumber] = useState<number>(0);
	const [selectedValue, setSelectedValue] = useState<string>('');

	console.log(`Rendu des torseurs`);

	// Initialiser listTorseurs une seule fois avec useState
	const [listTorseurs] = useState<Torseur[]>(() => {
		const torseurs: Torseur[] = [];
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

		while (torseurs.length !== 10) {
			const rand = Math.floor(Math.random() * sourceData.length);
			const torseur = sourceData[rand];
			if (
				!torseurs.find(
					(torseurFound) => torseurFound.fichier === torseur.fichier
				)
			) {
				// assert the imported JSON item matches the Torseur type
				torseurs.push(torseur as Torseur);
			}
		}
		return torseurs;
	});

	const getTitle = () => {
		if (type === 'statique') return 'Torseurs Statiques';
		if (type === 'mixte') return 'Torseurs Mixtes';
		return 'Torseurs Cinématiques';
	};

	return (
		<Layout>
			<div className="quiz-container">
				<div className="quiz-header">
					<h2 className="quiz-title">{getTitle()}</h2>
					<p className="quiz-progress">
						Question {questionNumber + 1} / 10
					</p>
				</div>

				<Card className="question-card">
					<div className="question-image-container">
						<img
							src={`/asset/${
								listTorseurs[questionNumber].folder
							}/${listTorseurs[questionNumber].fichier.toUpperCase()}`}
							alt="Torseur"
							className="question-image"
						/>
					</div>

					<div className="question-form">
						<Select
							label="Type de liaison"
							value={selectedValue}
							onChange={(e) => setSelectedValue(e.target.value)}
						>
							<option value="" disabled>
								Selectionner un type de liaison
							</option>
							{info_cin.metadata.types_liaisons.map(
								(type, index) => (
									<option key={index} value={type}>
										{type}
									</option>
								)
							)}
						</Select>

						{AxeLiaisonList.includes(selectedValue) && (
							<Select label="Axe" id="Axe">
								<option value="" disabled>
									Selectionner un axe
								</option>
								<option value="AX">Axe X</option>
								<option value="AY">Axe Y</option>
								<option value="AZ">Axe Z</option>
							</Select>
						)}

						{NormaleLiaisonList.includes(selectedValue) && (
							<Select label="Normale" id="Normale">
								<option value="" disabled>
									Selectionner une normale
								</option>
								<option value="NX">Normale X</option>
								<option value="NY">Normale Y</option>
								<option value="NZ">Normale Z</option>
							</Select>
						)}
					</div>

					<p id="rep" className="feedback-message"></p>

					<div className="quiz-actions">
						<Button
							id="validate-button"
							fullWidth
							onClick={(el) => {
								const repEl = document.getElementById(
									'rep'
								) as HTMLParagraphElement;
								const axe = (
									document.getElementById(
										'Axe'
									) as HTMLSelectElement
								)?.value;
								const normal = (
									document.getElementById(
										'Normale'
									) as HTMLSelectElement
								)?.value;
								const repVal = verifierReponse(
									listTorseurs[questionNumber],
									{
										axe: axe,
										normal: normal,
										type: selectedValue,
									}
								);
								if (repVal) {
									setPoint(point + 1);
									repEl.className =
										'feedback-message correct-answer';
									repEl.innerText = 'Bonne réponse !';
									repEl.style.color = ''; // Reset inline color if any
								} else {
									repEl.className =
										'feedback-message wrong-answer';
									repEl.innerText = `Mauvaise réponse ! La bonne réponse était : ${
										listTorseurs[questionNumber]
											.type_liaison
									} ${
										listTorseurs[questionNumber].axe
											? 'avec axe ' +
												listTorseurs[questionNumber].axe
											: ''
									} ${
										listTorseurs[questionNumber].normale
											? 'et normale ' +
												listTorseurs[questionNumber]
													.normale
											: ''
									}.`;
									repEl.style.color = ''; // Reset inline color
								}
								el.currentTarget.disabled = true;
								el.currentTarget.style.display = 'none';
								const confirmButton = document.getElementById(
									'confirm-button'
								) as HTMLButtonElement;
								confirmButton.style.display = 'inline-block';
							}}
						>
							Valider la réponse
						</Button>

						<Button
							id="confirm-button"
							variant="primary"
							fullWidth
							style={{ display: 'none' }}
							className="validate-button confirm-button"
							onClick={() => {
								if (questionNumber < 9) {
									// Réinitialiser tous les selects
									const axeSelect = document.getElementById(
										'Axe'
									) as HTMLSelectElement;
									const normaleSelect =
										document.getElementById(
											'Normale'
										) as HTMLSelectElement;
									if (axeSelect) axeSelect.value = '';
									if (normaleSelect) normaleSelect.value = '';

									// Réinitialiser le message de réponse
									const repEl = document.getElementById(
										'rep'
									) as HTMLParagraphElement;
									repEl.innerText = '';
									repEl.className = 'feedback-message';

									// Réafficher le bouton valider et cacher le bouton confirmer
									const validateButton =
										document.getElementById(
											'validate-button'
										) as HTMLButtonElement;
									const confirmButton =
										document.getElementById(
											'confirm-button'
										) as HTMLButtonElement;
									validateButton.disabled = false;
									validateButton.style.display =
										'inline-block';
									confirmButton.style.display = 'none';

									// Passer à la question suivante
									setQuestionNumber(questionNumber + 1);
									setSelectedValue('');
								} else {
									navigate(
										`/finish?score=${point}&total=10&quiz=torseurs`
									);
								}
							}}
						>
							Prochaine question
						</Button>
					</div>
				</Card>
			</div>
		</Layout>
	);
}
export default Torseur;
