import { useFormik } from "formik";
import InputField from "../Components/InputField";
import Header from "../Components/Header";
import { Helmet } from "react-helmet";
import { useState } from "react";
import Modal from "../Components/Modal";
import { motion } from "framer-motion";
import ResetPassword from "../Components/ResetPassword";
import ValidationCodeModal from "../Components/ValidationCodeModal";
import { Send_verification_code, UploadPhoto } from "../End points/User";
import { DNA } from "react-loader-spinner";

function Profile() {
	const [openModal, setOpenModal] = useState("");
	const [loading, setLoading] = useState(false);
	const [verifyWait, setverifyWait] = useState(false);
	const handleClose = () => setOpenModal("");
	const data = JSON.parse(localStorage.getItem("user")) || {};
	const handleUploadPhoto = async () => {
		if (formik.values.profileImage) {
			const formData = new FormData();
			formData.append("profileImage", formik.values.profileImage);
			try {
				setLoading(true);
				const { data } = await UploadPhoto(formData);
				let existingUserData = JSON.parse(localStorage.getItem("user"));
				if (!existingUserData) {
					existingUserData = {};
				}
				let updatedUserData = {
					...existingUserData,
					...data,
				};
				localStorage.setItem("user", JSON.stringify(updatedUserData));
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
	};
	const formik = useFormik({
		initialValues: {
			profileImage: data.profileImage || "",
			email: data.email || "",
			id: data._id || "",
			address: data.location?.address || "",
			verified: data.validate || "",
			username: data.username || "",
		},
	});

	const handleFileChange = (event) => {
		console.log(event.currentTarget.files[0]);
		formik.setFieldValue("profileImage", event.currentTarget.files[0]);
	};

	const handleSendVerificationCode = async () => {
		setverifyWait(true);
		await Send_verification_code();
		setverifyWait(false);
		setOpenModal("");
	};

	return (
		<>
			<Helmet>
				<title>Profile</title>
				<meta name="description" content="User services blood donor find" />
			</Helmet>
			<main className="lg:p-16 p-0 lg:mt-0 mt-[56px]">
				<div className="container mx-auto flex flex-col lg:gap-0 gap-8 py-5 h-full px-4 md:px-0">
					<Header>Profile</Header>
					<div className=" w-[250px] flex flex-col justify-center text-center gap-4 mb-10 ">
						<span className=" flex justify-center items-center rounded-full">
							<img
								src={`${
									data.profileImage
										? `https://blood-donation-system-api.onrender.com${data?.profileImage}`
										: "./download.jpeg"
								}`}
								className="rounded-full"
								alt="default"
							/>
						</span>
					</div>
					<div className="flex lg:flex-row flex-col gap-9 items-center">
						<div className="lg:w-3/4 w-full">
							<form
								onSubmit={formik.handleSubmit}
								className="flex flex-col justify-evenly gap-7 lg:w-2/4 w-full"
							>
								{!data.profileImage && (
									<div className="item">
										<InputField
											handleBlur={formik.handleBlur}
											name={"profile Image"}
											handleChange={handleFileChange}
											type={"file"}
										/>
									</div>
								)}
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
							{formik.values.profileImage && !data.profileImage && (
								<button
									disabled={loading}
									onClick={handleUploadPhoto}
									className={`rounded-full ${
										loading
											? "bg-black/50"
											: " bg-primary-600 hover:bg-primary-700 duration-300 transition-colors"
									}  text-white lg:w-[240px] h-[53px] font-semibold`}
								>
									{loading ? "Loading.." : "Upload Image"}
								</button>
							)}
							<button
								onClick={() => setOpenModal("Reset")}
								className="rounded-full bg-primary-600 hover:bg-primary-700 duration-300 transition-colors text-white lg:w-[240px] h-[53px] font-semibold"
							>
								Reset Password
							</button>
							{!data.validate && (
								<button
									onClick={handleSendVerificationCode}
									className="rounded-full bg-primary-600 hover:bg-primary-700 duration-300 transition-colors text-white lg:w-[240px] h-[53px] font-semibold"
								>
									Send Verification Code
								</button>
							)}
							{!data.validate && (
								<button
									onClick={() => setOpenModal("verifyEmail")}
									className="rounded-full bg-primary-600 hover:bg-primary-700 duration-300 transition-colors text-white lg:w-[240px] h-[53px] font-semibold"
								>
									Verify Email
								</button>
							)}
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
			{verifyWait && (
				<Modal handleClose={handleClose}>
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
				</Modal>
			)}
		</>
	);
}

export default Profile;
