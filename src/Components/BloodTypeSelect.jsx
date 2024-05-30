import React from "react";
import { useFormik } from "formik";

const BloodTypeSelect = ({
	value,
	handleChange,
	handleBlur,
}) => {

	return (
		<div className="relative">
			<select
				id="bloodGroup"
				name="bloodGroup"
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				className="placeholder:text-base placeholder:text-[#111111]/40 border py-[15px] px-[24px] focus:outline-none border-[#5E5E5E]/35 rounded-[12px] h-[56px] w-full"
			>
				<option value="" disabled>
					Select your blood type
				</option>
				<option value="A+">A+</option>
				<option value="A-">A-</option>
				<option value="B+">B+</option>
				<option value="B-">B-</option>
				<option value="AB+">AB+</option>
				<option value="AB-">AB-</option>
				<option value="O+">O+</option>
				<option value="O-">O-</option>
			</select>
			<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
				<svg
					className="w-5 h-5 text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>
		</div>
	);
};

export default BloodTypeSelect;
