/* eslint-disable react/prop-types */
export default function Progress({
	index,
	numQuestions,
	points,
	maxPossiblePoints,
	answer,
}) {
	return (
		<header className='progress'>
			<progress
				max={numQuestions}
				value={index + Number(answer !== null)}
			/>

			<p>
				Question <strong>{index}</strong> of {numQuestions}
			</p>
			<p>
				<strong>{points}</strong> / {maxPossiblePoints}
			</p>
		</header>
	);
}
