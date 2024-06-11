import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
const navLinks = [
	{
		id: 0,
		name: "Home",
		link: "/",
	},
	{
		id: 1,
		name: "Services",
		link: "/Services",
	},
	{
		id: 2,
		name: "Profile",
		link: "/Profile",
	},
];
const navLinksMobile = [
	{
		id: 0,
		name: "Home",
		link: "/",
	},
	{
		id: 1,
		name: "Services",
		link: "/Services",
	},
	{
		id: 2,
		name: "Profile",
		link: "/Profile",
	},
];
function NavBar() {
	const [open, setOpen] = useState(false);
	const currentPath = window.location.pathname.slice(1);
	const controls = useAnimation();
	useEffect(() => {
		if (open) {
			controls.start({ x: 0, opacity: 1 });
		} else {
			controls.start({ x: -100, opacity: 0 });
		}
	}, [open, controls]);

	function handleClose() {
		setOpen((e) => !e);
	}
	function handleOpen() {
		setOpen((e) => !e);
	}

	useEffect(() => {
		if (!localStorage.getItem("token") && window.location.pathname !== "/") {
			toast.error("You must be logged in to access this page");
		}
	}, [window.location.pathname]);

	return (
		<>
			<nav className="w-screen shadow-2xl fixed top-0  z-30  mx-auto flex   items-center justify-between bg-white lg:px-6 px-4 py-2 backdrop-blur-lg text-primary-600">
				<NavLink
					to="/"
					className="flex items-center cursor-pointer  font-logo md:text-5xl uppercase text-3xl font-bold text-stone-900 transition-colors duration-300"
				>
					<img className="w-[58px]" src="./logo/logo.png" alt="" />
					<span className="text-xl text-primary-700 font-semibold">
						{" "}
						Blood Samples
					</span>
				</NavLink>
				<ul className="hidden items-center justify-between lg:flex  lg:gap-4 lg:w-2/5">
					{navLinks.map((item) => {
						return (
							<motion.li
								initial={{ opacity: 0, y: -100 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									delay: 0.2 * item.id,
									ease: [0.17, 0.55, 0.55, 1],
								}}
								key={item.id}
							>
								<NavLink
									to={`${item.link}`}
									className="cursor-pointer relative text-lg before:absolute before:bottom-[-5px] before:left-0 before:h-[2px] before:w-0 before:bg-primary-700 before:transition-all before:duration-300 hover:before:w-full"
								>
									{item.name}
								</NavLink>
							</motion.li>
						);
					})}
				</ul>
				<div className="flex items-center gap-10">
					<button
						aria-label="show bars"
						onClick={() => handleOpen()}
						className="block md:text-3xl text-2xl text-black lg:hidden"
					>
						<i className="fa-solid fa-bars" />
					</button>
					{localStorage.getItem("token") && (
						<motion.button
							onClick={() => {
								localStorage.clear();
								window.location.reload();
							}}
							initial={{ opacity: 0, y: -100 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.2 * 3,
								ease: [0.17, 0.55, 0.55, 1],
							}}
							className={`relative text-lg bg-primary-400 hover:bg-primary-600 transition-colors duration-300 rounded-full p-2 px-[12px] text-white font-bold  `}
						>
							Logout
						</motion.button>
					)}
				</div>
			</nav>
			{
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ x: 100, opacity: 0 }}
							animate={open ? { opacity: 1, x: 0 } : {}}
							exit={{ x: 100, opacity: 0 }}
							transition={{ duration: 0.5 }}
							className={`fixed ${
								open ? "" : "hidden"
							} right-0 top-0 z-[99999] w-[45%] lg:top-5`}
						>
							<ul className="flex  h-screen w-full flex-col items-start justify-start gap-10 bg-white p-3 backdrop-blur-lg lg:hidden">
								<button
									aria-label="clos sidebar"
									className="text-4xl text-black"
									onClick={() => handleClose()}
								>
									
									<i className="fa-solid fa-xmark"></i>
								</button>
								{navLinksMobile.map((item) => {
									return (
										<>
											<motion.li
												initial={{ opacity: 0, x: 100 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													delay: 0.2 * item.id,
													ease: [0.17, 0.55, 0.55, 1],
												}}
												className={`relative text-lg before:absolute before:bottom-[-5px] before:left-0 before:h-[3px] before:w-0 before:bg-slate-950 before:transition-all before:duration-300 hover:before:w-full ${
													currentPath === item.name ? "before:w-full" : ""
												}`}
												key={item.id}
											>
												<NavLink to={`${item.link}`} className="cursor-pointer">
													{item.name}
												</NavLink>
											</motion.li>
										</>
									);
								})}
								{localStorage.getItem("token") && (
									<motion.button
										onClick={() => {
											localStorage.clear();
											window.location.reload();
										}}
										initial={{ opacity: 0, x: 100 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											delay: 0.2 * 3,
											ease: [0.17, 0.55, 0.55, 1],
										}}
										className={`relative text-lg before:absolute before:bottom-[-5px] before:left-0 before:h-[3px] before:w-0 before:bg-slate-950 before:transition-all before:duration-300 hover:before:w-full `}
									>
										Logout
									</motion.button>
								)}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			}
		</>
	);
}

export default NavBar;
