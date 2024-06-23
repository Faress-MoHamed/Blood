import { motion } from "framer-motion";
import Header from "./Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Reset_password } from "../End points/User";
function ResetPassword({ setIsOpen }) {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const validationSchema = Yup.object({});
	const formik = useFormik({
		initialValues: {
			resetCode: "",
			confirmPassword: "",
			password: "",
		},
		validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			setIsOpen("Reset")
			const res = await Reset_password(values);
			setLoading(false);
			console.log(res);
			if (res.status === "success") {
				navigate("/");
				toast.success("Reset Successfully");
			}
		},
	});
	return (
		<>
				<div className="">
					<Header sizelg={"3xl"} sizesm={"lg"}>
						Reset Password
					</Header>
			</div>
			{/* */}
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-6 p-5"
				>
					<div className="item">
						<InputField
							handleBlur={formik.handleBlur}
							name={"reset Code"}
							handleChange={formik.handleChange}
							type={"number"}
							value={formik.values.resetCode}
						/>
					</div>
					<div className="item">
						<InputField
							handleBlur={formik.handleBlur}
							name={"password"}
							handleChange={formik.handleChange}
							type={"password"}
							pass={true}
							value={formik.values.password}
						/>
					</div>
					<div className="item">
						<InputField
							handleBlur={formik.handleBlur}
							name={"confirmPassword"}
							handleChange={formik.handleChange}
							type={"password"}
							pass={true}
							value={formik.values.confirmPassword}
						/>
					</div>
					<div className="item text-center">
						<button
							disabled={loading}
							className={`rounded-full ${
								loading ? "bg-black/15 " : "bg-primary-600 hover:bg-primary-700"
							} duration-300 transition-colors text-white w-[240px] h-[53px] font-semibold`}
						>
							Reset Password
						</button>
					</div>
				</form>
		</>
	);
}

export default ResetPassword;
