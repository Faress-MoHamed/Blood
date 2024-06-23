import { useFormik } from "formik";
import { useState } from "react";
import InputField from "./InputField";
import Header from "./Header";
import { DNA } from "react-loader-spinner";
import { diseases } from "../../public/dieseas";
import SelectField from "./SelectField";
import axios from "axios";

function SelectDiseas() {
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState(null);
	const extractValues = (data) => {
		const result = {};
		for (const key in data) {
			if (
				typeof data[key] === "object" &&
				data[key] !== null &&
				"value" in data[key]
			) {
				result[key] = data[key].value;
			} else {
				result[key] = data[key];
			}
		}
		return result;
	};

	const formik = useFormik({
		initialValues: {
			Disease: null,
			Fever: null,
			Cough: null,
			Fatigue: null,
			"Difficulty Breathing": null,
			Age: null,
			Gender: null,
			"Blood Pressure": null,
			"Cholesterol Level": null,
		},
		onSubmit: async (values) => {
			setIsLoading(true);
			const { data } = await axios.post(
				"http://127.0.0.1:8000/check",
				extractValues(values)
			);
			setResult(
				JSON.stringify(data)
					.slice(2, JSON.stringify(data).length - 2)
					.replace('"', "")
					.replace('"', "")
			);
			setIsLoading(false);
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
						<div className="flex flex-col gap-3">
							<label htmlFor={"Disease"}>what is your {"Disease"}</label>
							<SelectField
								field={"Disease"}
								formik={formik}
								options={diseases}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<label htmlFor={"Fever"}>do you feel {"Fever"}</label>
							<SelectField
								field={"Fever"}
								formik={formik}
								options={[
									{
										label: "Yes",
										value: "Yes",
									},
									{
										label: "No",
										value: "No",
									},
								]}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<label htmlFor={"Cough"}>do you feel {"Cough"}</label>

							<SelectField
								field={"Cough"}
								formik={formik}
								options={[
									{
										label: "Yes",
										value: "Yes",
									},
									{
										label: "No",
										value: "No",
									},
								]}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<label htmlFor={"Fatigue"}>do you feel {"Fatigue"}</label>

							<SelectField
								field={"Fatigue"}
								formik={formik}
								options={[
									{
										label: "Yes",
										value: "Yes",
									},
									{
										label: "No",
										value: "No",
									},
								]}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<label htmlFor={"Difficulty Breathing"}>
								do you feel {"Difficulty Breathing"}
							</label>
							<SelectField
								field={"Difficulty Breathing"}
								formik={formik}
								options={[
									{
										label: "Yes",
										value: "Yes",
									},
									{
										label: "No",
										value: "No",
									},
								]}
							/>
						</div>
						<InputField
							handleBlur={formik.handleBlur}
							handleChange={formik.handleChange}
							name={"Age"}
							type={"number"}
							max={100}
							value={formik.values.Age}
						/>
						<div className="flex flex-col gap-3">
							<label htmlFor={"Gender"}>what is your {"Gender"}</label>
							<SelectField
								field={"Gender"}
								formik={formik}
								options={[
									{
										label: "Male",
										value: "Male",
									},
									{
										label: "Female",
										value: "Female",
									},
								]}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<label htmlFor={"Blood Pressure"}>
								What is your {"Blood Pressure degree"}
							</label>
							<SelectField
								field={"Blood Pressure"}
								formik={formik}
								options={[
									{
										label: "Low",
										value: "Low",
									},
									{
										label: "Normal",
										value: "Normal",
									},
									{
										label: "High",
										value: "High",
									},
								]}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<label htmlFor={"Cholesterol Level"}>
								what is your {"Cholesterol Level"}
							</label>
							<SelectField
								field={"Cholesterol Level"}
								formik={formik}
								options={[
									{
										label: "Normal",
										value: "Normal",
									},
									{
										label: "High",
										value: "High",
									},
								]}
							/>
						</div>
						<div className="flex justify-center">
							<button
								type="submit"
								className={`rounded-full ${
									isLoading ? "bg-black/25" : "bg-primary-600 "
								} text-white w-[240px] h-[53px] font-semibold`}
							>
								Check Health
							</button>
						</div>
					</form>
				) : (
					<div className="flex items-center justify-center h-[250px] ">
						<p className="text-3xl text-black/60 font-bold">{result}</p>
					</div>
				)}
			</div>
		</>
	);
}

export default SelectDiseas;
