import React from "react";

function DonateCampCard({ name, bloodBankId, CampId, CampDate }) {
	function days_between(date1, date2) {
		// The number of milliseconds in one day
		const ONE_DAY = 1000 * 60 * 60 * 24;

		// Calculate the difference in milliseconds
		const differenceMs = Math.abs(date1 - date2);

		// Convert back to days and return
		return Math.round(differenceMs / ONE_DAY);
	}

	const currentDate = new Date(); // Get the current date

	return (
		<div className="flex justify-between items-center">
			<div className="flex flex-col gap-1">
				<div className="donorName text-primary-600 font-semibold">
					Camp Name: {name}
				</div>
				<div className="donorId">Blood Bank ID: {bloodBankId || ""}</div>
				<div className="ReqId">Camp ID: {CampId || ""}</div>
			</div>
			<div className="status text-center font-semibold text-lg capitalize">
				<span className="text-black/60">
					{CampDate ? new Date(CampDate).toDateString() : ""}
				</span>
				<br />
				<span className="text-primary-500">
					{CampDate
						? `${days_between(new Date(CampDate), currentDate)} days until camp`
						: ""}
				</span>
			</div>
		</div>
	);
}

export default DonateCampCard;
