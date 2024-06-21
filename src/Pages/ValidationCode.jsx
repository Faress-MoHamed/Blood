import { useRef, useState } from "react";

function ValidationCode() {
	const [otp, setOtp] = useState(new Array(6).fill(""));
	const otpBoxReference = useRef([]);

	function handleChange(value, index) {
		let newArr = [...otp];
		newArr[index] = value;
		setOtp(newArr);

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
		<main className="pt[66px] h-screen">
			<form className="bg-white flex gap-5 justify-center items-center rounded h-2/4">
				{otp.map((digit, index) => (
					<input
						key={index}
						value={digit}
						maxLength={1}
						onChange={(e) => handleChange(e.target.value, index)}
						onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
						ref={(reference) => (otpBoxReference.current[index] = reference)}
						className="h-32 w-24 rounded-xl border-2 border-primary-200 focus:outline-none text-[3rem] text-center"
					/>
				))}
			</form>
			<div className="text-center pb-6">
				<p>
					if you don't recive any Code yet{" "}
					<button  className="text-primary-400 cursor-pointer hover:underline">
						Click here!
					</button>
				</p>
			</div>
			<div className="text-center">
				<button
					type="submit"
					className="bg-primary-500 hover:bg-primary-700 transition-colors duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Verify Code
				</button>
			</div>
		</main>
	);
}

export default ValidationCode;
