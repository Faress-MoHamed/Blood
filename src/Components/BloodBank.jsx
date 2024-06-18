import { useEffect, useState } from "react";
import { getDonationCamps } from "../End points/User";

function BloodBank() {
	const [camps, setCamps] = useState(null);
	useEffect(() => {
		async function donationCamps() {
			await getDonationCamps();
		}
		donationCamps();
	}, []);
	return <div>BloodBank</div>;
}

export default BloodBank;
