import useAuth from "../hooks/useAuth";
import ServicesBloodBank from "./ServicesBloodBank";
import ServicesUser from "./ServicesUser";

const ServicesRoleBased = () => {
	const { auth } = useAuth();
	return auth.user?.role !== "bloodBank" ? (
		<ServicesUser />
	) : (
		<ServicesBloodBank />
	);
};

export default ServicesRoleBased;
