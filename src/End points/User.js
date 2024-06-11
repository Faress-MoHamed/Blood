import axios from "axios";
import toast from "react-hot-toast";

export const Sign_Up = async (values) => {
	try {
		const { data } = await axios.post(
			"http://localhost:3000/api/user/signup",
			values
		);
		return data;
	} catch (err) {
		toast.error(err.response.data.message || "Un expected Error", {
			className: "w-[450px] h-[75px] text-base p-2 uppperCase",
		});
	}
};
export const Sign_In = async (values) => {
	try {
		const { data } = await axios.post(
			"http://localhost:3000/api/user/login",
			values
		);
		return data;
	} catch (err) {
		toast.error(err.response.data.message || "Un expected Error", {
			className: "w-[450px] h-[75px] text-base p-2 uppperCase",
		});
	}
};
export const Reset_password = async (values) => {
	try {
		const { data } = await axios.post(
			"https://blood-donation-system-api.onrender.com/api/user/resetPassword",
			values
		);
		return data;
	} catch (err) {
		toast.error(err.response.data.message || "Un expected Error", {
			className: "w-[450px] h-[75px] text-base p-2 uppperCase",
		});
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

		toast.error(err.response.data.message || "Un expected Error", {
			className: "w-[450px] h-[75px] text-base p-2 uppperCase",
		});
	}
};
export const Search_Nearest_Donors = async (values) => {
	try {
		const { data } = await axios.post(
			"http://localhost:3000/api/user/patient/searchNearestDonors",
			values,
			{
				validateStatus: function (status) {
					// Accept status codes in the range of 200 to 399
					return status >= 200 && status < 400;
				},
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return data;
	} catch (error) {
		toast.error(error.response.data.message || "Un expected Error", {
			className: "w-[450px] h-[75px] text-base p-2 uppperCase",
		});
		return error;
	}
};
export const Updata_Role = async () => {
	try {
		const data = await axios.post(
			"https://blood-donation-system-api.onrender.com/api/user/updateRole",
			{ role: "donor" },

			{
				validateStatus: function (status) {
					// Accept status codes in the range of 200 to 399
					return status >= 200 && status < 400;
				},
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

		return data;
	} catch (error) {
		console.log(error);
	}
};
export const Updata_Role_Patient = async () => {
	try {
		const data = await axios.post(
			"https://blood-donation-system-api.onrender.com/api/user/updateRole",
			{ role: "patient" },

			{
				validateStatus: function (status) {
					// Accept status codes in the range of 200 to 399
					return status >= 200 && status < 400;
				},
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

		return data;
	} catch (error) {
		console.log(error);
	}
};
// export const Send_Donation_Request = async (id) => {
// 	try {
// 		const data = await axios.post(
// 			`http://localhost:3000/api/user/patient/requestDonations`
// 		);
// 	} catch (error) {}
// };
export const Forget_Password = async (values) => {
	try {
		const { data } = await axios.post(
			"https://blood-donation-system-api.onrender.com/api/user/forgotPassword",
			values
		);
		return data;
	} catch (err) {
		console.log(err);

		toast.error(err.response.data.message || "Un expected Error", {
			className: "w-[450px] h-[75px] text-base p-2 uppperCase",
		});
	}
};
export const Verify_Email = async (values) => {
	try {
		const { data } = await axios.post(
			"https://blood-donation-system-api.onrender.com/api/user/verfiyEmail",
			values,
			{
				validateStatus: function (status) {
					// Accept status codes in the range of 200 to 399
					return status >= 200 && status < 400;
				},

				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		toast.success("congrats now your Account  is verfied ");
		return data;
	} catch (err) {
		console.log(err);

		toast.error(err.response.data.message || "Un expected Error", {
			className: "w-[450px] h-[75px] text-base p-2 uppperCase",
		});
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

		const res = await axios.post(
			"https://blood-donation-system-api.onrender.com/api/user/sendVerficationCode",
			{},
			{
				validateStatus: function (status) {
					// Accept status codes in the range of 200 to 399
					return status >= 200 && status < 400;
				},
				headers: {
					Authorization: `Bearer ${token}`, // Use the token from the cookie
				},
			}
		);
		toast.success("Code sended succussfully");
	} catch (err) {
		toast.error(err.response.data.message || "Un expected Error", {
			className: "w-[450px] h-[75px] text-base p-2 uppperCase",
		});
	}
};
