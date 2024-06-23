import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout";
import SelectType from "./Pages/SelectType";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./Context/AuthProvider";
import RequireAuth from "./Components/RequireAuth";
import Profile from "./Pages/Profile";
import ServicesRoleBased from "./Pages/ServicesRoleBased";

function App() {
	return (
		<AuthProvider>
			<Toaster position="top-right" />
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />} path="/">
						<Route element={<Home />} index={true} path="/" />
						<Route element={<RequireAuth />} path="/">
							<Route path="/Services" element={<ServicesRoleBased />} />
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
