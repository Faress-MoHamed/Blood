import { IoIosCloseCircle } from "react-icons/io";
import Header from "./Header";
import InputField from "./InputField";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import BloodTypeSelect from './BloodTypeSelect';

function SearchNearstDonors({ setIsOpen }) {
	const navigate = useNavigate();
	{
		/**{
    "maxDistance":10000000,
    "hospitalAddress":"alexandria mahta el raml",
    "hospitalName":"elshatby hospital",
    "bloodUnits":10,
    "nationalId":1211132121,
    "bloodGroup":"A+"
}
 */
	}
	const validationSchema = Yup.object({
		maxDistance: Yup.number().required("maxDistance is required"),
		hospitalAddress: Yup.string().required("hospitalAddress is required"),
		hospitalName: Yup.string().required("hospitalName is required"),
		bloodGroup: Yup.string()
			.matches(/^(A|B|AB|O)[+-]$/, "Invalid bloodGroup")
			.required("bloodGroup is required"),
		bloodUnits: Yup.number().required("bloodUnits is required"),
		nationalId: Yup.number().required("nationalId is required"),
	});
	const formik = useFormik({
		initialValues: {
			maxDistance: "",
			hospitalAddress: "",
			hospitalName: "",
			bloodUnits: "",
			nationalId: "",
			bloodGroup: "",
		},
		validationSchema,
		onSubmit: async (values) => {},
	});
	return (
		<>
			<motion.main
				initial={{ top: -100, opacity: 0 }}
				animate={{ top: 0, opacity: 1 }}
				exit={{ top: -100, opacity: 0 }}
				transition={{ duration: 0.5, type: "spring" }}
				className="signUpUser shadow-2xl bg-white relative overflow-y-scroll flex justify-center z-[999999]"
			>
				<button
					className="absolute right-6 top-6"
					onClick={() => setIsOpen("")}
				>
					<IoIosCloseCircle className="w-7 h-7 hover:text-black/70 duration-300" />
				</button>
				<div className="container w-[700px] p-8">
					<div className="text-[10px]">
						<Header>I'm Need Donors</Header>
					</div>
					<form
						onSubmit={formik.handleSubmit}
						className="flex flex-col gap-6 p-5"
					>
						<div className="flex flex-col w-full">
							<div className="sides w-full md:flex-row flex-col gap-5 flex justify-between items-center">
								<InputField
									name={"maxDistance"}
									type={"number"}
									value={formik.values.maxDistance}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
								/>
							</div>
							<div className="ml-2">
								{formik.touched.maxDistance && formik.errors.maxDistance ? (
									<div className="text-red-600/80">
										{formik.errors.maxDistance}
									</div>
								) : null}
							</div>
						</div>

						<div className="flex flex-col w-full">
							<InputField
								name={"hospitalAddress"}
								type={"text"}
								value={formik.values.hospitalAddress}
								handleChange={formik.handleChange}
								handleBlur={formik.handleBlur}
							/>
							{formik.touched.hospitalAddress &&
							formik.errors.hospitalAddress ? (
								<div className="text-red-600/80 ml-2">
									{formik.errors.hospitalAddress}
								</div>
							) : null}
						</div>
						<div className="flex flex-col w-full">
							<InputField
								name={"hospitalName"}
								type={"text"}
								value={formik.values.hospitalName}
								handleChange={formik.handleChange}
								handleBlur={formik.handleBlur}
							/>
							{formik.touched.hospitalName && formik.errors.hospitalName ? (
								<div className="text-red-600/80 ml-2">
									{formik.errors.hospitalName}
								</div>
							) : null}
						</div>
						<div className="flex flex-col gap-[4px] font-Poppins">
							<label
								htmlFor="bloodType"
								className="text-base capitalize font-[400] text-[#666666]"
							>
								Select Blood Type
							</label>
							<div className="relative">
								<div className="flex flex-col w-full">
									<BloodTypeSelect
										value={formik.values.bloodGroup}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
									/>
								</div>

								{formik.touched.bloodGroup && formik.errors.bloodGroup ? (
									<div className="text-red-600/80 ml-2">
										{formik.errors.bloodGroup}
									</div>
								) : null}
							</div>
						</div>
						<div className="flex flex-col gap-[4px] font-Poppins">
							<InputField
								name={"bloodUnits"}
								handleBlur={formik.handleBlur}
								handleChange={formik.handleChange}
								type={"number"}
								value={formik.values.bloodUnits}
							/>
							{formik.touched.bloodUnits && formik.errors.bloodUnits ? (
								<div className="text-red-600/80 ml-2">
									{formik.errors.bloodUnits}
								</div>
							) : null}
						</div>
						<div className="flex flex-col w-full">
							<InputField
								name={"nationalId"}
								type={"number"}
								value={formik.values.nationalId}
								handleChange={formik.handleChange}
								handleBlur={formik.handleBlur}
							/>
							{formik.touched.nationalId && formik.errors.nationalId ? (
								<div className="text-red-600/80 ml-2">
									{formik.errors.nationalId}
								</div>
							) : null}
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

export default SearchNearstDonors;
