import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const RequireAuth = () => {
	const location = useLocation();
	const { auth } = useAuth();
	// console.log(auth);

	return (
		<>
			{auth?.user ? (
				<Outlet />
			) : (
				<Navigate to="/sign" state={{ from: location }} replace />
			)}
		</>
	);
};
export default RequireAuth;
