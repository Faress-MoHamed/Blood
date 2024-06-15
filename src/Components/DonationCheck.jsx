import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";
import { DNA } from "react-loader-spinner";
import Header from "./Header";
import { useState } from "react";
import { Donation_Check } from "../End points/User";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import toast from "react-hot-toast";

function DonationCheck({ setIsOpen, IsID }) {
	const [loading, setLoading] = useState(null);

	const validationSchema = Yup.object({
		donationCheck: Yup.string().required("donationCheck is required"),
	});
	const formik = useFormik({
		initialValues: {
			donationCheck: "",
		},
		validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			const { data } = await Donation_Check(IsID, values);
			toast.success(data);
			setLoading(false);
			data && setIsOpen(null);
		},
	});
	return (
		<motion.main
			initial={{ top: -100, opacity: 0 }}
			animate={{ top: 0, opacity: 1 }}
			exit={{ top: -100, opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="signUpUser shadow-2xl bg-white relative overflow-y-auto flex justify-center z-[999999] lg:w-full w-[80%]"
		>
			<button className="absolute right-6 top-6" onClick={() => setIsOpen("")}>
				<IoIosCloseCircle className="w-7 h-7 hover:text-black/70 duration-300" />
			</button>
			<div className="container w-[700px] p-8">
				{" "}
				<div className="text-[10px]">
					<Header sizelg={"2xl"} sizesm={"xl"}>
						Donation Check
					</Header>
				</div>
				{loading ? (
					<div className="flex items-center justify-center h-4/5">
						<DNA
							visible={true}
							height="80"
							width="80"
							ariaLabel="dna-loading"
							wrapperStyle={{}}
							wrapperClass="dna-wrapper"
						/>
					</div>
				) : (
					<form
						onSubmit={formik.handleSubmit}
						className="flex flex-col gap-6 p-5"
					>
						<div className="flex flex-col w-full">
							<label
								htmlFor="donationCheck"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								donationCheck
							</label>
							<textarea
								id="donationCheck"
								name="donationCheck"
								rows="20"
								className={`resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
									formik.touched.donationCheck && formik.errors.donationCheck
										? "border-red-500"
										: ""
								}`}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.donationCheck}
							/>
							{formik.touched.donationCheck && formik.errors.donationCheck ? (
								<p className="text-red-500 text-xs italic">
									{formik.errors.donationCheck}
								</p>
							) : null}
						</div>
						<div className="flex justify-center">
							<button
								type="submit"
								disabled={loading}
								className={`${
									loading
										? "bg-black/25 text-white"
										: "bg-primary-600 text-white"
								} rounded-full  w-[240px] h-[53px] font-semibold`}
							>
								{loading ? "Loading..." : "Sign In"}
							</button>
						</div>
					</form>
				)}
			</div>
		</motion.main>
	);
}

export default DonationCheck;
