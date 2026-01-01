import { useSearchParams, Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import '../assets/css/Quiz.css';

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
		<Layout>
			<div className="quiz-container">
				<div className="quiz-header">
					<h2 className="finish-title">Quiz Terminé !</h2>
				</div>

				<Card className="finish-card">
					<h3 className="finish-score-label">Votre Score Final</h3>

					<div className="finish-score-value">
						{score} <span className="finish-total">/ {total}</span>
					</div>

					<div className="finish-percentage">{percentage}%</div>

					<div className="finish-message">
						{percentage >= 80 && (
							<p
								className="finish-message-text"
								style={{ color: 'var(--color-success)' }}
							>
								Excellent travail ! 🎉
							</p>
						)}
						{percentage >= 50 && percentage < 80 && (
							<p
								className="finish-message-text"
								style={{ color: '#f59e0b' }}
							>
								Bon travail ! Continue à t'entraîner. 👍
							</p>
						)}
						{percentage < 50 && (
							<p
								className="finish-message-text"
								style={{ color: 'var(--color-error)' }}
							>
								Continue à réviser, tu vas y arriver ! 💪
							</p>
						)}
					</div>

					<div className="finish-actions">
						<Link
							to={urlReboot()}
							style={{ textDecoration: 'none' }}
						>
							<Button
								variant="primary"
								fullWidth
								className="finish-button"
							>
								Recommencer le Quiz
							</Button>
						</Link>
						<Link to="/" style={{ textDecoration: 'none' }}>
							<Button
								variant="secondary"
								fullWidth
								className="finish-button"
							>
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
