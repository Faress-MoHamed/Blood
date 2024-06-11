import { Link, useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Sign_In } from "../End points/User";
import toast from "react-hot-toast";
import { AddToLocalStorage } from "../hooks/AddToLocalStorage";
import { useState } from "react";

function SignIn({ setIsOpen }) {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

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
			console.log(res);
			if (res.status === "success") {
				AddToLocalStorage("token", res.token, 90 * 24 * 60 * 60 * 1000);
				AddToLocalStorage(
					"user",
					JSON.stringify(res.data.user, 90 * 24 * 60 * 60 * 1000)
				);
				navigate("/");
				window.location.reload();
				toast.success("Sign In Successfully ✔👏", {
					className: "w-[450px] h-[75px] text-2xl p-2 uppperCase",
				});
			}
		},
	});
	return (
		<motion.main
			initial={{ top: -100, opacity: 0 }}
			animate={{ top: 0, opacity: 1 }}
			exit={{ top: -100, opacity: 0 }}
			transition={{ duration: 0.5, type: "spring" }}
			className="shadow-2xl bg-white signIn relative flex justify-center items-center w-[750px] rounded-lg "
		>
			<button
				className="absolute right-10 top-10"
				onClick={() => setIsOpen(false)}
			>
				<IoIosCloseCircle className="w-7 h-7 hover:text-black/70 duration-300" />
			</button>
			<div className="container w-[700px] p-8">
				<div className="">
					<h2 className="text-black sm:text-4xl text-2xl font-bold">
						Sign In Now
					</h2>
				</div>
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-6 p-5"
				>
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
							<div className="text-red-600/80 ml-2">
								{formik.errors.password}
							</div>
						) : null}
					</div>{" "}
					<div className="text-right">
						<Link className="text-primary-600">forget your password?</Link>
					</div>
					<div className="flex justify-center">
						<button
							type="submit"
							disabled={loading}
							className={`${
								loading
									? "bg-slate-400 text-black"
									: "bg-primary-600 text-white"
							} rounded-full  w-[240px] h-[53px] font-semibold`}
						>
							Sign In
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
			</div>
		</motion.main>
	);
}

export default SignIn;
