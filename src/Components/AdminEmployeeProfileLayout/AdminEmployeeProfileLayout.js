import React from 'react'
import AdminEmployeeProfileData from '../AdminEmployeeProfileData/AdminEmployeeProfileData'
import CommonDashboard from '../CommonDashboard/CommonDashboard'
import SettingModal from '../SettingModal/SettingModal'

const AdminEmployeeProfileLayout = () => {
  return (
    <>
    <div id="layout-k" className="theme-orange" style={{marginTop:"25px",position:"sticky"}}>
     
      <CommonDashboard/>

      <div className="main px-lg-4 px-1">
        <div className="body-header border-bottom d-flex py-3">
          <div className="container-fluid">
            <div className="row align-items-center">
              <AdminEmployeeProfileData/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SettingModal />
  </>
  )
}

export default AdminEmployeeProfileLayout