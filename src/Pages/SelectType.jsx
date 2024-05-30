import Header from "../Components/Header";
import { useState } from "react";
import SignIn from "./SignIn";
import { AnimatePresence } from "framer-motion";
import SignUpUser from "./SignUpUser";
import SignUpBloodBank from "./SignUpBloodBank";
import Modal from "../Components/Modal";

function SelectType() {
	const [openModal, setOpenModal] = useState(false);
	const handleClose = () => {
		setOpenModal(false);
	};

	return (
		<>
			<main className="selected-type flex justify-center items-center">
				<div className="w-4/5 h-4/5 flex flex-col p-7 pb-9 gap-20">
					<Header>Register As:</Header>
					<div className="button-container flex justify-center items-center gap-20">
						<button
							onClick={() => setOpenModal("bloodBank")}
							className="flex flex-col justify-center items-center gap-2 p-5 "
						>
							<img
								src="./png/blood.png"
								alt="blood bank"
								className="w-[120px]"
							/>
							<p className="font-bold">Blood Bank</p>
						</button>
						<button
							onClick={() => setOpenModal("user")}
							className="flex flex-col justify-center items-center gap-2 p-5 "
						>
							<img src="./png/people.png" alt="user" className="w-[120px]" />
							<p className="font-bold">User</p>
						</button>
					</div>

					<span className="text-xl">
						You Already have account?{" "}
						<button
							className="underline hover:opacity-80"
							onClick={() => setOpenModal("login")}
						>
							SignIn
						</button>
					</span>
				</div>
			</main>
			{openModal && (
				<Modal handleClose={handleClose}>
					<AnimatePresence>
						{openModal === "user" ? (
							<SignUpUser setIsOpen={setOpenModal} />
						) : openModal === "login" ? (
							<SignIn setIsOpen={setOpenModal} />
						) : openModal === "bloodBank" ? (
							<SignUpBloodBank setIsOpen={setOpenModal} />
						) : null}
					</AnimatePresence>
				</Modal>
			)}
		</>
	);
}

export default SelectType;
