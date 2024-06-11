import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import SearchNearstDonors from "../Components/SearchNearstDonors";
import { useState } from "react";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import CheckHealth from "../Components/CheckHealth";
import { Updata_Role } from "../End points/User";

function ServicesUser() {
	const [IsOpen, setIsOpen] = useState(null);
	return (
		<>
			<Helmet>
				<title>Services.</title>
				<meta name="description" content="User services blood donor find" />
			</Helmet>
			<main className="overflow-x-hidden lg:mt-0 mt-[66px] lg:p-16 p-8">
				<div className="container mx-auto flex flex-col items-center lg:gap-0 gap-8 py-5 justify-center h-full px-4 md:px-0">
					<div className="self-start w-full">
						<Header>Donation blood</Header>
					</div>
					<div className="flex lg:flex-row flex-col gap-8 lg:px-8">
						<motion.div
							initial={{ opacity: 0, x: 100 }}
							transition={{
								duration: 0.5,
								type: "spring",
							}}
							animate={{ opacity: 1, x: 0 }}
							className="flex items-center justify-between"
						>
							<div className="hidden w-[150px] lg:block">
								<img src="./icon-blood-bag-purple.png" alt="" />
							</div>
							<div className="flex w-full flex-col gap-8 p-0 lg:p-12">
								<header className="capitalize text-xl font-bold text-primary-600">
									Find a Blood Donor & Save Lives Today.
								</header>
								<p className="text-lg text-black/85 leading-8">
									In need of blood? Our platform connects you with nearby blood
									donors ready to help. Easily search for compatible donors,
									send requests, and receive real-time updates. Join our
									life-saving community now.
								</p>
								<button
									onClick={() => {
										setIsOpen("searchDonor");
									}}
									className="w-56 px-2 h-10 rounded-full flex justify-center items-center font-semibold text-white bg-primary-400 hover:bg-primary-600  transition-colors duration-300"
								>
									Find a Blood Donor
								</button>
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: -100 }}
							transition={{
								duration: 0.5,
								type: "spring",
							}}
							animate={{ opacity: 1, x: 0 }}
							className="flex items-center justify-between"
						>
							<div className="flex w-full flex-col gap-8 p-0 lg:p-12">
								<header className="capitalize text-xl font-bold text-primary-600">
									Save Lives & Become a Blood Donor Today.
								</header>
								<p className="text-lg text-black/85 leading-8">
									Donating blood is a simple, yet powerful way to make a
									difference. Join our community of lifesavers, find nearby
									donation centers, track your donation history, and get
									notified of upcoming drives.
								</p>
								<button
									onClick={async () => {
										await Updata_Role();
									}}
									className="w-56 px-2 h-10 rounded-full flex justify-center items-center font-semibold text-white bg-primary-400 hover:bg-primary-600  transition-colors duration-300"
								>
									Donate Blood
								</button>
							</div>
							<div className="hidden w-[150px] lg:block">
								<img src="./icon-patient-purple.png" alt="" />
							</div>
						</motion.div>
					</div>
					<div className="flex lg:flex-row flex-col gap-8 lg:px-8">
						<motion.div
							initial={{ opacity: 0, x: 100 }}
							transition={{
								duration: 0.5,
								type: "spring",
							}}
							animate={{ opacity: 1, x: 0 }}
							className="flex items-center justify-between lg:w-2/4 w-full "
						>
							<div className="hidden w-[150px] lg:block">
								<img src="./icon-person-heart-purple.png" alt="" />
							</div>
							<div className="flex w-full flex-col justify-between  h-full gap-3 p-0 lg:p-12 lg:pb-0">
								<header className="capitalize text-xl font-bold text-primary-600">
									Join Upcoming Blood Donation Events.
								</header>
								<p className="text-lg text-black/85 leading-8">
									Participate in our blood donation events and make a difference
									in your community. Find nearby events, register to donate, and
									stay informed about the impact of your contributions
								</p>
								<Link className="w-56 px-2 h-10 rounded-full flex justify-center items-center font-semibold text-white bg-primary-400 hover:bg-primary-600  transition-colors duration-300">
									Find Events
								</Link>
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 100 }}
							transition={{
								duration: 0.3,
								type: "spring",
							}}
							animate={{ opacity: 1, x: 0 }}
							className="flex items-center justify-between lg:w-2/4 w-full"
						>
							<div className="flex w-full flex-col justify-between h-full gap-3 p-0 lg:p-12 lg:pb-0">
								<header className="capitalize text-xl font-bold text-primary-600">
									know everything about your health Now.
								</header>
								<p className="text-lg text-black/85 leading-8">
									Monitoring your health is easier than ever with our
									cutting-edge app. Track your fitness, log your symptoms,
									access personalized health tips, and more.
								</p>
								<button
									onClick={() => {
										setIsOpen("CheckHealth");
									}}
									className="w-56 px-2 h-10 rounded-full flex justify-center items-center font-semibold text-white bg-primary-400 hover:bg-primary-600  transition-colors duration-300"
								>
									Now Go & check your health
								</button>
							</div>
							<div className="hidden w-[150px] lg:block ">
								<img src="/icon-hand-heart.png" alt="" />
							</div>
						</motion.div>
					</div>
				</div>
				{IsOpen === "searchDonor" ? (
					<Modal handleClose={setIsOpen}>
						<SearchNearstDonors setIsOpen={setIsOpen} />
					</Modal>
				) : IsOpen === "CheckHealth" ? (
					<Modal handleClose={setIsOpen}>
						<CheckHealth setIsOpen={setIsOpen} />
					</Modal>
				) : null}
			</main>
		</>
	);
}

export default ServicesUser;
