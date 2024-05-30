import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import SelectType from "./Pages/SelectType";
import Home from "./Pages/Home";
import ServicesUser from "./Pages/ServicesUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Profile from "./Pages/Profile";
import { useEffect } from "react";

function App() {
	useEffect(() => { 
		
	}
	,[])
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					index: true,
					path: "/",
					element: <Home/>,
				},

				{
					path: "/Services",
					element: localStorage.getItem("token") ? (
						<ServicesUser />
					) : (
						<SelectType />
					),
				},
				{
					path: "/Profile",
					element: localStorage.getItem("token") ? <Profile /> : <SelectType />,
				},
			],
		},
	]);
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
