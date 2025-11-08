import { useState } from 'react';
import info from '../json/liaisons_tableau.json';
type Liaison = {
	fichier: string;
	dimension: '2D' | '3D';
	variante: string;
	type_liaison: string;
	liaison: string;
	description: string;
	axe: 'X' | 'Y' | 'Z' | '';
	normale?: 'X' | 'Y' | 'Z';
};

const AxeLiaisonList = ['Pivot glissant',  'Hélicoïdale', 'Sphère-Cylindre (Linéaire Annulaire)','Cylindre-Plan (Linéaire Rectiligne)'];
//const DirectionsLiaisonList = ['Glissière'];
const NormaleLiaisonList = ['Cylindre-Plan (Linéaire Rectiligne)', 'Appui-Plan'];

type Props = {
	types: '2D' | '3D' | '2D et 3D';
};

function SchemaCinematique(props: Props) {
	const [point, setPoint] = useState<number>(0);
	const [questionNumber, setQuestionNumber] = useState<number>(0);
	const [selectedValue, setSelectedValue] = useState<string>('');

	console.log(`Rendu du schéma cinématique en ${props.types}`);

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
		<div>
			<h2>Schéma Cinématique</h2>
			<p>Liste des liaisons :</p>
			<p>{point}</p>
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
			{AxeLiaisonList.includes(selectedValue) && (<select>
				<option value="" disabled>
					Selectionner un axe
				</option>
				<option value="X">Axe X</option>
				<option value="Y">Axe Y</option>
				<option value="Z">Axe Z</option>
			</select>)}
			{}
			<button
				onClick={() => {
					if (questionNumber < 9) {
						setQuestionNumber(questionNumber + 1);
						setSelectedValue(''); // Reset le sélecteur
					} else {
						alert(
							`Quiz terminé ! Votre score est de ${point} / 10`
						);
						setQuestionNumber(0);
						setPoint(0);
						setSelectedValue(''); // Reset le sélecteur
					}
				}}
			>
				Question Suivante
			</button>
		</div>
	);
}

export default SchemaCinematique;
