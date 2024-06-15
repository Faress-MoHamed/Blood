import { useFormik } from "formik";
import InputField from "../Components/InputField";
import Header from "../Components/Header";
import { Helmet } from "react-helmet";
import { useState } from "react";
import Modal from "../Components/Modal";
import { motion } from "framer-motion";
import ResetPassword from "../Components/ResetPassword";
import ValidationCodeModal from "../Components/ValidationCodeModal";
import { Send_verification_code } from "../End points/User";
import { DNA } from "react-loader-spinner";

function Profile() {
	const [openModal, setOpenModal] = useState("");

	const [loading, setLoading] = useState(false);
	const handleClose = () => setOpenModal("");
	const data = JSON.parse(localStorage.getItem("user")) || {};

	const formik = useFormik({
		initialValues: {
			email: data.email || "",
			id: data._id || "",
			address: data.location?.address || "",
			verified: data.validate || "",
			username: data.username || "",
		},
	});

	const handleSendVerificationCode = async () => {
		setLoading(true);
		await Send_verification_code();
		setLoading(false);
		setOpenModal("");
	};

	return (
		<>
			(
			<>
				<Helmet>
					<title>Profile</title>
					<meta name="description" content="User services blood donor find" />
				</Helmet>
				<main className="p-16">
					<div className="container mx-auto flex flex-col lg:gap-0 gap-8 py-5 h-full px-4 md:px-0">
						<Header>Profile</Header>
						<div className="flex lg:flex-row flex-col gap-9 items-center">
							<div className="lg:w-3/4 w-full">
								<form
									onSubmit={formik.handleSubmit}
									className="flex flex-col justify-evenly gap-7 md:w-2/4 w-full"
								>
									<div className="item">
										<InputField
											handleBlur={formik.handleBlur}
											name={"username"}
											handleChange={formik.handleChange}
											type={"text"}
											disabled={true}
											value={formik.values.username}
										/>
									</div>
									<div className="item">
										<InputField
											handleBlur={formik.handleBlur}
											name={"email"}
											handleChange={formik.handleChange}
											type={"text"}
											disabled={true}
											value={formik.values.email}
										/>
									</div>
									<div className="item">
										<InputField
											handleBlur={formik.handleBlur}
											name={"id"}
											handleChange={formik.handleChange}
											type={"text"}
											disabled={true}
											value={formik.values.id}
										/>
									</div>
									<div className="item">
										<InputField
											handleBlur={formik.handleBlur}
											name={"address"}
											handleChange={formik.handleChange}
											type={"text"}
											disabled={true}
											value={formik.values.address}
										/>
									</div>
									<div className="item">
										<InputField
											handleBlur={formik.handleBlur}
											name={"verified"}
											handleChange={formik.handleChange}
											type={"text"}
											disabled={true}
											value={formik.values.verified}
										/>
									</div>
								</form>
							</div>
							<div className="lg:w-1/4 w-full flex flex-col gap-12">
								<button
									onClick={() => setOpenModal("Reset")}
									className="rounded-full bg-primary-600 hover:bg-primary-700 duration-300 transition-colors text-white lg:w-[240px] h-[53px] font-semibold"
								>
									Reset Password
								</button>
								<button
									onClick={handleSendVerificationCode}
									className="rounded-full bg-primary-600 hover:bg-primary-700 duration-300 transition-colors text-white lg:w-[240px] h-[53px] font-semibold"
								>
									Send Verification Code
								</button>
								<button
									onClick={() => setOpenModal("verifyEmail")}
									className="rounded-full bg-primary-600 hover:bg-primary-700 duration-300 transition-colors text-white lg:w-[240px] h-[53px] font-semibold"
								>
									Verify Email
								</button>
							</div>
						</div>
					</div>
				</main>
				{openModal === "Reset" && (
					<Modal handleClose={handleClose}>
						<ResetPassword setIsOpen={setOpenModal} />
					</Modal>
				)}
				{openModal === "verifyEmail" && (
					<Modal handleClose={handleClose}>
						<ValidationCodeModal setIsOpen={setOpenModal} />
					</Modal>
				)}
				{loading && (
					<Modal handleClose={handleClose}>
						<motion.main
							initial={{ top: -100 }}
							animate={{ top: 0 }}
							exit={{ top: -100 }}
							transition={{ duration: 0.5, type: "spring" }}
							className="signUpUser shadow-2xl bg-white relative overflow-y-auto flex justify-center"
						>
							<div className="container w-[700px] p-8">
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
							</div>
						</motion.main>
					</Modal>
				)}
			</>
			)
		</>
	);
}

export default Profile;
