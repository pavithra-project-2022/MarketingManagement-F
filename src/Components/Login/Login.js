import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import "./style.css";
import {
    loginFailure,
    loginStart,
    loginSuccess,
  } from "../../authContext/AuthActions";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");


  const load = () => {
    navigate("/");
    window.location.reload();
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("https://mms-server.herokuapp.com/api/auth/login", {
        email,
        mobile,
        username,
        password,
      });
      dispatch(loginSuccess(res.data));
      setMsg(res.data.message);
      setTimeout(() => {
        navigate('/dashboard')
      window.location.reload()
      }, 2000);
      
    } catch (err) {
      dispatch(loginFailure(err.response.data.message));
      const error = err.response.data.message;
      setError(error);
      setTimeout(() => {
        navigate("/");
      }, 2000);
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
                  <h3>Sign Into Your Account</h3>
                  {error && <div className="error_msg" style={{background:"red",color:"white"}}>{error}</div>}
                      {msg && <div className="success_msg" style={{background:"green",color:"white"}}>{msg}</div>}
                
                  <form>
                    <div className="row">
                    <div className="form-group col-4">
                      <label
                        htmlFor="email"
                        className="form-label float-start"
                      >
                        Email/
                      </label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        aria-label="Email Address"
                      />
                      </div>
                      <div className="form-group col-4">
                      <label
                        htmlFor="mobile"
                        className="form-label float-start"
                      >
                        Mobile/
                      </label>
                       <input
                        name="mobile"
                        type="text"
                        className="form-control"
                        id="mobile"
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Mobile No"
                        aria-label="Mobile No"
                      />
                    </div> 
                    <div className="form-group col-4">
                      <label
                        htmlFor="username"
                        className="form-label float-start"
                     >
                      Username
                      </label>
                       <input
                        name="username"
                        type="text"
                        className="form-control"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        aria-label="Username"
                      />
                    </div> 
                    </div>
                    <div className="form-group clearfix">
                      <label
                        htmlFor="password"
                        className="form-label float-start"
                      >
                        Password
                      </label>
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        autoComplete="off"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        aria-label="Password"
                      />
                    </div>
                    <div className="checkbox form-group clearfix">
                      <div className="form-check float-start">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberme"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberme"
                        >
                          Remember me
                        </label>
                      </div>
                      <Link to="/forgotPassword">
                        {" "}
                        <a
                          href=""
                          className="link-light float-end forgot-password"
                        >
                          Forgot your password?
                        </a>{" "}
                      </Link>
                    </div>
                    <div className="form-group clearfix">
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-theme"
                        onClick={handleLogin}
                      >
                        <span>Login</span>
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

export default Login;
