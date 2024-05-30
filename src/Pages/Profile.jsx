import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Reset_password } from "../End points/User";
import InputField from "../Components/InputField";
import Header from "../Components/Header";
function Profile() {
	const data = JSON.parse(localStorage.getItem("user"));
	console.log(data);
	const formik = useFormik({
		initialValues: {
			email: data.email,
			password: "",
			confirmPassword: "",
			newPassword: "",
		},
	});
	return localStorage.getItem("user") ? (
		<main className="p-16 ">
			<div className="container mx-auto flex flex-col lg:gap-0 gap-8 py-5 h-full px-4 md:px-0">
				<Header>Profile.</Header>
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col justify-evenly gap-7 md:w-2/4 w-full"
				>
					<div className="image--container">
						<span className="photo">
							<img
								className="rounded-full"
								src="./download.jpeg"
								alt="default"
							/>
						</span>
						<h2 className="text-xl font-semibold">
							username : {data.username}
						</h2>
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
							name={"password"}
							handleChange={formik.handleChange}
							type={"password"}
							pass={true}
							value={formik.values.password}
						/>
					</div>
					<div className="item">
						<InputField
							handleBlur={formik.handleBlur}
							name={"newPassword"}
							handleChange={formik.handleChange}
							type={"password"}
							pass={true}
							value={formik.values.newPassword}
						/>
					</div>
					<div className="item">
						<InputField
							handleBlur={formik.handleBlur}
							name={"confirmPassword"}
							handleChange={formik.handleChange}
							type={"password"}
							pass={true}
							value={formik.values.confirmPassword}
						/>
					</div>
					<button
						type="submit"
						className="rounded-full bg-primary-600 text-white w-[240px] h-[53px] font-semibold"
					>
						Reset Password
					</button>
				</form>
			</div>
		</main>
	) : (
		<p>errror</p>
	);
}

export default Profile;
