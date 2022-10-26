import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import DataTable from "react-data-table-component";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, {
  textFilter,
  dateFilter,
} from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

const AdminEmployeeDCMDatabase = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let users = await axios.get(
        "https://mms-application.herokuapp.com/api/dcm"
      );
      setUserData(users.data);
      setFilteredUserData(users.data)
    }
    fetchData();
  }, []);

  //   const rowClasses = row => (row.email ? <p style={{width:"250px"}}>{row.email}</p> : "");

  //   const columns = [{
  //     dataField:"dcmId" , text:"#"
  //   },
  //   {
  //     dataField:"employeeName" , text:"Employee Name",sort:true, filter: textFilter(),headerClasses: "columnHeader"
  //   },
  //   {
  //     dataField:"createDate" , text:"Create Date", filter: dateFilter(),sort:true, width: "50%"
  //   },

  //   {
  //     dataField:"inTime" , text:"In-Time",sort:true
  //   },
  //   {
  //     dataField:"customerName" , text:"Customer Name",sort:true
  //   },

  //   {
  //     dataField:"outTime" , text:"Out-Time",sort:true
  //   },

  // ]

  // const pagination = paginationFactory({
  //   page:1,
  //   sizePerPage:5,
  //   lastPageText:'>>',
  //   firstPageText:'<<',
  //   nextPageText:'>',
  //   prePageText:'<',
  //   showTotal:true,
  //   alwaysShowAllBtns:true,
  //   onPageChange:function(page, sizePerPage){
  //     console.log('page',page);
  //     console.log('sizePerPage',sizePerPage)
  //   }
  // })

  // const expandRow = {
  //   renderer: row => (
  //     <div>Employee Name : {row.employeeName}
  //     <br/>
  //     Create Date : {row.createDate}
  //     <br/>
  //     In-Time : {row.inTime}<br/>
  //     Customer Name : {row.customerName}<br/>
  //     Needs : {row.needs}<br/>
  //     Email : {row.email}<br/>
  //     Phone : {row.mobile}<br/>
  //     Out-Time : {row.outTime}
  //     </div>

  //   )
  // };

  const [search, setSearch] = useState("")
  const [filteredUserData, setFilteredUserData] = useState([])

  const columns = [
    {
      name: "#",
      selector: (row) => row.dcmId,
      
    },
    {
      name: "Name",
      selector: (row) => row.employeeName,
      sortable:true,
    },
    {
      name: "Create Date",
      selector: (row) => row.createDate,
      sortable:true,
    },
    {
      name: "In-Time",
      selector: (row) => row.inTime,
      sortable:true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customerName,
      sortable:true,
    },
   
    {
      name: "Needs",
      selector: (row) => row.needs,
      
    },
    {
      name: "Out-Time",
      selector: (row) => row.outTime,
      sortable:true,
    },
  ];

  useEffect(()=>{
    const result = userData.filter(e=>{
      return e.employeeName.toLowerCase().match(search.toLowerCase())
    })
    setFilteredUserData(result)
  },[search])

  const ExpandedComponent = ({ data }) => <p>Name: {data.employeeName}<br/>
  Create Date: {data.createDate}<br/>
  In Time: {data.inTime}<br/>
  Customer Name: {data.customerName}<br/>
  Needs: {data.needs}<br/>
  Contact No: {data.mobile}<br/>
  Email: {data.email}<br/>
  Out Time: {data.outTime}</p>;
  

  
  

  return (
    <>
      <DataTable
        title="Daily Customer Meet Database"
        columns={columns}
        data={filteredUserData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        highlightOnHover
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        subHeader
        subHeaderComponent={
          <input type="text" className="w-25 form-control" placeholder="Search here..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
         
          />
        }
       
        theme="solarized"
        pointerOnHover
      />
      {/* <h4 className="text-center">Daily Customer Meet Data</h4>
   <BootstrapTable bootstrap4 keyField="dcmId" 
    filterPosition="top"
    columns={columns} 
    expandRow={ expandRow }
    hover
    data={userData} pagination={pagination} filter={filterFactory()}/> */}
      {/* <table
          className="table table-bordered"
          id="dataTable"
          width="100%"
          cellSpacing="0"
        >
          <thead className="text-center">
            <tr>
              <th>Dcm ID</th>
              <th>Employee Name</th>
              <th>In Time</th>
              <th>Customer Name</th>
              <th>Needs</th>
              <th>Contact No</th>
              <th>Email</th>
              <th>Out Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {foundUsers && foundUsers.length > 0 ? foundUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center ">{item.dcmId}</td>
                      <td className="text-center ">{item.employeeName}</td>
                      <td className="text-center ">{item.inTime}</td>
                      <td className="text-center ">{item.customerName}</td>
                      <td className="text-center ">{item.needs}</td>
                      <td className="text-center ">{item.mobile}</td>
                      <td className="text-center ">{item.email}</td>
                      <td className="text-center ">{item.outTime}</td>
                      <td className="text-center ">
                        <Link to={`/dcm-edit/${item.userId}`}>
                          <i className="fa fa-pencil"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              : userData.map((e, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center ">{e.dcmId}</td>
                      <td className="text-center ">{e.employeeName}</td>
                      <td className="text-center ">{e.inTime}</td>
                      <td className="text-center ">{e.customerName}</td>
                      <td className="text-center ">{e.needs}</td>
                      <td className="text-center ">{e.mobile}</td>
                      <td className="text-center ">{e.email}</td>
                      <td className="text-center ">{e.outTime}</td>
                      <td className="text-center ">
                        <Link to={`/dcm-edit/${e.dcmId}`}>
                          <i className="fa fa-pencil"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table> */}
    </>
  );
};

export default AdminEmployeeDCMDatabase;
