import { useSearchParams, Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
// Styles migrated to Tailwind; legacy CSS removed

function Finish() {
	const [searchParams] = useSearchParams();
	const score = searchParams.get('score') || '0';
	const total = searchParams.get('total') || '10';
	const quizType = searchParams.get('quiz') || 'schema-cinematique';
	// Fix: schema-cinematique uses ?types= and torseurs uses ?type=
	const types = searchParams.get('types') || '2D';

	const urlReboot = () => {
		if (quizType === 'schema-cinematique') {
			return `/schema-cinematique?types=${types}`;
		}
		if (quizType === 'torseurs') {
			return `/torseurs?type=${types}`;
		}
		return '/';
	};

	const percentage = Math.round((parseInt(score) / parseInt(total)) * 100);

	useEffect(() => {
		const eventData = {
			quiz_type: quizType,
			score: parseInt(score),
			total: parseInt(total),
			percentage: percentage,
		};

		ReactGA.event({
			category: 'Quiz',
			action: 'quiz_completed',
			label: quizType,
			value: percentage,
		});

		ReactGA.event('quiz_completed', eventData);
	}, [quizType, score, total, percentage]);

	return (
		<Layout>
			<div className="container-center flex flex-col gap-6">
				<div className="text-center">
					<h2 className="text-2xl font-extrabold text-slate-100">
						Quiz Terminé !
					</h2>
				</div>

				<Card>
					<h3 className="text-sm text-slate-300 font-medium">
						Votre Score Final
					</h3>

					<div className="text-5xl font-extrabold text-slate-100 mt-4">
						{score}{' '}
						<span className="text-2xl text-slate-400">
							/ {total}
						</span>
					</div>

					<div className="text-xl font-semibold text-slate-100 mt-2">
						{percentage}%
					</div>

					<div className="mt-4">
						{percentage >= 80 && (
							<p className="text-emerald-500 font-semibold">
								Excellent travail ! 🎉
							</p>
						)}
						{percentage >= 50 && percentage < 80 && (
							<p className="text-amber-500 font-semibold">
								Bon travail ! Continue à t'entraîner. 👍
							</p>
						)}
						{percentage < 50 && (
							<p className="text-red-500 font-semibold">
								Continue à réviser, tu vas y arriver ! 💪
							</p>
						)}
					</div>

					<div className="mt-6 flex flex-col gap-3">
						<Link to={urlReboot()}>
							<Button variant="primary" fullWidth>
								Recommencer le Quiz
							</Button>
						</Link>
						<Link to="/">
							<Button variant="secondary" fullWidth>
								Retour à l'accueil
							</Button>
						</Link>
					</div>
				</Card>
			</div>
		</Layout>
	);
}

export default Finish;
