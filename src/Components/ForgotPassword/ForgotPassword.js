import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/style.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `https://mms-server.herokuapp.com/api/password-reset`;
      const res = await axios.post(url, { email });
      setMsg(res.data.message);
      setError("");
    } catch (error) {
      setError(error.response.data.message);
      setMsg("");
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
                  <a href="" onClick={() => navigate("/")}>
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
                  <a href="login-30.html" className="btn-theme-2">
                    Login
                  </a>
                  <a href="register-30.html" className="btn-theme-2">
                    Register
                  </a>
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
                    <a href="" onClick={() => navigate("/")}>
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
                  <h1>Welcome!</h1>
                  <h3>Recover Your Password</h3>
                  {error && (
                    <div
                      className="error_msg"
                      style={{ background: "red", color: "white" }}
                    >
                      {error}
                    </div>
                  )}
                  {msg && (
                    <div
                      className="success_msg"
                      style={{ background: "green", color: "white" }}
                    >
                      {msg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label float-start">
                        Email address
                      </label>
                      <input
                        name="email"
                        id="email"
                        type="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email Address"
                        aria-label="Email Address"
                      />
                    </div>
                    <div className="form-group clearfix">
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-theme"
                      >
                        <span>Send Me Email</span>
                      </button>
                    </div>
                  </form>
                  <p>
                    Already a member?{" "}
                    <a href="" onClick={() => navigate("/login")}>
                      Login here
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

export default ForgotPassword;
