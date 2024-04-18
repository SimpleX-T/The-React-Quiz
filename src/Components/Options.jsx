/* eslint-disable react/prop-types */
function Options({ question, dispatch, answer }) {
	const hasAnswered = answer !== null;

	return (
		<div className='options'>
			{question.options.map((option, index) => (
				<button
					className={`btn btn-option ${
						index === answer ? "answer" : ""
					} ${
						hasAnswered
							? index === question.correctOption
								? "correct"
								: "wrong"
							: ""
					}`}
					disabled={hasAnswered}
					onClick={() =>
						dispatch({ type: "setAnswer", payload: index })
					}
					key={option}>
					{option}
				</button>
			))}
		</div>
	);
}

export default Options;
