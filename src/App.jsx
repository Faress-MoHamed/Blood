import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout";
import SelectType from "./Pages/SelectType";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./Context/AuthProvider";
import RequireAuth from "./Components/RequireAuth";
import ServicesUser from "./Pages/ServicesUser";
import Profile from "./Pages/Profile";
import ServicesBloodBank from "./Pages/ServicesBloodBank";

function App() {
	return (
		<AuthProvider>
			<Toaster position="top-right" />
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />} path="/">
						<Route element={<Home />} index={true} path="/" />
						<Route element={<RequireAuth />} path="/">
							{JSON.parse(localStorage.getItem("user") || {})?.role !==
							"bloodBank" ? (
								<Route element={<ServicesUser />} path="/Services" />
							) : (
								<Route element={<ServicesBloodBank />} path="/Services" />
							)}
						</Route>
						<Route element={<RequireAuth />} path="/">
							<Route element={<Profile />} path="/Profile" />
						</Route>
						<Route path="/sign" element={<SelectType />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
