import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
	const { auth } = useAuth();
	const location = useLocation();

	return auth ? (
		<Outlet />
	) : auth?.user ? (
		<Navigate to="/Services" state={{ from: location }} replace />
	) : (
		<Navigate to="/sign" state={{ from: location }} replace />
	);
};

export default RequireAuth;
