import { useEffect, useState } from "react";
import { getDonationCamps } from "../End points/User";
import Header from "./Header";
import { DNA } from "react-loader-spinner";
import DonateCampCard from "./DonateCampCard";

function Camps({ setIsOpen }) {
	const [camps, setCamps] = useState(null);
	const [loading, setLoading] = useState(null);
	useEffect(() => {
		async function donationCamps() {
			setLoading(true);
			const { data } = await getDonationCamps();
			console.log(data);
			setCamps(data);
			if (!data) {
				setIsOpen(null);
			}
			setLoading(false);
		}
		donationCamps();
	}, [setIsOpen]);
	return (
		<>
			<div className="text-[10px]">
				<Header sizelg={"xl"} sizesm={"lg"}>
					Donation Camps
				</Header>
			</div>
			{loading && (
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
			{camps && (
				<div className="flex flex-col gap-5">
					{camps?.map((el, index) => (
						<>
							<DonateCampCard
								CampId={el?._id}
								bloodBankId={el?.bloodBank}
								CampDate={el?.date}
								name={el?.name}
							/>
							{index !== camps.length - 1 && (
								<div className="flex justify-center items-center">
									<div className="bg-black/75 h-[2px] w-[80%] text-center"></div>
								</div>
							)}
						</>
					))}
				</div>
			)}
		</>
	);
}

export default Camps;
