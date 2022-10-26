import React, { useEffect, useState } from "react";
import axios from "axios";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
// import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./style.css";

const dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("-");
    var cellDate = new Date(
      Number(dateParts[0]),
      Number(dateParts[1]) - 1,
      Number(dateParts[2])
    );
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }

    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
  },
  browserDatePicker: true,
};

const AdminEmployeeDCMDatabase = () => {
  const [gridApi, setGridApi] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let users = await axios.get(
        "https://mms-application.herokuapp.com/api/dcm"
      );
      setUserData(users.data);
    }
    fetchData();
  }, []);

  const [name, setName] = useState("");

  // the search result
  const [foundUsers, setFoundUsers] = useState(userData);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = userData.filter((user) => {
        const name = user.employeeName.toLowerCase();
        return name.startsWith(keyword);
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(userData);
    }

    setName(keyword);
  };

  //   const columns = [
  //     { headerName: "Dcm Id", field: "dcmId" },
  //     { headerName: "Employee Name", field: "employeeName" },
  //     { headerName: "Create Date", field: "createDate" },
  //     {
  //       headerName: "Create Time",
  //       field: "createTime",
  //       filter: "agDateColumnFilter",
  //       filterParams: dateFilterParams,
  //     },
  //     { headerName: "In-Time", field: "inTime" },
  //     { headerName: "Customer Name", field: "customerName" },
  //     { headerName: "Needs", field: "needs" },
  //     { headerName: "Contact No", field: "mobile" },
  //     { headerName: "Email", field: "email" },
  //     { headerName: "Out-Time", field: "outTime" },
  //   ];
  //   const defColumnDefs = { flex: 1 };

  const onGridReady = (params) => {
    setGridApi(params);
  };
  const getFilterType = () => {
    if (startDate !== "" && endDate !== "") return "inRange";
    else if (startDate !== "") return "Equals";
    else if (endDate !== "") return "Equals";
  };
  useEffect(() => {
    if (gridApi) {
      if (startDate !== "" && endDate !== "" && startDate > endDate) {
        alert("Start Date should be before End Date");
        setEndDate("");
      } else {
        var dateFilterComponent = gridApi.api.getFilterInstance("createDate");
        dateFilterComponent.setModel({
          type: getFilterType(),
          dateFrom: startDate ? startDate : endDate,
          dateTo: endDate,
        });
        gridApi.api.onFilterChanged();
      }
    }
  }, [startDate, endDate]);

  return (
    <>
      <div className="ag-theme-alpine" >
        <div className="dateDiv" style={{ marginLeft: "350px" }}>
          <span hidden>From :{" "}</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            hidden
          />{" "}
          <span hidden>To :{" "}</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            hidden
          />
        </div>
        <br />
<h3 className="text-center">Daily Customer Meet Data</h3>
        <AgGridReact
          cellClass="vertical-middle"
          defaultColDef={{ flex: 1, width: 200 }}
          rowHeight={40}
          rowData={userData}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
        >
           <AgGridColumn
            field="dcmId"
            headerName="#"
            filter={true}
            cellClass="vertical-middle"
            resizable={true}
          />
          <AgGridColumn
            field="employeeName"
            headerName="Name"
            sortable="asc"
            filter={true}
            cellClass="vertical-middle"
            resizable={true}
          />
          <AgGridColumn
            field="createDate"
            headerName="Date"
            sortable={true}
            filter="agDateColumnFilter"
            filterParams={dateFilterParams}
            cellClass="vertical-middle"
            resizable={true}
          />

          <AgGridColumn
            field="inTime"
            headerName="In-Time"
            sortable={true}
            filter={true}
            cellClass="vertical-middle"
            resizable={true}
          />
          <AgGridColumn
            field="customerName"
            headerName="Customer Name"
            sortable={true}
            cellClass="vertical-middle"
            resizable={true}
          />
          {/* <AgGridColumn
            field="needs"
            headerName="Needs"
            cellClass="vertical-middle"
            resizable={true}
          />
          <AgGridColumn
            field="mobile"
            headerName="Contact No"
            cellClass="vertical-middle"
            resizable={true}
          />
          <AgGridColumn
            field="email"
            headerName="Email"
            cellClass="vertical-middle"
            resizable={true}
          /> */}
          <AgGridColumn
            field="outTime"
            headerName="Out-Time"
            sortable={true}
            filter={true}
            cellClass="vertical-middle"
            resizable={true}
          />
        </AgGridReact>
      </div>
    </>
  );
};

export default AdminEmployeeDCMDatabase;
