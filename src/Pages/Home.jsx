import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Modal from "../Components/Modal";
import CheckHealth from "../Components/CheckHealth";
import { jwtDecode } from "jwt-decode";

function Home() {
	const [isOpen, setIsOpen] = useState("");

	return (
		<>
			<Helmet>
				<title>Sample Blood.</title>
				<meta name="description" content="blood Sample" />
			</Helmet>
			<main className="pt-[60px]">
				<section className="hero relative flex justify-center items-center bg-[url(/logo/donation-8937.jpg)] bg-no-repeat after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-black/35 h-[92.6vh] bg-cover">
					<div className="z-20 container mx-auto flex flex-col items-center gap-11 justify-center h-full px-4 md:px-0">
						<h2 className="lg:leading-[60px] leading-[40px] text-white lg:text-[3rem] text-4xl drop-shadow-lg font-bold  text-center">
							Connecting Communities,
							<br /> Improving Healthcare, Changing Lives
						</h2>
						<p className="md:w-[90%]  w-full text-center font-light text-xl text-white">
							Egyptian's Blood Centers is the national association of
							independent, community blood centers dedicated to providing a safe
							and available blood supply for every patient in need.
						</p>
					</div>
				</section>
				<section className="lg:p-10 p-0 py-14 flex justify-between items-center ">
					<div className="container mx-auto flex flex-col lg:flex-row py-4 gap-11 lg:items-center h-full px-4 md:px-0">
						<div className="flex items-center gap-10 w-full lg:w-2/4">
							<div className="w-[350px] hidden lg:block">
								<img
									src="./icon-lightbulb-purple-bg.png"
									alt="icon-lightbulb-purple-bg"
								/>
							</div>
							<div className="flex flex-col gap-8">
								<header className="text-xl font-bold text-primary-500">
									Curious About Your Health?
								</header>
								<p className="text-lg text-black/85">
									If you're worried about your health, it's important to consult
									with a healthcare professional. Regular check-ups can help
									detect and manage potential health issues early. Learn more
									about how you can take proactive steps to maintain your
									well-being.
								</p>
								<button
									onClick={() => {
										if (jwtDecode(localStorage.getItem("token"))) {
											setIsOpen("CheckHealth");
										}
									}}
									className="lg:hover:underline text-primary-600 lg:text-black lg:hover:text-primary-700 w-fit"
								>
									Go To Check Your Health
								</button>
							</div>
						</div>
						<div className="flex items-center gap-10 w-full  lg:w-2/4">
							<div className="w-[350px]  hidden lg:block">
								<img src="./icon-app-purple.png" alt="icon-app-purple" />
							</div>
							<div className="flex flex-col gap-8">
								<header className="text-xl font-bold text-primary-500">
									Download the Blood Samples App
								</header>
								<p className="text-lg text-black/85 leading-8">
									Saving lives on the go is simple when you use the Vitalant
									app. Make and manage appointments, access your donor ID, check
									your health history and more – right from your mobile device.
								</p>
								<Link className="w-52 h-10 rounded-full flex justify-center items-center font-semibold text-white bg-primary-400 hover:bg-primary-600 transition-colors duration-300">
									Google Play Link
								</Link>
							</div>
						</div>
					</div>
				</section>
				<section className="lg:p-10 p-0 flex justify-between items-center overflow-hidden">
					<div className="container mx-auto flex flex-col lg:flex-row py-4 gap-11 lg:items-center h-full px-4 md:px-0">
						<div className="flex flex-col gap-8">
							<motion.div
								initial={{ opacity: 0, x: 100 }}
								transition={{
									duration: 0.3,
									type: "spring",
								}}
								whileInView={{ opacity: 1, x: 0 }}
								className="flex items-center justify-between"
							>
								<div className="flex lg:w-2/4 w-full flex-col gap-8 p-0 lg:p-12">
									<header className="capitalize text-xl font-bold text-primary-600">
										Check your health & know everything about your health Now.
									</header>
									<p className="text-lg text-black/85 leading-8">
										Monitoring your health is easier than ever with our
										cutting-edge app. Track your fitness, log your symptoms,
										access personalized health tips, and more.
									</p>
									<button
										onClick={() => {
											if (jwtDecode(localStorage.getItem("token"))) {
												setIsOpen("CheckHealth");
											}
										}}
										className="w-56 px-2 h-10 rounded-full flex justify-center items-center font-semibold text-white bg-primary-400 hover:bg-primary-600  transition-colors duration-300"
									>
										Now Go & check your health
									</button>
								</div>
								<div className="hidden w-2/4 lg:block">
									<img src="/blood-lab-young.jpg" alt="" />
								</div>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: -100 }}
								transition={{
									duration: 0.3,
									type: "spring",
								}}
								whileInView={{ opacity: 1, x: 0 }}
								className="flex items-center justify-between"
							>
								<div className="hidden w-2/4 lg:block">
									<img src="./blood-lab-tablet.jpg" alt="" />
								</div>
								<div className="flex lg:w-2/4 w-full flex-col gap-8 p-0 lg:p-12">
									<header className="capitalize text-xl font-bold text-primary-600">
										Save Lives & Become a Blood Donor Today.
									</header>
									<p className="text-lg text-black/85 leading-8">
										Donating blood is a simple, yet powerful way to make a
										difference. Join our community of lifesavers, find nearby
										donation centers, track your donation history, and get
										notified of upcoming drives.
									</p>
									<Link
										to={"/Services"}
										className="w-56 px-2 h-10 rounded-full flex justify-center items-center font-semibold text-white bg-primary-400 hover:bg-primary-600  transition-colors duration-300"
									>
										Blood Donation
									</Link>
								</div>
							</motion.div>
						</div>
					</div>
				</section>
			</main>
			{isOpen === "CheckHealth" && (
				<Modal handleClose={setIsOpen}>
					<CheckHealth setIsOpen={setIsOpen} />
				</Modal>
			)}
		</>
	);
}

export default Home;
