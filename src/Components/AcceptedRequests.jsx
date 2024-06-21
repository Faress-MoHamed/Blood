import Header from "./Header";
import { useEffect, useState } from "react";
import { Accepted_Requests, Updata_Role_Patient } from "../End points/User";
import { DNA } from "react-loader-spinner";
import DonationCard from "./DonationCard";

function AcceptedRequests({ setIsOpen }) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const fetchData = async () => {
		setIsLoading(true);
		try {
			if (JSON.parse(localStorage.getItem("user"))?.role === "donor") {
				await Updata_Role_Patient();
			}
			const { data } = await Accepted_Requests();
			console.log(data);
			setData(data);
			sessionStorage.setItem(
				"req",
				data ? JSON.stringify(data) : JSON.stringify({ acceptedRequests: [] })
			);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
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
				<>
					<div className="text-[10px]">
						<Header sizelg={"2xl"} sizesm={"xl"}>
							Accepted Requests
						</Header>
					</div>
					<div className="flex justify-between">
						<button
							onClick={() => fetchData()}
							className="font-semibold bg-black/15 hover:bg-black/25 text-black  hover:underline p-2 rounded-full  duration-300 transition-colors"
						>
							Refresh
						</button>
					</div>{" "}
					{/**this is for accepted Requsts */}
					<div className="mt-5">
						{data?.length !== 0 ? (
							data?.map((el, index) => (
								<div key={index} className="flex flex-col gap-3">
									<DonationCard
										DonorEmail={el?.donor?.email}
										DonorLocation={el?.donor?.location?.address}
										DonorName={el?.donor?.username}
										PatientEmail={el?.patient?.email}
										PatientLocation={el?.patient?.location?.address}
										PatientName={el?.patient?.username}
										status={el?.status}
									/>
									{data?.length !== 1 && (
										<div className="flex justify-center items-center">
											<div className="bg-black/75 h-[2px] w-[80%] text-center"></div>
										</div>
									)}
								</div>
							))
						) : (
							<p>No data to show</p>
						)}
					</div>
				</>
			)}
		</>
	);
}

export default AcceptedRequests;
