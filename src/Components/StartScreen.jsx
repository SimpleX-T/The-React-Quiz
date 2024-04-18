/* eslint-disable react/prop-types */
export default function StartScreen({ numQuestions, onclick }) {
	return (
		<div className='start'>
			<h2>Welcome to The React Quiz!</h2>
			<h3>
				{numQuestions} questions to test your React mastery knowledge
			</h3>
			<button
				className='btn btn-ui'
				onClick={() => onclick({ type: "start" })}>
				Let&apos;s start!
			</button>
		</div>
	);
}
