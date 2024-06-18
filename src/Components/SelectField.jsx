import React from "react";
import Select from "react-select";

function SelectField({ options, formik, field }) {
	const handleSelectChange = (selectedOption) => {
		formik.setFieldValue(field, selectedOption);
		// console.log(selectedOption);
	};

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			borderRadius: "0rem",
			borderColor: state.isFocused ? "#884896" : "rgb(209 213 219)",
			boxShadow: state.isFocused && "none",
			"&:hover": {
				borderColor: "#884896",
			},
		}),
		menu: (provided) => ({
			...provided,
			borderRadius: "0.375rem",
			boxShadow:
				"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)",
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected
				? "#884896"
				: state.isFocused
				? "#ddb5e5"
				: "white",
			color: state.isSelected ? "white" : "black",
			"&:hover": {
				backgroundColor: state.isSelected ? "#884896" : "#ddb5e5",
			},
		}),
		multiValue: (provided) => ({
			...provided,
			backgroundColor: "#ddb5e5",
		}),
		multiValueLabel: (provided) => ({
			...provided,
			color: "#b066c9",
		}),
		multiValueRemove: (provided) => ({
			...provided,
			color: "#b066c9",
			"&:hover": {
				backgroundColor: "#ddb5e5",
				color: "white",
			},
		}),
	};

	return (
		<>
			<Select
				required
				id={field}
				name={field}
				options={options}
				value={formik.values[field]}
				onChange={handleSelectChange}
				onBlur={() => formik.setFieldTouched(field)}
				styles={customStyles}
				getOptionLabel={(option) => option.label}
				getOptionValue={(option) => option.value}
			/>
			{formik.touched[field] && formik.errors[field] ? (
				<div>{formik.errors[field]}</div>
			) : null}
		</>
	);
}

export default SelectField;
