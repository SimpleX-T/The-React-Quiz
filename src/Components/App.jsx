import { useEffect, useReducer } from "react";

import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import MainContent from "./MainContent";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 15;

const initialState = {
	questions: [],
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highScore: 0,
	secRemaining: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataError":
			return { ...state, status: "error" };
		case "finished":
			return {
				...state,
				status: "finished",
				highScore:
					state.points > state.highScore
						? state.points
						: state.highScore,
			};
		case "start":
			return {
				...state,
				status: "active",
				secRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case "nextQuestion":
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};
		case "setAnswer":
			// eslint-disable-next-line no-case-declarations
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case "restart":
			return {
				...state,
				status: "ready",
				index: 0,
				answer: null,
				points: 0,
				secRemaining: 30,
			};
		case "tick":
			return {
				...state,
				secRemaining: state.secRemaining - 1,
				status: state.secRemaining < 1 ? "finished" : state.status,
			};
		default:
			throw new Error("Not found!");
	}
}

const App = () => {
	const [
		{ questions, status, index, answer, points, highScore, secRemaining },
		dispatch,
	] = useReducer(reducer, initialState);

	const numQuestions = questions.length;

	const maxPossiblePoints = questions.reduce(
		(prev, curr) => prev + curr.points,
		0
	);

	useEffect(function () {
		async function fetchData() {
			fetch("http://localhost:8000/questions")
				.then((res) => res.json())
				.then((data) =>
					dispatch({ type: "dataReceived", payload: data })
				)
				.catch(() => {
					dispatch({ type: "dataError" });
				});
		}
		fetchData();
	}, []);

	return (
		<div className='app'>
			<Header />
			<MainContent>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen
						numQuestions={numQuestions}
						onclick={dispatch}
					/>
				)}
				{status === "active" && (
					<>
						<Progress
							index={index}
							numQuestions={numQuestions}
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							answer={answer}
						/>
						<Question
							question={questions[index]}
							answer={answer}
							dispatch={dispatch}
						/>
						<Footer>
							<Timer
								secRemaining={secRemaining}
								dispatch={dispatch}
							/>
							<NextButton
								dispatch={dispatch}
								answer={answer}
								questions={questions}
								index={index}
								numQuestions={numQuestions}
							/>
						</Footer>
					</>
				)}
				{status === "finished" && (
					<FinishScreen
						points={points}
						maxPossiblePoints={maxPossiblePoints}
						highScore={highScore}
						dispatch={dispatch}
					/>
				)}
			</MainContent>
		</div>
	);
};

export default App;
