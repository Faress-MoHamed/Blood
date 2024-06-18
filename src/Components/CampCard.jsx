function CampCard({ name, date, handleSubmit }) {
	const newDate = new Date(date);

	// Options for formatting the date
	const options = { year: "numeric", month: "long", day: "numeric" };

	// Format the date to a user-friendly string
	const userFriendlyDate = newDate.toLocaleDateString("en-US", options);

	return (
		<div className="flex flex-col gap-2 ">
			<h3>DonateCamp: {name}</h3>
			<p>date: {userFriendlyDate}</p>
		</div>
	);
}

export default CampCard;
