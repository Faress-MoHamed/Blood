import InputField from "../Components/InputField";
import * as Yup from "yup";
import { useFormik } from "formik";
import Header from "../Components/Header";
import toast from "react-hot-toast";
import { Sign_Up } from "../End points/User";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useAuth from "../hooks/useAuth";

function SignUpBloodBank({ setIsOpen }) {
	const [loading, setLoading] = useState(false);
	const { setAuth } = useAuth();

	const navigate = useNavigate();

	const validationSchema = Yup.object({
		username: Yup.string()
			.min(2, "Username must be at least 2 characters")
			.max(50, "Username must be less than 50 characters")
			.required("Username is required"),
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Confirm password is required"),
		address: Yup.string().required("Address is required"),
		country: Yup.string().required("Country is required"),
	});

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			country: "",
			address: "",
		},
		validationSchema,
		onSubmit: async (values) => {
			try {
				setLoading(true);
				const res = await Sign_Up({ ...values, role: "bloodBank" });
			if (res.status === "success") {
				localStorage.setItem("user", JSON.stringify(res.data.user));
				localStorage.setItem("token", res.token);
				if (typeof Cookies !== "undefined" && res && res.token) {
					Cookies.set("jwt", res.token);
				} else {
					console.error(
						"Cookies library is not loaded or res.token is undefined"
					);
				}
				setAuth(res.data);
				navigate("/");
				toast.success("Sign Up Successfully ");
				setIsOpen(null);
			} else {
				setIsOpen(null);
				toast.error("Sign Up Failed");
			}
			} catch (error) {
				console.error(error);
				toast.error("An error occurred during sign up");
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<>
			<Header>Sign Up Now</Header>
			<form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 p-5">
				<div className="flex flex-col w-full">
					<div className="sides w-full md:flex-row flex-col gap-5 flex justify-between items-center">
						<InputField
							name={"username"}
							type={"text"}
							value={formik.values.username}
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
						/>
					</div>
					<div className="ml-2">
						{formik.touched.username && formik.errors.username ? (
							<div className="text-red-600/80">{formik.errors.username}</div>
						) : null}
					</div>
				</div>

				<div className="flex flex-col w-full">
					<InputField
						name={"email"}
						type={"email"}
						value={formik.values.email}
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
					/>
					{formik.touched.email && formik.errors.email ? (
						<div className="text-red-600/80 ml-2">{formik.errors.email}</div>
					) : null}
				</div>

				<div className="flex flex-col w-full">
					<InputField
						name={"address"}
						type={"text"}
						value={formik.values.address}
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
					/>
					{formik.touched.address && formik.errors.address ? (
						<div className="text-red-600/80 ml-2">{formik.errors.address}</div>
					) : null}
				</div>

				<div className="flex flex-col gap-[4px] font-Poppins">
					<InputField
						name={"country"}
						handleBlur={formik.handleBlur}
						handleChange={formik.handleChange}
						type={"text"}
						value={formik.values.country}
					/>
					{formik.touched.country && formik.errors.country ? (
						<div className="text-red-600/80 ml-2">{formik.errors.country}</div>
					) : null}
				</div>

				<div className="flex flex-col w-full">
					<InputField
						name={"password"}
						pass={true}
						type={"password"}
						value={formik.values.password}
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
					/>
					{formik.touched.password && formik.errors.password ? (
						<div className="text-red-600/80 ml-2">{formik.errors.password}</div>
					) : null}
				</div>

				<div className="flex flex-col w-full">
					<InputField
						name={"confirmPassword"}
						pass={true}
						type={"password"}
						value={formik.values.confirmPassword}
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
					/>
					{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
						<div className="text-red-600/80 ml-2">
							{formik.errors.confirmPassword}
						</div>
					) : null}
				</div>

				<div>
					<div className="flex gap-4 items-center cursor-pointer">
						<input
							id="terms"
							type="checkbox"
							name="terms"
							required
							className="accent-primary-500 outline-none bg-black w-4 h-4"
						/>
						<label htmlFor="terms">I agree to terms and conditions</label>
					</div>
				</div>

				<div className="flex justify-center">
					<button
						type="submit"
						disabled={loading}
						className={`${
							loading ? "bg-black/25 text-white" : "bg-primary-600 text-white"
						} rounded-full  w-[240px] h-[53px] font-semibold`}
					>
						{loading ? "Loading..." : "Complete Register"}
					</button>
				</div>
			</form>
		</>
	);
}

export default SignUpBloodBank;
