import axios from "axios";

export const AxiosHandler = axios.create({
	baseURL: "https://blood-donation-system-api.onrender.com/api",
	timeout: 500000,
	validateStatus: function (status) {
		// Accept status codes in the range of 200 to 399
		return status >= 200 && status < 400;
	},
	headers: {
		"Cache-Control": "no-cache",
		Pragma: "no-cache",
		Expires: "0",
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	},
});
