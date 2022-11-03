import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";

const EmployeeUsername = () => {
 
  let showDate = new Date();
  let todayDate = showDate.getDate()+'/'+(showDate.getMonth()+1)+'/'+showDate.getFullYear();
  let timeNow = showDate.getHours()+":"+showDate.getMinutes()+":"+showDate.getSeconds()

  const { user } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username:""
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        
        `https://mms-server.herokuapp.com/api/users/${user.details._id}`,
        credentials
      );
      navigate("/dashboard");
     
      window.location.reload()
    } catch (err) {
      setError(err.response.data);
    }
  };


  const [userData, setUserData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let users = await axios.get(
        `https://mms-server.herokuapp.com/api/users/${user.details._id}`
      );
      setUserData(users.data);
    }
    fetchData();
  }, []);

  return (
    <div class="content">
      <div class="card">
        <div class="card-body">
          <form class="form-validate-jquery" action="#">
            <fieldset class="mb-3">
              <legend class="text-uppercase font-size-sm font-weight-bold border-bottom text-center">
                Setting Username
              </legend>

            
              <div class="form-group row">
                <label class="col-form-label col-lg-3">
                  User Name <span class="text-danger">*</span>
                </label>
                <div class="col-lg-9">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    required
                    class="form-control touchspin-postfix"
                    placeholder="Create Username"
                    value={userData?.username}
                    disabled={userData?.username ? true : false}
                  />
                </div>
              </div>

            
            </fieldset>

            <div class="d-flex justify-content-end align-items-center">
              <button type="reset" class="btn btn-lg btn-light" id="reset">
                Reset <i class="icon-reload-alt ml-2"></i>
              </button>
              <button
                type="submit"
                class="btn btn-lg btn-primary ml-3"
                onClick={handleClick}
              >
                Submit <i class="icon-paperplane ml-2"></i>
              </button>
            </div>
          </form>
          
        </div>
        <i className="fa fa-arrow-left" onClick={()=>navigate('/dashboard')}></i>
      </div>
    </div>
  );
};

export default EmployeeUsername;
