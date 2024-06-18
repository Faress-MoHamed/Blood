import { useFormik } from "formik";
import InputField from "./InputField";
import * as Yup from "yup";
import { useState } from "react";
import Header from "./Header";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CreateCamp } from "../End points/User";
import toast from "react-hot-toast";
// import "./CreateEvent.css"; // Import a CSS file for additional styles

function CreateEvent({ handleClose }) {
	const [loading, setLoading] = useState(false);
	const [showCalendar, setShowCalendar] = useState(false);

	const validationSchema = Yup.object({
		name: Yup.string()
			.min(2, "Name must be at least 2 characters")
			.max(50, "Name must be less than 50 characters")
			.required("Name is required"),
		address: Yup.string().required("Address is required"),
		date: Yup.string().required("Date is required"),
	});

	const formik = useFormik({
		initialValues: {
			name: "",
			address: "",
			date: "",
		},
		validationSchema,
		onSubmit: async (values) => {
      setLoading(true);
			const { data } = await CreateCamp(values);
			data && toast.success(data);
			setLoading(false);
			handleClose(false);
		},
	});

	const handleDateChange = (date) => {
		const offsetDate = new Date(
			date.getTime() - date.getTimezoneOffset() * 60000
		);
		const formattedDate = offsetDate.toISOString().split("T")[0];
		formik.setFieldValue("date", formattedDate);
		setShowCalendar(false);
	};

	return (
		<>
			<Header sizelg={"xl"} sizesm={"lg"}>
				Create Event Now
			</Header>
			<form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 p-5">
				<div className="flex flex-col w-full">
					<div className="sides w-full md:flex-row flex-col gap-5 flex justify-between items-center">
						<InputField
							name="name"
							type="text"
							value={formik.values.name}
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
						/>
					</div>
					<div className="ml-2">
						{formik.touched.name && formik.errors.name ? (
							<div className="text-red-600/80">{formik.errors.name}</div>
						) : null}
					</div>
				</div>

				<div className="flex flex-col w-full">
					<InputField
						name="address"
						type="text"
						value={formik.values.address}
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
					/>
					{formik.touched.address && formik.errors.address ? (
						<div className="text-red-600/80 ml-2">{formik.errors.address}</div>
					) : null}
				</div>

				<div className="flex flex-col w-full relative">
					<InputField
						calender={true}
						handleCalenderShow={setShowCalendar}
						handleBlur={formik.handleBlur}
						type="text"
						name="date"
						value={formik.values.date}
						handleChange={formik.handleChange}
						onFocus={() => setShowCalendar(true)}
					/>
					{formik.touched.date && formik.errors.date ? (
						<div className="text-red-600/80 ml-2">{formik.errors.date}</div>
					) : null}
					{showCalendar && (
						<div className="calendar-container absolute top-[-253px] right-0 z-10000">
							<Calendar
								onChange={handleDateChange}
								value={formik.values.date ? new Date(formik.values.date) : null}
							/>
						</div>
					)}
				</div>

				<div className="flex justify-center">
					<button
						type="submit"
						disabled={loading}
						className={`${
							loading ? "bg-black/25 text-white" : "bg-primary-600 text-white"
						} rounded-full w-[240px] h-[53px] font-semibold`}
					>
						{loading ? "Loading..." : "Create Event"}
					</button>
				</div>
			</form>
		</>
	);
}

export default CreateEvent;
