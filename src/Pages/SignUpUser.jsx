import Header from "../Components/Header";
import InputField from "../Components/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";
import { Sign_Up } from "../End points/User";
import toast from "react-hot-toast";
import { AddToLocalStorage } from "../hooks/AddToLocalStorage";
import { useNavigate } from "react-router-dom";

function SignUpUser({ setIsOpen }) {
	const navigate = useNavigate();

	const validationSchema = Yup.object({
		username: Yup.string()
			.min(2, "username must be at least 2 characters")
			.max(50, "username must be less than 50 characters")
			.required("username is required"),
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Confirm password is required"),
		// bloodType: Yup.string()
		// 	.matches(/^(A|B|AB|O)[+-]$/, "Invalid blood type")
		// 	.required("Blood type is required"),
		address: Yup.string().required("address is required"),
		country: Yup.string().required("country is required"),
		// terms: Yup.boolean().oneOf(
		// 	[true],
		// 	"You must accept the terms and conditions"
		// ),
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
			console.log(values);
			const res = await Sign_Up(values);
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
		<>
			<motion.main
				initial={{ top: -100, opacity: 0 }}
				animate={{ top: 0, opacity: 1 }}
				exit={{ top: -100, opacity: 0 }}
				transition={{ duration: 0.5, type: "spring" }}
				className="signUpUser shadow-2xl bg-white relative overflow-y-scroll flex justify-center"
			>
				<button
					className="absolute right-6 top-6"
					onClick={() => setIsOpen("")}
				>
					<IoIosCloseCircle className="w-7 h-7 hover:text-black/70 duration-300" />
				</button>
				<div className="container w-[700px] p-8">
					<div className="">
						<Header>Sign Up Now</Header>
					</div>
					<form
						onSubmit={formik.handleSubmit}
						className="flex flex-col gap-6 p-5"
					>
						<div className="flex flex-col w-full">
							<div className="sides w-full md:flex-row flex-col gap-5 flex justify-between items-center">
								<InputField
									name={"user name"}
									type={"text"}
									value={formik.values.username}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
								/>
							</div>
							<div className="ml-2">
								{formik.touched.username && formik.errors.username ? (
									<div className="text-red-600/80">
										{formik.errors.username}
									</div>
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
								<div className="text-red-600/80 ml-2">
									{formik.errors.email}
								</div>
							) : null}
						</div>
						{/* <div className="flex flex-col w-full">
							<InputField
								name={"Mobile Number"}
								type={"text"}
								value={formik.values.MobileNumber}
								handleChange={formik.handleChange}
								handleBlur={formik.handleBlur}
							/>
							{formik.touched.MobileNumber && formik.errors.MobileNumber ? (
								<div className="text-red-600/80 ml-2">
									{formik.errors.MobileNumber}
								</div>
							) : null}
						</div> */}
						<div className="flex flex-col w-full">
							<InputField
								name={"address"}
								type={"text"}
								value={formik.values.address}
								handleChange={formik.handleChange}
								handleBlur={formik.handleBlur}
							/>
							{formik.touched.address && formik.errors.address ? (
								<div className="text-red-600/80 ml-2">
									{formik.errors.address}
								</div>
							) : null}
						</div>
						{/* <div className="flex flex-col gap-[4px] font-Poppins">
							<label
								htmlFor="bloodType"
								className="text-base capitalize font-[400] text-[#666666]"
							>
								Select Blood Type
							</label>
							<div className="relative">
								<div className="flex flex-col w-full">
									<BloodTypeSelect
										value={formik.values.bloodType}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
									/>
								</div>

								{formik.touched.bloodType && formik.errors.bloodType ? (
									<div className="text-red-600/80 ml-2">
										{formik.errors.bloodType}
									</div>
								) : null}
							</div>
						</div> */}
						<div className="flex flex-col gap-[4px] font-Poppins">
							<InputField
								name={"country"}
								handleBlur={formik.handleBlur}
								handleChange={formik.handleChange}
								type={"text"}
								value={formik.values.country}
							/>
							{formik.touched.country && formik.errors.country ? (
								<div className="text-red-600/80 ml-2">
									{formik.errors.country}
								</div>
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
						</div>
						<div className="flex flex-col w-full">
							<InputField
								name={"confirm Password"}
								pass={true}
								type={"password"}
								value={formik.values.ConfirmPassword}
								handleChange={formik.handleChange}
								handleBlur={formik.handleBlur}
							/>
							{formik.touched.confirmPassword &&
							formik.errors.confirmPassword ? (
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
								className="rounded-full bg-primary-600 text-white w-[240px] h-[53px] font-semibold"
							>
								Complete Register
							</button>
						</div>
					</form>
				</div>
			</motion.main>
		</>
	);
}

export default SignUpUser;
// {
// 	/* <select
// 												id="bloodType"
// 												name="bloodType"
// 												onChange={handleChange}
// 												value={initialValues.bloodType}
// 												className="placeholder:text-base placeholder:text-[#111111]/40 border py-[15px] px-[24px] focus:outline-none border-[#5E5E5E]/35 rounded-[12px] h-[56px] w-full"
// 											>
// 												<option value="" disabled>
// 													Select your blood type
// 												</option>
// 												<option value="A+">A+</option>
// 												<option value="A-">A-</option>
// 												<option value="B+">B+</option>
// 												<option value="B-">B-</option>
// 												<option value="AB+">AB+</option>
// 												<option value="AB-">AB-</option>
// 												<option value="O+">O+</option>
// 												<option value="O-">O-</option>
// 											</select> */
// }
// {
// 	/* <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
// 									<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
// 										<svg
// 											className="w-5 h-5 text-black"
// 											xmlns="http://www.w3.org/2000/svg"
// 											fill="none"
// 											viewBox="0 0 24 24"
// 											stroke="currentColor"
// 										>
// 											<path
// 												strokeLinecap="round"
// 												strokeLinejoin="round"
// 												strokeWidth="2"
// 												d="M19 9l-7 7-7-7"
// 											/>
// 										</svg>
// 									</div>
// 								</div> */
// }
