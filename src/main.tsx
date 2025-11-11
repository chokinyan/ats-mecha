import { createRoot } from 'react-dom/client';
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

// Initialise GA4 en dehors du composant
ReactGA.initialize('G-E13SL0PL8L');

// Composant pour tracker les changements de page
function AnalyticsTracker() {
	const location = useLocation();

	useEffect(() => {
		// Track chaque changement de route
		ReactGA.send({
			hitType: 'pageview',
			page: location.pathname + location.search + location.hash,
		});
	}, [location]);

	return null;
}

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
					<Route path="torseurs" element={<Torseur />} />
					<Route path="finish" element={<Finish />} />
				</Routes>
			</Router>
		</>
	);
}

root.render(<Main />);
