import { motion } from "framer-motion";
function Health({ setIsOpen }) {
	return (
		<>
			<div className="flex flex-col gap-8 h-full overflow-x-hidden">
				<motion.div
					initial={{
						left: -100,
						opacity: 0,
					}}
					animate={{
						left: 0,
						opacity: 1,
					}}
					transition={{ duration: 0.5, type: "spring" }}
					className="flex flex-col gap-4 justify-between h-2/4 p-4"
				>
					<header className="text-2xl capitalize font-bold text-primary-400">
						check your health
					</header>
					<p>
						you can input your Complete Blood Count (CBC) analysis, and in
						response, we provide insights into potential diseases or health
						conditions. By simply entering your CBC data.
					</p>
					<button
						className="bg-primary-400 text-white w-4/5 h-12 rounded-lg font-semibold hover:bg-primary-700 duration-300"
						onClick={() => setIsOpen("Check Health")}
					>
						check your health
					</button>
				</motion.div>
				<motion.div
					initial={{
						right: -100,
						opacity: 0,
					}}
					animate={{
						right: 0,
						opacity: 1,
					}}
					transition={{ duration: 0.3 }}
					className="flex flex-col gap-4 justify-between h-2/4 p-4"
				>
					<header className="text-2xl capitalize font-bold text-primary-400">
						check your symptoms
					</header>
					<p>
						you can input specific diseases and relevant information,we support
						to check of more than 100 disease, and in return, we provide an
						assessment indicating whether the disease is positive or negative
						based on the provided data.
					</p>
					<button
						className="bg-primary-400 text-white w-4/5 h-12 rounded-lg font-semibold hover:bg-primary-700 duration-300"
						onClick={() => setIsOpen("Select Dieases")}
					>
						check your symptoms
					</button>
				</motion.div>
			</div>
		</>
	);
}

export default Health;
