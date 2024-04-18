/* eslint-disable react/prop-types */
export default function FinishScreen({
	dispatch,
	points,
	maxPossiblePoints,
	highScore,
}) {
	let emoji;
	const percentage = (points / maxPossiblePoints) * 100;

	if (points === 100) emoji = "🥇";
	if (points < 100 && emoji > 80) emoji = "🎉";
	if (points < 80 && emoji > 50) emoji = "👍";
	if (points < 50 && emoji > 0) emoji = "😓";
	if (points === 0) emoji = "🤦‍♂️";
	return (
		<>
			<p className='result'>
				<span>{emoji}</span>
				You scored <strong>{points}</strong> out of {maxPossiblePoints}{" "}
				({Math.ceil(percentage)}%)
			</p>
			<p className='highscore'>(HighScore: {highScore} points)</p>
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: "restart" })}>
				Restart Quiz
			</button>
		</>
	);
}
