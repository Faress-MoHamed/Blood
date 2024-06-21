import { useState } from "react";
import { Updata_Request } from "../End points/User";
import toast from "react-hot-toast";
function RequestCard({
	ReqId,
	status,
	SetId,
	setIsOpen,
	PatientName,
	PatientEmail,
	PatientLocation,
	DonorName,
	DonorEmail,
	DonorLocation,
}) {
	const [loadingAccept, setLoadingAccept] = useState(false);
	const [loadingDenied, setLoadingDenied] = useState(false);
	const handleAccept = async () => {
		setLoadingAccept(true);
		const data = await Updata_Request(ReqId, "accepted");
		setLoadingAccept(false);
		data ? SetId(ReqId) : setIsOpen(null);
	};
	const handleDenied = async () => {
		setLoadingDenied(true);
		const data = await Updata_Request(ReqId, "Denied");
		setLoadingDenied(false);
		// data.message && toast.success(data.message);
		console.log(data)
		data && setIsOpen(null);
	};
	return (
		<div className="flex flex-col gap-1">
			<div className="w-full bg-white rounded-lg overflow-hidden ">
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
					<h2 className="text-2xl font-semibold text-gray-800">
						Donor Details
					</h2>
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
			<div className="flex justify-between items-center w-2/4">
				<button
					onClick={() => handleAccept()}
					disabled={loadingAccept}
					className={`${
						loadingAccept ? "bg-black/25 text-white" : "bg-green-600 text-white"
					} rounded-full  px-8 py-2 font-semibold`}
				>
					{loadingAccept ? "Loading..." : "Accept"}
				</button>{" "}
				<button
					onClick={() => handleDenied()}
					disabled={loadingDenied}
					className={`${
						loadingDenied ? "bg-black/25 text-white" : "bg-red-600 text-white"
					} rounded-full   px-8 py-2 font-semibold`}
				>
					{loadingDenied ? "Loading..." : "Denied"}
				</button>
			</div>
		</div>
	);
}

export default RequestCard;
