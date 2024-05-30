import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

function InputField({
	name,
	type,
	pass,
	value,
	handleChange,
	handleBlur,
	disabled,
}) {
	const [visible, setVisible] = useState(false);
	// const [values, setValue] = useState(null);
	// const { values, handleChange, handleBlur } = useFormikContext();
	// console.log(name.split(" ").join(""));
	// console.log(location ? value !== "" : null);
	return (
		<div className="flex flex-col gap-[4px] font-Poppins w-full">
			<div className="flex justify-between">
				<label
					className="text-base capitalize font-[400] text-[#666666]"
					htmlFor={name.split(" ").join("")}
				>
					{name}
				</label>
				{pass && (
					<button
						onClick={(e) => {
							e.preventDefault();
							setVisible((prev) => !prev);
						}}
						className="flex justify-between text-[#666666]/80 items-center text-[18px] w-[73px]"
					>
						{visible ? (
							<BiShow className="w-[22px] h-[22px]" />
						) : (
							<BiHide className="w-[22px] h-[22px]" />
						)}
						<p>{visible ? "Show" : "Hide"}</p>
					</button>
				)}
			</div>
			<div className="relative">
				<input
					type={!pass ? type : visible ? "text" : "password"}
					id={name.split(" ").join("")}
					className="placeholder:text-base placeholder:text-[#111111]/40 border py-[15px] px-[24px] caret-[#FF0000] focus:outline-none border-[#5E5E5E]/35 rounded-[12px] h-[56px] w-full"
					placeholder={name}
					name={name.split(" ").join("")}
					value={value}
					onChange={handleChange}
					onBlur={handleBlur}
					disabled={disabled}
				/>
				{/* {location && value === "" && (
					<button
						onClick={(e) => {
							e.preventDefault();
							navigator.geolocation.getCurrentPosition((pos) => {
								handleChange({
									target: {
										name: name.split(" ").join(""),
										value: `${pos.coords.latitude}, ${pos.coords.longitude}`,
									},
								});
							});
						}}
						className={` absolute right-1 flex justify-center items-center rounded-full p-4 bg-black/30 hover:bg-black/60 duration-300 h-4/5  top-2/4 translate-y-[-50%] font-semibold text-white`}
					>
						get Current Location
					</button>
				)} */}
			</div>
		</div>
	);
}

export default InputField;
