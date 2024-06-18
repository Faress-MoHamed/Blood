import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import SelectType from "./Pages/SelectType";
import Home from "./Pages/Home";
import ServicesUser from "./Pages/ServicesUser";
import Profile from "./Pages/Profile";
import { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { AuthProvider } from "./Context/AuthProvider";
import ServicesBloodBank from "./Pages/ServicesBloodBank";
// import ValidationCode from "./Pages/ValidationCode";

function App() {
	const [decodedToken, setDecodedToken] = useState(null);

	useEffect(() => {
		try {
			const token = window.localStorage.getItem("token");
			if (token) {
				const decoded = jwtDecode(token);
				setDecodedToken(decoded);
			}
		} catch (error) {
			console.log("Failed to decode token", error);
		}
	}, []);

	const routes = [
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					index: true,
					path: "/",
					element: <Home />,
				},
				{
					path: "/Services",
					element: decodedToken ? (
						JSON.parse(window.localStorage.getItem("user"))?.role ===
						"bloodBank" ? (
							<ServicesBloodBank />
						) : (
							<ServicesUser />
						)
					) : (
						<SelectType />
					),
				},
				{
					path: "/Profile",
					element: decodedToken ? <Profile /> : <SelectType />,
				},
			],
		},
	];

	const router = createBrowserRouter(routes);

	return (
		<AuthProvider>
			<Toaster position="top-right" />
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default App;
