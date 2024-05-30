import { Outlet, useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import NavBar from "../Components/Navbar";

function Layout() {
	const Navigate = useNavigate();
	const currentPath = window.location.pathname.slice(1);

	return (
		<>
			{(currentPath === "signIn" ||
				currentPath === "signUp-User" ||
				currentPath === "signUp-bloodBank") &&
				currentPath && (
					<p className="absolute lg:left-12 lg:top-12 left-5 top-10">
						<span
							onClick={() => Navigate(-1)}
							className="flex items-center gap-2 underline text-black hover:text-blue-600 transition-colors duration-300 text-lg cursor-pointer"
						>
							<FaArrowAltCircleLeft className="lg:w-6 lg:h-6 w-8 h-8" />
							<span className="lg:block hidden">Go Back</span>
						</span>
					</p>
				)}
			<NavBar />
			<Outlet />
		</>
	);
}

export default Layout;
