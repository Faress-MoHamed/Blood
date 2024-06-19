import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(
		localStorage.getItem("user")
			? {
					user: { ...JSON.parse(localStorage.getItem("user")) },
					token: localStorage.getItem("token"),
			  }
			: {}
	);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
