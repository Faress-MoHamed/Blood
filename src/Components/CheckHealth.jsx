import React from "react";
import InputField from "./InputField";
import { IoIosCloseCircle } from "react-icons/io";
import Header from "./Header";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
const CheckHealth = ({ setIsOpen }) => {
	const initialValues = {
		WBC: "",
		LYMP: "",
		NEUTp: "",
		LYMn: "",
		NEUTn: "",
		RBC: "",
		HGB: "",
		HCT: "",
		MCV: "",
		MCH: "",
		MCHC: "",
		PLT: "",
		PDW: "",
		PCT: "",
	};

	const validationSchema = Yup.object({
		WBC: Yup.number()
			.min(4, "wbc must be at least 4")
			.max(10, "wbc must be at most 10")
			.required("Required"),
		LYMP: Yup.number()
			.min(1, "lymphocytes must be at least 1")
			.max(4, "lymphocytes must be at most 4")
			.required("Required"),
		NEUTp: Yup.number()
			.min(40, "neutrophils percentage must be at least 40")
			.max(60, "neutrophils percentage must be at most 60")
			.required("Required"),
		LYMn: Yup.number()
			.min(20, "lymphocytes number must be at least 20")
			.max(40, "lymphocytes number must be at most 40")
			.required("Required"),
		NEUTn: Yup.number()
			.min(2, "neutrophils number must be at least 2")
			.max(7, "neutrophils number must be at most 7")
			.required("Required"),
		RBC: Yup.number()
			.min(4.5, "rbc must be at least 4.5")
			.max(5.9, "rbc must be at most 5.9")
			.required("Required"),
		HGB: Yup.number()
			.min(12, "hemoglobin must be at least 12")
			.max(17.5, "hemoglobin must be at most 17.5")
			.required("Required"),
		HCT: Yup.number()
			.min(37, "hematocrit must be at least 37")
			.max(50, "hematocrit must be at most 50")
			.required("Required"),
		MCV: Yup.number()
			.min(80, "mean corpuscular volume must be at least 80")
			.max(100, "mean corpuscular volume must be at most 100")
			.required("Required"),
		MCH: Yup.number()
			.min(27, "mean corpuscular hemoglobin must be at least 27")
			.max(33, "mean corpuscular hemoglobin must be at most 33")
			.required("Required"),
		MCHC: Yup.number()
			.min(32, "mean corpuscular hemoglobin concentration must be at least 32")
			.max(36, "mean corpuscular hemoglobin concentration must be at most 36")
			.required("Required"),
		PLT: Yup.number()
			.min(150, "platelets must be at least 150")
			.max(450, "platelets must be at most 450")
			.required("Required"),
		PDW: Yup.number()
			.min(9, "platelet distribution width must be at least 9")
			.max(17, "platelet distribution width must be at most 17")
			.required("Required"),
		PCT: Yup.number()
			.min(0.1, "procalcitonin must be at least 0.1")
			.max(0.5, "procalcitonin must be at most 0.5")
			.required("Required"),
	});

	const fieldsInfo = [
		{ key: "WBC", name: "White Blood Cell", abbreviation: "WBC" },
		{ key: "LYMP", name: "Lymphocytes", abbreviation: "LYMP" },
		{ key: "NEUTp", name: "Neutrophils percentage", abbreviation: "NEUTp" },
		{ key: "LYMn", name: "Lymphocytes number", abbreviation: "LYMn" },
		{ key: "NEUTn", name: "Neutrophils number", abbreviation: "NEUTn" },
		{ key: "RBC", name: "Red Blood Cell", abbreviation: "RBC" },
		{ key: "HGB", name: "Hemoglobin", abbreviation: "HGB" },
		{ key: "HCT", name: "Hematocrit", abbreviation: "HCT" },
		{ key: "MCV", name: "Mean Corpuscular Volume", abbreviation: "MCV" },
		{ key: "MCH", name: "Mean Corpuscular Hemoglobin", abbreviation: "MCH" },
		{
			key: "MCHC",
			name: "Mean Corpuscular Hemoglobin Concentration",
			abbreviation: "MCHC",
		},
		{ key: "PLT", name: "Platelets", abbreviation: "PLT" },
		{ key: "PDW", name: "Platelet Distribution Width", abbreviation: "PDW" },
		{ key: "PCT", name: "Procalcitonin", abbreviation: "PCT" },
	];

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			// Handle form submission
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
					onClick={() => setIsOpen(null)}
					className="absolute right-6 top-6"
				>
					<IoIosCloseCircle className="w-7 h-7 hover:text-black/70 duration-300" />
				</button>
				<div className="container w-[700px] p-8">
					<div className="">
						<Header>Check Health</Header>
					</div>
					<form
						onSubmit={formik.handleSubmit}
						className="flex flex-col gap-6 p-5"
					>
						{fieldsInfo.map((field) => (
							<div key={field.key} className="flex flex-col w-full">
								<InputField
									key={field.key}
									name={field.abbreviation}
									type="number"
									label={field.name}
									value={formik.values[field.abbreviation]}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
								/>
								{formik.touched[field.abbreviation] &&
									formik.errors[field.abbreviation] && (
										<div className="text-red-600/80 ml-2">
											{formik.errors[field.abbreviation]}
										</div>
									)}
							</div>
						))}
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
};

export default CheckHealth;
