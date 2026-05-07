import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
	<div className="app-layout flex flex-col min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
		{/* Décoration d'arrière-plan (gradients floutés) */}
		<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
		<div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

		<header className="bg-slate-900/80 backdrop-blur-md shadow-sm py-3 border-b border-slate-800 sticky top-0 z-50">
			<div className="container-center text-center">
				<Link
					to="/"
					className="text-slate-100 hover:text-white transition-colors"
				>
					<h1 className="m-0 font-extrabold tracking-tight text-2xl bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
						Révisions Méca ATS
					</h1>
				</Link>
			</div>
		</header>

		<main className="flex-1 w-full mx-auto px-4 py-6">
			{children}
		</main>

		<footer className="text-center py-6 text-slate-400 text-sm border-t border-slate-700">
			<p>
				Projet réalisé à des fins pédagogiques. Inspiré de l'app «
				Liaison? ».
			</p>
		</footer>
	</div>
);

export default Layout;
