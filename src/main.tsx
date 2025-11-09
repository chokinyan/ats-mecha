import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SchemaCinematique from './questionnaire/Schema-cinematique';
import Finish from './questionnaire/Finish.tsx';
import Torseur from './questionnaire/Torseur.tsx';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';

const root = createRoot(document.getElementById('root')!);
export default function Main() {
	useEffect(() => {
		ReactGA.initialize('GTM-PS6R635Q'); // Remplace par ton Measurement ID
		ReactGA.send('pageview'); // Track la page initiale
	}, []);
	return (
		<Router>
			<Routes>
				<Route path="/" element={<App />} />
				<Route
					path="schema-cinematique"
					element={<SchemaCinematique />}
				/>
				<Route path="torseurs" element={<Torseur />} />
				<Route path="finish" element={<Finish />} />
			</Routes>
		</Router>
	);
}

root.render(<Main />);
