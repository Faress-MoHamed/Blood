import { IoIosCloseCircle } from "react-icons/io";
import Header from "./Header";
import InputField from "./InputField";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { useFormik } from "formik";
import BloodTypeSelect from "./BloodTypeSelect";
import {
	Search_Nearest_Donors,
	Send_Request_to_donor,
	Updata_Role_Patient,
} from "../End points/User";
import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import DonorCard from "./DonorCard";
import AcceptedRequests from "./AcceptedRequests";

function SearchNearstDonors({ setIsOpen }) {
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [select, setSelected] = useState([]);
	// let req = JSON.stringify(sessionStorage.getItem("req") || {});
	// console.log(req === "[]");
	const handleRequestSend = async () => {
		setLoading(true);
		await Send_Request_to_donor(select);
		setLoading(false);
		setIsOpen("AcceptedRequests");
	};
	useEffect(() => {
		async function handleUpdateRole() {
			if (JSON.parse(localStorage.getItem("user"))?.role !== "patient") {
				await Updata_Role_Patient();
			}
		}
		handleUpdateRole();
	}, []);
	const handleSubmit = async (values) => {
		setLoading(true);

		const data = await Search_Nearest_Donors(values);
		console.log(data);
		if (data?.nearestDonors) {
			setResult(data?.nearestDonors);
			setLoading(false);
		} else if (data?.response?.data?.message) {
			setError(data.response.data.message);
			setLoading(false);
		}
	};

	const validationSchema = Yup.object({
		hospitalAddress: Yup.string().required("hospitalAddress is required"),
		hospitalName: Yup.string().required("hospitalName is required"),
		bloodGroup: Yup.string()
			.matches(/^(A|B|AB|O)[+-]$/, "Invalid bloodGroup")
			.required("bloodGroup is required"),
		bloodUnits: Yup.number().min(1).max(10).required("bloodUnits is required"),
		// nationalId: Yup.string().length(12).required("nationalId is required"),
	});
	const formik = useFormik({
		initialValues: {
			hospitalAddress: "",
			hospitalName: "",
			bloodUnits: "",
			nationalId: "",
			bloodGroup: "",
		},
		validationSchema,
		onSubmit: async (values) => {
			handleSubmit(values);
		},
	});
	return !sessionStorage.getItem("req") ? (
		<>
			<div className="text-[10px]">
				<Header sizelg={"2xl"} sizesm={"xl"}>
					{!result ? "I Need Donors" : "list of Donors"}
				</Header>
			</div>
			{loading && !error ? (
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
			) : error ? (
				<div className="flex items-center justify-center h-4/5">
					<p className="text-red-500">{error}</p>
				</div>
			) : result ? (
				<div className="flex-col flex justify-between h-[80%]">
					<div className="flex justify-between">
						<button
							onClick={() => handleSubmit(formik.values)}
							className="font-semibold  text-black  hover:underline p-2 rounded-full  duration-300 transition-colors"
						>
							Refresh
						</button>
						<button
							onClick={() => {
								const Btns = document.querySelectorAll(".donor-btn");
								Btns.forEach((el) => el.click());
							}}
							className="font-bold text-white bg-primary-400 hover:bg-primary-600 p-2 rounded-full  duration-300 transition-colors"
						>
							Select All
						</button>
					</div>
					<div className="flex flex-col gap-5 p-4 overflow-y-auto h-[60%]">
						{result.map((el, index) => (
							<DonorCard
								email={el.email}
								location={el.location}
								key={index}
								id={el._id}
								setSelected={setSelected}
								select={select}
								username={el.username}
							/>
						))}
					</div>
					<div className="flex justify-center">
						<button
							onClick={(e) => {
								e.preventDefault();
								handleRequestSend();
							}}
							disabled={loading}
							className={`${
								loading
									? "bg-slate-400 text-black"
									: "bg-primary-600 text-white"
							} rounded-full  w-[240px] h-[53px] font-semibold`}
						>
							{loading ? "loading..." : "Send Requests to Donors"}
						</button>
					</div>
				</div>
			) : (
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-6 p-5"
				>
					<div className="flex flex-col w-full">
						<InputField
							name={"hospitalAddress"}
							type={"text"}
							value={formik.values.hospitalAddress}
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
						/>
						{formik.touched.hospitalAddress && formik.errors.hospitalAddress ? (
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
			)}
		</>
	) : (
		<AcceptedRequests setIsOpen={setIsOpen} />
	);
}

export default SearchNearstDonors;
