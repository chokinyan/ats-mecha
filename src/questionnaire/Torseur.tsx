import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import info from '../json/torseurs.json';

type Torseur = {
	fichier: string;
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

	const [point, setPoint] = useState<number>(0);
	const [questionNumber, setQuestionNumber] = useState<number>(0);
	const [selectedValue, setSelectedValue] = useState<string>('');

	console.log(`Rendu des torseurs`);

	// Initialiser listTorseurs une seule fois avec useState
	const [listTorseurs] = useState<Torseur[]>(() => {
		const torseurs: Torseur[] = [];
		while (torseurs.length !== 10) {
			const rand = Math.floor(
				Math.random() * info.metadata.total_torseurs
			);
			const torseur = info.torseurs[rand];
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

	return (
		<>
			<header>
				<h2>Torseurs Cinématiques</h2>
			</header>
			<main>
				<div className="QuestionContainer">
					<img
						src={`/asset/torseurCin/${listTorseurs[
							questionNumber
						].fichier.toUpperCase()}`}
						alt="Torseur Cinématique"
						className="QuestionImage"
					/>
					<select
						value={selectedValue}
						onChange={(e) => setSelectedValue(e.target.value)}
					>
						<option value="" disabled>
							Selectionner un type de liaison
						</option>
						{info.metadata.types_liaisons.map((type, index) => (
							<option key={index} value={type}>
								{type}
							</option>
						))}
					</select>
					{AxeLiaisonList.includes(selectedValue) && (
						<div className="QuestionExtraSelect">
							<label>Axe :</label>
							<select id="Axe">
								<option value="" disabled>
									Selectionner un axe
								</option>
								<option value="AX">Axe X</option>
								<option value="AY">Axe Y</option>
								<option value="AZ">Axe Z</option>
							</select>
						</div>
					)}
					{NormaleLiaisonList.includes(selectedValue) && (
						<div className="QuestionExtraSelect">
							<label>Normale :</label>
							<select id="Normale">
								<option value="" disabled>
									Selectionner une normale
								</option>
								<option value="NX">Normale X</option>
								<option value="NY">Normale Y</option>
								<option value="NZ">Normale Z</option>
							</select>
						</div>
					)}
					<p id="rep"></p>
					<button
						className="validate-button"
						id="validate-button"
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
								repEl.className = 'correct-answer';
								repEl.innerText = 'Bonne réponse !';
							} else {
								repEl.className = 'wrong-answer';
								repEl.innerText = `Mauvaise réponse ! La bonne réponse était : ${
									listTorseurs[questionNumber].type_liaison
								} ${
									listTorseurs[questionNumber].axe
										? 'avec axe ' +
										  listTorseurs[questionNumber].axe
										: ''
								} ${
									listTorseurs[questionNumber].normale
										? 'et normale ' +
										  listTorseurs[questionNumber].normale
										: ''
								}.`;
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
					</button>
					<button
						id="confirm-button"
						style={{ display: 'none' }}
						className="validate-button confirm-button"
						onClick={() => {
							if (questionNumber < 9) {
								// Réinitialiser tous les selects
								const axeSelect = document.getElementById(
									'Axe'
								) as HTMLSelectElement;
								const normaleSelect = document.getElementById(
									'Normale'
								) as HTMLSelectElement;
								if (axeSelect) axeSelect.value = '';
								if (normaleSelect) normaleSelect.value = '';

								// Réinitialiser le message de réponse
								const repEl = document.getElementById(
									'rep'
								) as HTMLParagraphElement;
								repEl.innerText = '';
								repEl.className = '';

								// Réafficher le bouton valider et cacher le bouton confirmer
								const validateButton = document.getElementById(
									'validate-button'
								) as HTMLButtonElement;
								const confirmButton = document.getElementById(
									'confirm-button'
								) as HTMLButtonElement;
								validateButton.disabled = false;
								validateButton.style.display = 'inline-block';
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
					</button>
				</div>
			</main>
			<Analytics path={'/torseurs'} framework="react" />
		</>
	);
}
export default Torseur;
