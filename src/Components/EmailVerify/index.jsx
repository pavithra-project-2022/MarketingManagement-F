import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../image/success.png";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `https://mms-server.herokuapp.com/api/auth/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		
				<div className="container">
					<img src={success} alt="success_img" className="success_img" />
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className="green_btn">Login</button>
					</Link>
				</div>
			
	);
};

export default EmailVerify;