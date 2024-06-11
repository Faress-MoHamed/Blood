import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import SelectType from "./Pages/SelectType";
import Home from "./Pages/Home";
import ServicesUser from "./Pages/ServicesUser";
import Profile from "./Pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
// import ValidationCode from "./Pages/ValidationCode";

function App() {
	const token = localStorage.getItem("token");
	let decodedToken = null;
	try {
		if (token) {
			decodedToken = jwtDecode(token);
		}
	} catch (error) {
		console.log("Failed to decode token", error);
	}

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
					element: decodedToken ? <ServicesUser /> : <SelectType />,
				},
				{
					path: "/Profile",
					element: decodedToken ? <Profile /> : <SelectType />,
				},
			],
		},
	];

	const router = createBrowserRouter(routes);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000,
				refetchOnReconnect: true,
				refetchOnWindowFocus: true,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<Toaster position="top-right" />
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
