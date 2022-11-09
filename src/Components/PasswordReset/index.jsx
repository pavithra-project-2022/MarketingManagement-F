import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `https://mms-server.herokuapp.com/api/password-reset/${param.id}/${param.token}`;

	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			window.location = "/login";
		} catch (error) {
			
				setError(error.response.data.message);
				setMsg("");
			
		}
	};

	return (
		<Fragment>
			{validUrl ? (
				<div className={styles.container}>
					
					<form className={styles.form_container} onSubmit={handleSubmit}>
					{error && <div className="error_msg" style={{background:"red",color:"white"}}>{error}</div>}
                      {msg && <div className="success_msg" style={{background:"green",color:"white"}}>{msg}</div>}
                
						<h3>Add New Password</h3>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className={styles.input}
						/>
					
						<button type="submit" className={styles.green_btn}>
							Submit
						</button>
					</form>
				</div>
			) : (
				""
			)}
		</Fragment>
	);
};

export default PasswordReset;