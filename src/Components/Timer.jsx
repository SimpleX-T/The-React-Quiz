import { useEffect } from "react";

/* eslint-disable react/prop-types */
export default function Timer({ secRemaining, dispatch }) {
	const min = Math.floor(secRemaining / 60);
	const seconds = secRemaining % 60;
	useEffect(
		function () {
			const interval = setInterval(() => {
				dispatch({ type: "tick" });
			}, 1000);
			interval;

			return () => clearInterval(interval);
		},
		[dispatch]
	);

	return (
		<div className='timer'>
			{min < 10 && "0"}
			{min}:{seconds < 10 && "0"}
			{seconds}
		</div>
	);
}
