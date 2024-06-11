import { useRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";
import Header from "./Header";
import { useFormik } from "formik";
import { Verify_Email } from "../End points/User";
import toast from "react-hot-toast";

function ValidationCodeModal({ setIsOpen }) {
	const otpBoxReference = useRef([]);

	const formik = useFormik({
		initialValues: {
			code: new Array(6).fill(""),
		},
		onSubmit: async (values) => {
			const code = values.code.join("");
			const res = await Verify_Email({ verificationCode: code });
			if (res === "congrats now your Account  is verfied ") {
				
				setIsOpen(null);
			}
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
		<motion.main
			initial={{ top: -100, opacity: 0 }}
			animate={{ top: 0, opacity: 1 }}
			exit={{ top: -100, opacity: 0 }}
			transition={{ duration: 0.5, type: "spring" }}
			className="signUpUser shadow-2xl bg-white relative overflow-y-auto flex justify-center"
		>
			<button className="absolute right-6 top-6" onClick={() => setIsOpen("")}>
				<IoIosCloseCircle className="w-7 h-7 hover:text-black/70 duration-300" />
			</button>
			<div className="container w-[700px] p-8">
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
								ref={(reference) =>
									(otpBoxReference.current[index] = reference)
								}
								onBlur={formik.handleBlur}
								className="h-32 w-20 rounded-xl border-2 border-primary-200 focus:outline-none text-[3rem] text-center"
							/>
						))}
					</div>
					<div className="text-center">
						<button
							type="submit"
							className="bg-primary-500 hover:bg-primary-700 transition-colors duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Verify Code
						</button>
					</div>
				</form>
				<div className="text-center pb-6">
					<p>
						If you don't receive any code yet{" "}
						<span className="text-primary-400 cursor-pointer hover:underline">
							Click here!
						</span>
					</p>
				</div>
			</div>
		</motion.main>
	);
}

export default ValidationCodeModal;