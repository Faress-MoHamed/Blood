import { motion } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";
import Header from "./Header";
import RequestCard from "./RequestCard";
import { Donation_Requests, Updata_Role_donor } from "../End points/User";
import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import DonationCheck from "./DonationCheck";
function DonationRequests({ setIsOpen }) {
	const [Isloading, setIsLoading] = useState(null);
	let [data, setData] = useState(null);
	const [IsID, SetId] = useState(null);

	const handleDonation = async () => {
		setIsLoading(true);
		if (JSON.parse(localStorage.getItem("user")).role === "patient") {
			await Updata_Role_donor();
		}
		const { data } = await Donation_Requests();
		setData(
			data?.filter((el) => el.status !== "accepted" && el.status !== "Denied")
		);
		setIsLoading(false);
	};
	useEffect(() => {
		handleDonation();
	}, []);
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
						onClick={() => handleDonation()}
						className="font-semibold bg-black/15 hover:bg-black/25 text-black  hover:underline p-2 rounded-full  duration-300 transition-colors"
					>
						Refresh
					</button>
					{Isloading && (
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
					)}
					<div className="py-4">
						{data?.map((el, index) => (
							<div className="mt-5" key={el._id}>
								<RequestCard
									key={el?._id}
									SetId={SetId}
									setIsOpen={setIsOpen}
									ReqId={el?._id}
									donorid={el?.donor}
									status={el?.status}
									donationCheck={el?.donationCheck}
								/>

								{index !== data?.length - 1 && (
									<div className="flex justify-center items-center my-5">
										<div className="bg-black/75 h-[2px] w-[80%] text-center"></div>
									</div>
								)}
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
}

export default DonationRequests;
