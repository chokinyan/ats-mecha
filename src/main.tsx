import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SchemaCinematique from './questionnaire/Schema-cinematique';

createRoot(document.getElementById('root')!).render(
	<Router>
		<Routes>
			<Route path="/" element={<App />} />
			<Route
				path="schema-cinematique"
				element={<SchemaCinematique types="2D" />}
			/>
		</Routes>
	</Router>
);
