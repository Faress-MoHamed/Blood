import axios from "axios";
import toast from "react-hot-toast";
import { AxiosHandler } from "./AxiosHandler";
//auth file
export const Sign_Up = async (values) => {
	try {
		const { data } = await AxiosHandler.post("user/signup", values);
		return data;
	} catch (err) {
		toast.error(err?.response?.data?.message || "Un expected Error");
	}
};
export const Sign_In = async (values) => {
	try {
		const { data } = await AxiosHandler.post("user/login", values);
		return data;
	} catch (err) {
		toast.error(err?.response?.data?.message || "Un expected Error");
	}
};
export const Reset_password = async (values) => {
	try {
		const { data } = await AxiosHandler.post("user/resetPassword", values);
		return data;
	} catch (err) {
		toast.error(err?.response?.data?.message || "Un expected Error");
	}
};

export const Forget_Password = async (values) => {
	try {
		const {
			data: { message },
		} = await AxiosHandler.post("user/forgotPassword", values);
		toast.success(message);
		return message;
	} catch (err) {
		console.log(err);

		toast.error(err?.response?.data?.message || "Un expected Error");
	}
};
export const Verify_Email = async (values) => {
	try {
		const { data } = await AxiosHandler.post("user/verfiyEmail", values, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		toast.success("congrats now your Account  is verfied ");
		return data;
	} catch (err) {
		console.log(err);

		toast.error(err?.response?.data?.message || "Un expected Error");
	}
};
const getCookie = (name) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
	return null;
};
export const Send_verification_code = async (values) => {
	try {
		const token = getCookie("jwt");

		const data = await AxiosHandler.post(
			"user/sendVerficationCode",
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`, // Use the token from the cookie
				},
			}
		);
		console.log(data);
		toast.success("Code sended succussfully");
	} catch (err) {
		toast.error(err?.response?.data?.message || "Un expected Error");
	}
};
export const Send_Request_to_donor = async (values) => {
	try {
		const token = getCookie("jwt");
		await AxiosHandler.post(
			`user/patient/requestDonations`,
			{ donors: values },
			{
				headers: {
					Authorization: `Bearer ${token}`, // Use the token from the cookie
				},
			}
		);
		toast.success("You Succeffuly Sent Donations Requests");
	} catch (err) {
		console.log(err);
		toast.error(err?.response?.data?.message || "Un expected Error");
	}
};
export const Donation_Requests = async () => {
	try {
		const res = await AxiosHandler.get(`user/donor/sentedRequests`, {
			validateStatus: function (status) {
				return status >= 200 && status < 400;
			},
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});

		return res;
	} catch (err) {
		toast.error(err?.response?.data?.message || "Un expected Error");
	}
};
export const Accepted_Requests = async () => {
	try {
		const res = await AxiosHandler.get(`user/patient/acceptedRequests`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the token from the cookie
			},
		});
		console.log(res);
		return res;
	} catch (err) {
		toast.error(err?.response?.data?.message || "Un expected Error");
	}
};
export const Check_Health = async (values) => {
	try {
		const { data } = await axios.post(
			"http://3.248.215.156:8080/predict",
			values
		);
		return data;
	} catch (err) {
		console.log(err);

		toast.error(err?.response?.data?.message || "Un expected Error");
	}
};
export const Search_Nearest_Donors = async (values) => {
	try {
		const { data } = await AxiosHandler.post(
			"user/patient/searchNearestDonors",
			values,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return data;
	} catch (err) {
		toast.error(err?.response?.data?.message || "Un expected Error");
		return err;
	}
};
export const Updata_Role_donor = async () => {
	try {
		const { data } = await AxiosHandler.post(
			"user/updateRole",
			{ role: "donor" },

			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		// Retrieve the existing user data from localStorage
		const existingUser = JSON.parse(localStorage.getItem("user")) || {};

		// Update the user data with the new role
		const updatedUser = {
			...existingUser,
			role: "donor",
		};

		// Save the updated user data back to localStorage
		localStorage.setItem("user", JSON.stringify(updatedUser));
		toast.success(data);

		return data;
	} catch (error) {
		console.log(error);
	}
};
export const Updata_Role_Patient = async () => {
	try {
		const { data } = await AxiosHandler.post(
			"user/updateRole",
			{ role: "patient" },

			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		// Retrieve the existing user data from localStorage
		const existingUser = JSON.parse(localStorage.getItem("user")) || {};

		// Update the user data with the new role
		const updatedUser = {
			...existingUser,
			role: "patient",
		};

		// Save the updated user data back to localStorage
		localStorage.setItem("user", JSON.stringify(updatedUser));
		toast.success(data);
		return data;
	} catch (error) {
		console.log(error);
	}
};
export const Updata_Request = async (id, status) => {
	try {
		const { data } = await AxiosHandler.post(
			`user/donor/updateRequest/${id}/${status}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		data.message === "error"
			? toast.error(data.message)
			: toast.success(data?.message);

		return data;
	} catch (err) {
		toast.error(err?.response?.data?.message || "Un expected Error");
		return err;
	}
};
export const Donation_Check = async (id, values) => {
	try {
		const data = await AxiosHandler.post(
			`user/donor/updateDonationCheck/${id}`,
			{ values },
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return data;
	} catch (error) {
		toast.error(error.response.data.message || "Un expected Error");
		return error;
	}
};
export const getDonationCamps = async () => {
	try {
		const data = await AxiosHandler.get(`user/bloodBank/getDonationCamps`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return data;
	} catch (error) {
		toast.error(error.response.data.message || "Un expected Error");
		return error;
	}
};
export const getAcceptsCamps = async (id) => {
	try {
		const data = await AxiosHandler.get(
			`user/bloodBank/acceptedRequests/${id}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return data;
	} catch (error) {
		toast.error(error.response.data.message || "Un expected Error");
		return error;
	}
};
export const CreateCamp = async (values) => {
	try {
		const data = await AxiosHandler.post(
			`user/bloodBank/createDonationCamp`,
			values,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		console.log(data);
		return data;
	} catch (error) {
		toast.error(error.response.data.message || "Un expected Error");
		return error;
	}
};
export const UploadPhoto = async (values) => {
	try {
		const { data } = await AxiosHandler.post("user/upload", values, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		const existingUser = JSON.parse(localStorage.getItem("user")) || {};
		const updatedUser = {
			...existingUser,
			...data,
		};

		// Save the updated user data back to localStorage
		localStorage.setItem("user", JSON.stringify(updatedUser));
		return data;
	} catch (error) {
		// console.log(error.response.data.message.message);
		toast.error(error.response.data.message.message || "Un expected Error");
		return error;
	}
};
