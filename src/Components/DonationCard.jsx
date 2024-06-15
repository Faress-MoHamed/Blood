

function DonationCard({ ReqId, donorid, status }) {

	return (
		<div className="flex justify-between items-center">
			<div className="flex flex-col gap-1">
				<div className="donorName">Donor Name: Fares</div>
				<div className="donorId">Donor ID: {donorid || ""}</div>
				<div className="ReqId">Request ID: {ReqId || ""}</div>

			</div>
			<div
				className={`status font-semibold text-lg capitalize ${
					status === "accepted"
						? "text-green-600"
						: status === "suspended"
						? "text-yellow-600"
						: status === "denied"
						? "text-red-600"
						: null
				}`}
			>
				{" "}
				{status}
			</div>
		</div>
	);
}

export default DonationCard;
