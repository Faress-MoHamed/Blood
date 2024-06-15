import { IoIosCloseCircle } from "react-icons/io";
import Header from "./Header";
import { motion } from "framer-motion";
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
			if (JSON.parse(localStorage.getItem("user")).role === "donor") {
				await Updata_Role_Patient();
			}
			const { data } = await Accepted_Requests();
			setData(data);
			sessionStorage.setItem("req", JSON.stringify(data));
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
			(
			<motion.main
				initial={{ top: -100, opacity: 0 }}
				animate={{ top: 0, opacity: 1 }}
				exit={{ top: -100, opacity: 0 }}
				transition={{ duration: 0.3 }}
				className="signUpUser shadow-2xl bg-white relative overflow-y-auto flex justify-center z-[999999] lg:w-full w-[80%]"
			>
				<button
					className="absolute right-6 top-6"
					onClick={() => setIsOpen("")}
				>
					<IoIosCloseCircle className="w-7 h-7 hover:text-black/70 duration-300" />
				</button>
				(
				<div className="container w-[700px] p-8">
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
									data?.map((el) => (
										<div className="flex flex-col gap-3">
											<DonationCard
												ReqId={el._id}
												donorid={el.donor}
												status={el.status}
											/>
											<div className="flex justify-center items-center">
												<div className="bg-black/75 h-[2px] w-[80%] text-center"></div>
											</div>
										</div>
									))
								) : (
									<p>No data to show</p>
								)}
							</div>
						</>
					)}
				</div>
				)
			</motion.main>
			)
		</>
	);
}

export default AcceptedRequests;