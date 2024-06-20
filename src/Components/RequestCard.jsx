import { useState } from "react";
import { Updata_Request } from "../End points/User";
import toast from "react-hot-toast";
function RequestCard({
	ReqId,
	donorid,
	donationCheck,
	status,
	SetId,
	setIsOpen,
}) {
	const [loadingAccept, setLoadingAccept] = useState(false);
	const [loadingDenied, setLoadingDenied] = useState(false);
	const handleAccept = async () => {
		setLoadingAccept(true);
		const { data } = await Updata_Request(ReqId, "accepted");
		setLoadingAccept(false);
		data ? SetId(ReqId) : setIsOpen(null);
	};
	const handleDenied = async () => {
		setLoadingDenied(true);
		const { data } = await Updata_Request(ReqId, "Denied");
		setLoadingDenied(false);
		data.message && toast.success(data.message);
		data && setIsOpen(null);
	};
	return (
		<div className="flex justify-between items-center lg:text-base text-sm">
			<div className="flex flex-col gap-1">
				<div className="donorName">Donor Name: Fares</div>
				<div className="donorId">user ID: {donorid || ""}</div>
				<div className="ReqId">Request ID: {ReqId || ""}</div>
				<div className="flex justify-between items-center">
					<button
						onClick={() => handleAccept()}
						disabled={loadingAccept}
						className={`${
							loadingAccept
								? "bg-black/25 text-white"
								: "bg-green-600 text-white"
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
			<div className="flex flex-col gap-5 items-center">
				<div
					className={`status font-semibold lg:text-lg text-sm capitalize ${
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
				<div
					className={`status font-semibold  capitalize ${
						donationCheck === "in progress"
							? "text-red-600"
							: status === "denied"
							? "text-green-600"
							: null
					}`}
				>
					{donationCheck === "in progress" ? "in progress" : "proved"}
				</div>
			</div>
		</div>
	);
}

export default RequestCard;
