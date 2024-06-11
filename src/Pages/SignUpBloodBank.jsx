import InputField from "../Components/InputField";
import * as Yup from "yup";
import { useFormik } from "formik";
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";

function SignUpBloodBank({ setIsOpen }) {


	const validationSchema = Yup.object({
		BloodBank: Yup.string()
			.min(2, "BloodBank must be at least 2 characters")
			.max(50, "BloodBank must be less than 50 characters")
			.required("BloodBank is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		ConfirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Confirm password is required"),
		MobileNumber: Yup.string()
			.matches(/^[0-9]+$/, "Mobile number must be only digits")
			.min(10, "Mobile number must be at least 10 digits")
			.max(15, "Mobile number must be less than 15 digits")
			.required("Mobile number is required"),
		Location: Yup.string()
			.min(2, "Location must be at least 2 characters")
			.max(100, "Location must be less than 100 characters")
			.required("Location is required"),
	});

	const formik = useFormik({
		initialValues: {
			BloodBank: "",
			password: "",
			ConfirmPassword: "",
			MobileNumber: "",
			Location: "",
		},
		validationSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});
	return (
		<motion.main
			initial={{ top: -100, opacity: 0 }}
			animate={{ top: 0, opacity: 1 }}
			exit={{ top: -100, opacity: 0 }}
			transition={{ duration: 0.5, type: "spring" }}
			className="signUpUser shadow-2xl bg-white relative overflow-y-scroll flex justify-center"
		>
			<button className="absolute right-6 top-6" onClick={() => setIsOpen("")}>
				<IoIosCloseCircle className="w-7 h-7 hover:text-black/70 duration-300" />
			</button>
			<div className="container w-[700px] p-8">
				<div className="">
					<h2 className="text-black sm:text-4xl text-2xl font-bold">
						Sign Up Now
					</h2>
				</div>
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-6 p-5"
				>
					<div className="flex flex-col w-full">
						<InputField
							name={"Blood Bank"}
							type={"text"}
							value={formik.values.BloodBank}
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
						/>
						<div className="ml-2">
							{formik.touched.BloodBank && formik.errors.BloodBank ? (
								<div className="text-red-600/80">{formik.errors.BloodBank}</div>
							) : null}
						</div>
					</div>

					<div className="flex flex-col w-full">
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
					</div>
					<div className="flex flex-col w-full">
						<InputField
							location={true}
							name={"Location"}
							type={"text"}
							value={formik.values.Location}
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
						/>
						{formik.touched.Location && formik.errors.Location ? (
							<div className="text-red-600/80 ml-2">
								{formik.errors.Location}
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
							name={"Confirm Password"}
							pass={true}
							type={"password"}
							value={formik.values.ConfirmPassword}
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
						/>
						{formik.touched.ConfirmPassword && formik.errors.ConfirmPassword ? (
							<div className="text-red-600/80 ml-2">
								{formik.errors.ConfirmPassword}
							</div>
						) : null}
					</div>
					<div>
						<div className="flex gap-4 items-center cursor-pointer">
							<input
								id="terms"
								type="checkbox"
								name="terms"
								onChange={formik.handleChange}
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
	);
}

export default SignUpBloodBank;
