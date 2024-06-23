import { Forget_Password } from "../End points/User";
import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
function ResetByEmail({ setIsOpen, email }) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const sendResetCode = async () => {
			try {
				setLoading(true);
				await Forget_Password({ email: email });
				// toast.success(message);
				setIsOpen("Reset");
			} catch (error) {
				console.error(error);
				setIsOpen(null);
			}

			setLoading(false);
		};
		sendResetCode();
		console.log("hi");
	}, []);

	return (
		loading && (
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
		)
	);
}

export default ResetByEmail;
