import { useSearchParams, Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';

function Finish() {
	const [searchParams] = useSearchParams();
	const score = searchParams.get('score') || '0';
	const total = searchParams.get('total') || '10';
	const quizType = searchParams.get('quiz') || 'schema-cinematique';
	const dimension = searchParams.get('dimension') || '2D';

	const urlReboot = () => {
		if (quizType && dimension) {
			return `/${quizType}?dimension=${dimension}`;
		}
		return `/${quizType}`;
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
		<div>
			<head>
				<title>Quiz Terminé !</title>
			</head>
			<header>
				<h1>Quiz Terminé !</h1>
			</header>
			<main>
				<div style={{ textAlign: 'center', padding: '2rem' }}>
					<h2>Votre Score</h2>
					<div
						style={{
							fontSize: '3rem',
							margin: '2rem 0',
							fontWeight: 'bold',
						}}
					>
						{score} / {total}
					</div>
					<div style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
						{percentage}%
					</div>

					{percentage >= 80 && (
						<p style={{ color: 'green', fontSize: '1.2rem' }}>
							Excellent travail ! 🎉
						</p>
					)}
					{percentage >= 50 && percentage < 80 && (
						<p style={{ color: 'orange', fontSize: '1.2rem' }}>
							Bon travail ! Continue à t'entraîner. 👍
						</p>
					)}
					{percentage < 50 && (
						<p style={{ color: 'red', fontSize: '1.2rem' }}>
							Continue à réviser, tu vas y arriver ! 💪
						</p>
					)}

					<div
						style={{
							display: 'flex',
							gap: '1rem',
							justifyContent: 'center',
							marginTop: '2rem',
						}}
					>
						<Link to={urlReboot()}>
							<button
								style={{
									padding: '1rem 2rem',
									fontSize: '1rem',
								}}
							>
								Recommencer
							</button>
						</Link>
						<Link to="/">
							<button
								style={{
									padding: '1rem 2rem',
									fontSize: '1rem',
								}}
							>
								Retour à l'accueil
							</button>
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Finish;
