import { useRef, useState } from "react";
import Header from "./Header";
import { useFormik } from "formik";
import { Send_verification_code, Verify_Email } from "../End points/User";

function ValidationCodeModal({ setIsOpen }) {
	const [loading, setLoading] = useState(false);

	const otpBoxReference = useRef([]);

	const formik = useFormik({
		initialValues: {
			code: new Array(6).fill(""),
		},
		onSubmit: async (values) => {
			setLoading(true);
			const code = values.code.join("");
			const res = await Verify_Email({ verificationCode: code });
			if (res) {
				const existingUser = JSON.parse(localStorage.getItem("user")) || {};

				// Update the user data with the new role
				const updatedUser = {
					...existingUser,
					validate: true,
				};

				// Save the updated user data back to localStorage
				localStorage.setItem("user", JSON.stringify(updatedUser));
				setIsOpen(null);
			}
			setLoading(false);
		},
	});

	function handleChange(value, index) {
		const newCode = [...formik.values.code];
		newCode[index] = value;
		formik.setFieldValue("code", newCode);

		if (value && index < 6 - 1) {
			otpBoxReference.current[index + 1].focus();
		}
	}

	function handleBackspaceAndEnter(e, index) {
		if (e.key === "Backspace" && !e.target.value && index > 0) {
			otpBoxReference.current[index - 1].focus();
		}
		if (e.key === "Enter" && e.target.value && index < 6 - 1) {
			otpBoxReference.current[index + 1].focus();
		}
	}

	return (
		<>
			<div className="">
				<Header sizelg={"3xl"} sizesm={"lg"}>
					Verify Code
				</Header>
			</div>
			<form
				onSubmit={formik.handleSubmit}
				className="bg-white flex flex-col gap-4 justify-center items-center rounded h-2/4"
			>
				<div className="flex justify-between items-center w-full">
					{formik.values.code.map((digit, index) => (
						<input
							key={index}
							id={index}
							value={digit}
							maxLength={1}
							required
							onChange={(e) => handleChange(e.target.value, index)}
							onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
							ref={(reference) => (otpBoxReference.current[index] = reference)}
							onBlur={formik.handleBlur}
							className="h-32 w-20 rounded-xl border-2 border-primary-200 focus:outline-none text-[3rem] text-center"
						/>
					))}
				</div>
				<div className="text-center">
					<button
						type="submit"
						disabled={loading}
						className={`${
							loading ? "bg-black/25 text-white" : "bg-primary-600 text-white"
						} rounded-full  w-[240px] h-[53px] font-semibold`}
					>
						{loading ? "Loading..." : "Verify Code"}
					</button>
				</div>
			</form>
			<div className="text-center pb-6">
				<p>
					If you don't receive any code yet{" "}
					<button
						onClick={async () => {
							await Send_verification_code();
							setIsOpen(null);
						}}
						className="text-primary-400 cursor-pointer hover:underline"
					>
						Click here!
					</button>
				</p>
			</div>
		</>
	);
}

export default ValidationCodeModal;
