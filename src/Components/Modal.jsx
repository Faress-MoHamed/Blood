import React, { useEffect } from "react";

export default function Modal({ handleClose, children }) {
	// Function to stop body from scrolling
	const stopBodyScrolling = (toggle) => {
		document.body.style.overflow = toggle ? "hidden" : "auto";
	};

	// Use useEffect to handle the mount and unmount lifecycle
	useEffect(() => {
		stopBodyScrolling(true);
		return () => {
			stopBodyScrolling(false);
		};
	}, []);

	// Updated handleClose to manage body scroll
	const closeHandler = () => {
		stopBodyScrolling(false);
		handleClose();
	};

	return (
		<>
			<div
				onClick={closeHandler}
				className="left-0 top-0 h-full z-20 fixed inset-0 overflow-hidden bg-black bg-opacity-50"
			></div>
			<div className="flex justify-center items-center fixed inset-0 h-full z-40 w-fit left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%]">
				<div className="relative z-50 w-[90%]">
					<button onClick={closeHandler} className="absolute top-0 right-0 p-2">
						Close
					</button>
					{children}
				</div>
			</div>
		</>
	);
}
