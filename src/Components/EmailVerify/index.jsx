import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import { Fragment } from "../../../node_modules/react/cjs/react.production.min";
import success from "../../image/success.png";

const EmailVerify = () => {
  const param = useParams();
  console.log(param)
  const navigate = useNavigate();

useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `https://mms-server.herokuapp.com/api/auth/${param.id}/verify/${param.token}/`;
        const { data } = await axios.get(url);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    verifyEmailUrl();
  }, [param]);

  const load = () => {
    navigate("/login");
    window.location.reload();
  };

return (
    <Fragment>
      <div className={styles.container}>
        <img src={success} alt="success_img" className={styles.success_img} />
        <h1>Email verified successfully</h1>
        	<button className={styles.green_btn} onClick={load}>
          Login
        </button>
      </div>
    </Fragment>
  );
};

export default EmailVerify;
