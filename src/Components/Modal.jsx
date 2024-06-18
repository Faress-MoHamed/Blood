import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";

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
			<div className="flex justify-center items-center fixed inset-0 h-full z-40 lg:w-[600px] w-[90%] left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%]">
				<div className="relative z-50 w-full  flex justify-center items-center">
					<motion.main
						initial={{ top: -100, opacity: 0 }}
						animate={{ top: 0, opacity: 1 }}
						exit={{ top: -100, opacity: 0 }}
						transition={{ duration: 0.5, type: "spring" }}
						className="signUpUser shadow-2xl bg-white w-full relative overflow-y-auto flex justify-center "
					>
						<button
							className="absolute right-3 top-3 z-50"
							onClick={() => handleClose()}
						>
							<IoIosCloseCircle className="w-7 h-7 hover:text-black/70 duration-300" />
						</button>
						<div className="w-full p-8">{children}</div>
					</motion.main>
				</div>
			</div>
		</>
	);
}
