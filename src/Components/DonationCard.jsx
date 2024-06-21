function DonationCard({
	PatientName,
	PatientEmail,
	PatientLocation,
	DonorName,
	DonorEmail,
	DonorLocation,
	status,
}) {
	return (
		<div className= "w-full bg-white rounded-lg overflow-hidden ">
			<div className="p-4">
				<h2 className="text-2xl font-semibold text-gray-800">
					Patient Details
				</h2>
				<div className="mt-3">
					<p>
						<span className="font-medium">Name:</span> {PatientName}
					</p>
					<p>
						<span className="font-medium">Email:</span> {PatientEmail}
					</p>
					<p>
						<span className="font-medium">Location:</span> {PatientLocation}
					</p>
				</div>
			</div>
			<div className="border-t p-4">
				<h2 className="text-2xl font-semibold text-gray-800">Donor Details</h2>
				<div className="mt-3">
					<p>
						<span className="font-medium">Name:</span> {DonorName}
					</p>
					<p>
						<span className="font-medium">Email:</span> {DonorEmail}
					</p>
					<p>
						<span className="font-medium">Location:</span> {DonorLocation}
					</p>
				</div>
			</div>
			<div className="border-t p-4">
				<h2 className="text-2xl font-semibold text-gray-800">Status</h2>
				<div className="mt-3">
					<p>{status}</p>
				</div>
			</div>
		</div>

	);
}

export default DonationCard;
