import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import info from '../json/liaisons_tableau.json';

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
//const DirectionsLiaisonList = ['Glissière'];
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

function SchemaCinematique() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const types =
		(searchParams.get('types') as '2D' | '3D' | '2D et 3D') || '2D';

	const [point, setPoint] = useState<number>(0);
	const [questionNumber, setQuestionNumber] = useState<number>(0);
	const [selectedValue, setSelectedValue] = useState<string>('');

	console.log(`Rendu du schéma cinématique en ${types}`);

	// Initialiser listLiaisons une seule fois avec useState
	const [listLiaisons] = useState<Liaison[]>(() => {
		const liaisons: Liaison[] = [];
		while (liaisons.length !== 10) {
			const rand = Math.floor(Number(Math.random().toPrecision(2)) * 100);
			if (rand > info.metadata.total_fichiers) {
				continue;
			}
			const liaison = info.liaisons[rand - 1];
			if (
				liaison.dimension.indexOf(types) === -1 &&
				types !== '2D et 3D'
			) {
				continue;
			}
			if (
				!liaisons.find(
					(liaisonFound) => liaisonFound.fichier === liaison.fichier
				)
			) {
				// assert the imported JSON item matches the Liaison type
				liaisons.push(liaison as Liaison);
			}
		}
		return liaisons;
	});

	return (
		<>
			<Analytics path={'/schema-cinematique'} framework="react" />
			<header>
				<h2>Schéma Cinématique</h2>
			</header>
			<main>
				<div className="QuestionContainer">
					<img
						src={`/asset/liaison/${listLiaisons[
							questionNumber
						].fichier.toUpperCase()}`}
						alt="Schéma Cinématique Placeholder"
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
					{selectedValue == 'Glissière' && (
						<div className="QuestionExtraSelect">
							<label>Direction :</label>
							<select id="Direction">
								<option value="" disabled>
									Selectionner une direction
								</option>
								<option value="DX">Direction X</option>
								<option value="DY">Direction Y</option>
								<option value="DZ">Direction Z</option>
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
							const direction = (
								document.getElementById(
									'Direction'
								) as HTMLSelectElement
							)?.value;
							const repVal = verifierReponse(
								listLiaisons[questionNumber],
								{
									axe: axe || direction,
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
									listLiaisons[questionNumber].type_liaison
								} ${
									listLiaisons[questionNumber].axe
										? 'avec axe ' +
										  listLiaisons[questionNumber].axe
										: ''
								} ${
									listLiaisons[questionNumber].normale
										? 'et normale ' +
										  listLiaisons[questionNumber].normale
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
								const directionSelect = document.getElementById(
									'Direction'
								) as HTMLSelectElement;
								if (axeSelect) axeSelect.value = '';
								if (normaleSelect) normaleSelect.value = '';
								if (directionSelect) directionSelect.value = '';

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
									`/finish?score=${point}&total=10&quiz=schema-cinematique&dimension=${types}`
								);
							}
						}}
					>
						Prochaine question
					</button>
				</div>
			</main>
		</>
	);
}
export default SchemaCinematique;
