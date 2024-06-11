import InputField from "../Components/InputField";
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";

function VerifyEmail({ setIsOpen }) {
	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
	});
	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema,
		onSubmit: async () => {
			setIsOpen("otp");
		},
	});
	return (
		<motion.main
			initial={{ top: -100, opacity: 0 }}
			animate={{ top: 0, opacity: 1 }}
			exit={{ top: -100, opacity: 0 }}
			transition={{ duration: 0.5, type: "spring" }}
			className="shadow-2xl bg-white signIn relative flex flex-col justify-center items-center w-[750px] rounded-lg "
		>
			<div className="flex justify-between">
				<button
					className="absolute right-10 top-10"
					onClick={() => setIsOpen(false)}
				>
					<IoIosCloseCircle className="w-7 h-7 hover:text-black/70 duration-300" />
				</button>
				<div className="">
					<h2 className="text-black sm:text-4xl text-2xl font-bold">
						Forget My password
					</h2>
				</div>
			</div>
			<div className="container w-[700px] p-8">
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

					<div className="flex justify-center">
						<button
							type="submit"
							className={`${
									"bg-primary-600 text-white"
							} rounded-full  w-[240px] h-[53px] font-semibold`}
						>
							Send verifivation Code
						</button>
					</div>
					<div className="flex justify-center">
						<p>
							You have account Already{" "}
							<button
								onClick={() => setIsOpen("login")}
								className="text-primary-600"
							>
								sign In
							</button>
						</p>
					</div>
				</form>
			</div>
		</motion.main>
	);
}

export default VerifyEmail;
