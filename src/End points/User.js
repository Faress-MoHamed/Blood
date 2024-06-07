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
		toast.error(err.response.data.message || "Error", {
			className: "w-[450px] h-[75px] text-2xl p-2 uppperCase",
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
		toast.error(err.response.data.message || "Error", {
			className: "w-[450px] h-[75px] text-2xl p-2 uppperCase",
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
		toast.error(err.response.data.message || "Error", {
			className: "w-[450px] h-[75px] text-2xl p-2 uppperCase",
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

		toast.error(err.response.data.message || "Error", {
			className: "w-[450px] h-[75px] text-2xl p-2 uppperCase",
		});
	}
};
