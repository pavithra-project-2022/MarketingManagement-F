import React from "react";
import CommonDashboard from "../CommonDashboard/CommonDashboard";
import EmployeeProfile from "../EmployeeProfile/EmployeeProfile";
import EmployeeUsername from "../EmployeeUsername/EmployeeUsername";
import SettingModal from "../SettingModal/SettingModal";

const EmployeeUsernameComp = () => {
  return (
    <>
    <div id="layout-k" className="theme-orange" style={{marginTop:"20px"}}>
     
      <CommonDashboard/>

      <div className="main px-lg-4 px-1">
        <div className="body-header border-bottom d-flex py-3">
          <div className="container-fluid">
            <div className="row align-items-center">
              <EmployeeUsername/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SettingModal />
  </>
  );
};

export default EmployeeUsernameComp;
