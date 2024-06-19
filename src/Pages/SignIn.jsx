import { Link, useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Sign_In } from "../End points/User";
import toast from "react-hot-toast";
import { useState } from "react";
import useAuth from "./../hooks/useAuth";

function SignIn({ setIsOpen }) {
	const [loading, setLoading] = useState(false);
	// const [UserAuth, setUserAuth] = useLocalStorage("user", "");
	// const [TokenAuth, setTokenAuth] = useLocalStorage("token", "");
	const navigate = useNavigate();
	const { setAuth } = useAuth();

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			const res = await Sign_In(values);
			setLoading(false);
			if (res.status === "success") {
				console.log("Sign-In Response:", res);
				localStorage.setItem("user", JSON.stringify(res.data.user));
				localStorage.setItem("token", res.token);
				setAuth(res.data);
				// console.log("UserAuth:", UserAuth);
				// console.log("TokenAuth:", TokenAuth);
				navigate("/");
				toast.success("Sign In Successfully ");
			} else {
				toast.error("Sign In Failed");
				setIsOpen(null);
			}
		},
	});

	return (
		<>
			<div className="">
				<h2 className="text-black sm:text-4xl text-2xl font-bold">
					Sign In Now
				</h2>
			</div>
			<form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 p-5">
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
				<div className="text-right">
					<button
						onClick={() => setIsOpen("verify")}
						className="text-primary-600"
					>
						forget your password?
					</button>
				</div>
				<div className="flex justify-center">
					<button
						type="submit"
						disabled={loading}
						className={`${
							loading ? "bg-black/25 text-white" : "bg-primary-600 text-white"
						} rounded-full  w-[240px] h-[53px] font-semibold`}
					>
						{loading ? "Loading..." : "Sign In"}
					</button>
				</div>
				<div className="flex justify-center">
					<p>
						Don’t Have An Account?{" "}
						<Link className="text-primary-600" to={"/"}>
							sign up
						</Link>
					</p>
				</div>
			</form>
		</>
	);
}

export default SignIn;
