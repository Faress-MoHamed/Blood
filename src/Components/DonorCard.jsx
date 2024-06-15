function DonorCard({ email, location, id, setSelected, select }) {
	return (
		<div className="rounded-lg flex items-center justify-between">
			<div className="flex gap-5">
				<div className="image rounded-full">
					<img
						src="./download.jpeg"
						className=" rounded-full w-10 h-10"
						alt="donor"
					/>
				</div>
				<div className="details">
					<div className="email">{email}</div>
					<div className="location">{location.address}</div>
				</div>
			</div>
			<div>
				{select.find((value) => value === id) ? (
					<button
						onClick={() =>
							setSelected((prevSelected) =>
								prevSelected.filter((el) => el !== id)
							)
						}
						className=" font-bold text-primary-500 p-2 rounded-full bg-black/5 duration-300 transition-colors"
					>
						Selected
					</button>
				) : (
					<button
						onClick={() => setSelected((prevSelected) => [...prevSelected, id])}
						className="donor-btn font-bold text-primary-500 p-2 rounded-full hover:bg-black/5 duration-300 transition-colors"
					>
						send Request
					</button>
				)}
			</div>
		</div>
	);
}

export default DonorCard;
