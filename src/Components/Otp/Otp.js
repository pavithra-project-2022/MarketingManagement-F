import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

import axios from "axios";
import UserContext from "../../UserContext";

const Otp = () => {

  const load = () => {
    navigate("/");
    window.location.reload();
  }

  const userContext = useContext(UserContext);
  const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
      userId: userContext.otpId,
      otp:userContext.code
    });

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

    const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
       
        try {
         const res =  await axios.post(`https://mms-server.herokuapp.com/api/auth/verifyOtp`, credentials);
         setMsg(res.data.message)
         setTimeout(()=>{
          navigate("/login")
         },1000)
          
        } catch (err) {
         setError(err.response.data.message)
        }
      };
      

  return (
    <div id="top">
      <div className="login-30 tab-box">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-12 bg-img">
              <div className="informeson">
                <div className="logo">
                  <a href="" onClick={load}>
                    <h1
                      style={{
                        color: "#ffc801",
                        fontSize: "40px",
                        fontWeight: "500",
                      }}
                    >
                      MMS
                    </h1>
                  </a>
                </div>
                <h2>
                  <span>We Make Spectacular</span>
                </h2>
                <div className="btn-section">
                  <Link to="/login">
                    {" "}
                    <a href="" className="btn-theme-3">
                      Login
                    </a>
                  </Link>
                  <Link to="/register">
                    {" "}
                    <a href="" className="btn-theme-2">
                      Register
                    </a>
                  </Link>
                </div>
              </div>
              <div className="social-box"></div>
              <div id="bg">
                <canvas></canvas>
                <canvas></canvas>
                <canvas></canvas>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 form-section">
              <div className="login-inner-form">
                <div className="details">
                  <div className="logo-2">
                   <Link to='/'> <a href="">
                      <h1>MMS</h1>
                    </a></Link>
                  </div>
                  <h1>Welcome!</h1>
                  <h3>OTP Verification</h3>
                  {error && <div className="error_msg" style={{background:"red",color:"white"}}>{error}</div>}
                      {msg && <div className="success_msg" style={{background:"green",color:"white"}}>{msg}</div>}
                
                  <form>
                    
                    <div className="form-group clearfix">
                      <label
                        htmlFor="password"
                        className="form-label float-start"
                      >
                        OTP
                      </label>
                      <input
                        name="otp"
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        id="otp"
                        value={userContext.code}
                        onChange={handleChange}
                        placeholder="Enter OTP"
                        aria-label="Enter OTP"
                      />
                    </div>
                  
                    <div className="form-group clearfix">
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-theme"
                        onClick={handleClick}
                      >
                        <span>Verify</span>
                      </button>
                    </div>
                  </form>
                  <p>
                    Don't have an account?{" "}
                    <a
                      href=""
                      className="thembo"
                      onClick={() => navigate("/register")}
                    >
                      {" "}
                      Register here
                    </a>
                  </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
