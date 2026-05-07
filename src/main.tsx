import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {
	HashRouter as Router,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom';
import SchemaCinematique from './questionnaire/Schema-cinematique';
import Finish from './questionnaire/Finish.tsx';
import Torseur from './questionnaire/Torseur.tsx';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Tableau from './pages/tableau.tsx';
import FicheBilan from './pages/FicheBilan.tsx';

// Initialise GA4 en dehors du composant
ReactGA.initialize('G-E13SL0PL8L');

// Composant pour tracker les changements de page
const AnalyticsTracker = () => {
	const location = useLocation();
	useEffect(() => {
		ReactGA.send({
			hitType: 'pageview',
			page: location.pathname + location.search + location.hash,
		});
	}, [location]);
	return null;
};

const root = createRoot(document.getElementById('root')!);
export default function Main() {
	return (
		<>
			<Analytics />
			<SpeedInsights />
			<Router>
				<AnalyticsTracker />
				<Routes>
					<Route path="/" element={<App />} />
					<Route
						path="schema-cinematique"
						element={<SchemaCinematique />}
					/>
					<Route path="tableau" element={<Tableau />} />
					<Route path="torseurs" element={<Torseur />} />
					<Route path="finish" element={<Finish />} />
					<Route path="fiche-bilan" element={<FicheBilan />} />
				</Routes>
			</Router>
		</>
	);
}

root.render(<Main />);
