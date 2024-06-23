import Header from "./Header";
import RequestCard from "./RequestCard";
import { Donation_Requests, Updata_Role_donor } from "../End points/User";
import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import DonationCheck from "./DonationCheck";

function DonationRequests({ setIsOpen }) {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [IsID, SetId] = useState(null);

	const handleDonation = async () => {
		setIsLoading(true);
		try {
			if (JSON.parse(localStorage.getItem("user"))?.role === "patient") {
				await Updata_Role_donor();
			}
			const response = await Donation_Requests();
			setData(
				response.data?.filter(
					(el) => el.status !== "accepted" && el.status !== "Denied"
				) || []
			);
		} catch (error) {
			console.error("Error fetching donation requests:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleDonation();
	}, []);

	const handleRefresh = () => {
		handleDonation();
	};

	const handleRequestClick = (id) => {
		SetId(id);
		setIsOpen(true);
	};

	return (
		<>
			{IsID ? (
				<DonationCheck setIsOpen={setIsOpen} IsID={IsID} />
			) : (
				<>
					<div className="text-[10px]">
						<Header sizelg={"2xl"} sizesm={"xl"}>
							Donation Requests
						</Header>
					</div>
					<button
						onClick={handleRefresh}
						className="font-semibold bg-black/15 hover:bg-black/25 text-black hover:underline p-2 rounded-full duration-300 transition-colors"
					>
						Refresh
					</button>
					{isLoading ? (
						<div className="flex items-center justify-center h-4/5">
							<DNA
								visible={true}
								height="80"
								width="80"
								ariaLabel="dna-loading"
								wrapperStyle={{}}
								wrapperClass="dna-wrapper"
							/>
						</div>
					) : (
						<div className="py-4">
							{data.map((el, index) => (
								<div className="mt-5" key={el._id}>
									<RequestCard
										ReqId={el?._id}
										SetId={handleRequestClick}
										setIsOpen={setIsOpen}
										donationCheck={el?.donationCheck}
										DonorEmail={el?.donor?.email}
										DonorLocation={el?.donor?.location?.address}
										DonorName={el?.donor?.username}
										PatientEmail={el?.patient?.email}
										PatientLocation={el?.patient?.location?.address}
										PatientName={el?.patient?.username}
										CampName={el?.donationCamp?.name}
										campDate={el?.donationCamp?.date}
										status={el?.status}
									/>
									{index !== data.length - 1 && (
										<div className="flex justify-center items-center my-5">
											<div className="bg-black/75 h-[2px] w-[80%] text-center"></div>
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</>
			)}
		</>
	);
}

export default DonationRequests;
