import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SchemaCinematique from './questionnaire/Schema-cinematique';
import Finish from './questionnaire/Finish.tsx';
import Torseur from './questionnaire/Torseur.tsx';

createRoot(document.getElementById('root')!).render(
	<Router>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="schema-cinematique" element={<SchemaCinematique />} />
			<Route path="torseurs" element={<Torseur />} />
			<Route path="finish" element={<Finish />} />
		</Routes>
	</Router>
);
