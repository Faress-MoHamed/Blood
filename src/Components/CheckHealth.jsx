import React, { useState } from "react";
import InputField from "./InputField";
import { IoIosCloseCircle } from "react-icons/io";
import Header from "./Header";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Check_Health } from "../End points/User";
import { DNA } from "react-loader-spinner";
const CheckHealth = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState(null);
	const initialValues = {
		WBC: 10,
		LYMP: 15,
		NEUTp: 30,
		LYMn: 5,
		NEUTn: 2,
		RBC: 3,
		HGB: 12,
		HCT: 30,
		MCV: 25,
		MCH: 25,
		MCHC: 25,
		PLT: 150,
		PDW: 12,
		PCT: 0.21,
	};

	const validationSchema = Yup.object({
		WBC: Yup.number()
			.min(1, "wbc must be at least 1")
			.max(57.7, "wbc must be at most 57.7")
			.required("Required"),
		LYMP: Yup.number()
			.min(10, "lymphocytes must be at least 10")
			.max(60, "lymphocytes must be at most 60"),
		NEUTp: Yup.number()
			.min(30, "neutrophils percentage must be at least 30")
			.max(90, "neutrophils percentage must be at most 90"),
		LYMn: Yup.number()
			.min(1, "lymphocytes number must be at least 1")
			.max(10, "lymphocytes number must be at most 10"),
		NEUTn: Yup.number()
			.min(2, "neutrophils number must be at least 2")
			.max(10, "neutrophils number must be at most 10"),
		RBC: Yup.number()
			.min(2.2, "rbc must be at least 2.2")
			.max(8.9, "rbc must be at most 8.9")
			.required("Required"),
		HGB: Yup.number()
			.min(2.9, "hemoglobin must be at least 2.9")
			.max(16.2, "hemoglobin must be at most 16.2")
			.required("Required"),
		HCT: Yup.number()
			.min(10, "hematocrit must be at least 10")
			.max(70, "hematocrit must be at most 70")
			.required("Required"),
		MCV: Yup.number()
			.min(20, "mean corpuscular volume must be at least 20")
			.max(103.7, "mean corpuscular volume must be at most 103.7")
			.required("Required"),
		MCH: Yup.number()
			.min(5.7, "mean corpuscular hemoglobin must be at least 5.7")
			.max(35.6, "mean corpuscular hemoglobin must be at most 35.6")
			.required("Required"),
		MCHC: Yup.number()
			.min(20, "mean corpuscular hemoglobin concentration must be at least 20")
			.max(50, "mean corpuscular hemoglobin concentration must be at most 50")
			.required("Required"),
		PLT: Yup.number()
			.min(5, "platelets must be at least 5")
			.max(600, "platelets must be at most 600")
			.required("Required"),
		PDW: Yup.number()
			.min(8, "platelet distribution width must be at least 8")
			.max(30, "platelet distribution width must be at most 30"),
		PCT: Yup.number()
			.min(0, "procalcitonin must be at least 0")
			.max(2, "procalcitonin must be at most 2"),
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

	const defaultValues = {
		PCT: 0.26028,
		PDW: 14.31251157,
		LYMP: 25.845,
		NEUTp: 77.511,
		NEUTn: 5.14094,
		LYMn: 1.88076,
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			// Set default values if fields are empty
			const finalValues = { ...values };
			Object.keys(defaultValues).forEach((key) => {
				if (!finalValues[key]) {
					finalValues[key] = defaultValues[key];
				}
			});

			setIsLoading(true);
			try {
				const { Result } = await Check_Health(finalValues);
				setIsLoading(false);

				setResult(Result);
			} catch (err) {
				console.error(err);
				setIsLoading(false);
			}
		},
	});

	return (
		<>
			<div className="mt-5">
				<div className="">
					<Header>Check Health</Header>
				</div>
				{isLoading ? (
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
				) : !result ? (
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
								Check Health
							</button>
						</div>
					</form>
				) : (
					<div className="flex items-center justify-center h-4/5">
						<p className="text-4xl text-primary-500 font-bold ">{result}</p>
					</div>
				)}
			</div>{" "}
		</>
	);
};

export default CheckHealth;
