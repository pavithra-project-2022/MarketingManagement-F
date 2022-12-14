import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import AdminEmployeeProfileData from "../AdminEmployeeProfileData/AdminEmployeeProfileData";
import CommonDashboard from "../CommonDashboard/CommonDashboard";
import SettingModal from "../SettingModal/SettingModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const load = () => {
    navigate("/dashboard");
    window.location.reload();
  };

  return (
    <>
      <div id="layout-k" className="theme-orange" style={{marginTop:"25px"}}>
        <CommonDashboard />
        <div className="main px-lg-4 px-1" >
          <div className="body-header border-bottom d-flex py-3" style={{position:"fixed"}}>
            <div className="container-fluid">
              <div className="row align-items-center">
              
                {user.details.role === "user" ? (
                  <>
                    <div className="col-6">
                     
                      <h1 className="h4 mt-1">Dashboard</h1>
                    </div>

                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-lg btn-primary lift"
                        onClick={() => navigate("/dashboardDataComp")}
                      >
                        Create DCM
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                  
                     <div className="col-6" >
                     
                      <h1 className="h4 mt-1">Dashboard</h1>
                    </div>

                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-lg btn-primary lift"
                        onClick={() => navigate("/adminEmployeeProfileLayout")}
                      >
                        Employee Information
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SettingModal />
    </>
  );
};

export default Dashboard;
