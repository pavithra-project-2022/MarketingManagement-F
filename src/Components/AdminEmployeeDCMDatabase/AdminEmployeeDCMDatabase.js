import React, { useContext, useEffect,useState, useMemo, useRef } from "react";
import axios from "axios";
import ColumnFilter from "./ColumnFilter";
import './style.css'
import Table from "./Table";
// import BootstrapTable from 'react-bootstrap-table-next'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// import filterFactory, { textFilter,dateFilter, customFilter } from 'react-bootstrap-table2-filter';
// import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'



const AdminEmployeeDCMDatabase = () => {

  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let users = await axios.get(`https://mms-server.herokuapp.com/api/dcm`);
      setGridData(users.data);
      setLoading(false);
    }
    fetchData();
  }, []);


 
  
  const columns = useMemo(()=>[
    {
      Header: () => null, // No header
      id: 'Expander', // It needs an ID
      Cell: ({ row }) => (
        // Use Cell to render an expander for each row.
        // We can use the getToggleRowExpandedProps prop-getter
        // to build the expander.
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? '👇' : '👉'}
        </span>
      ),
      
    },
    {
      Header:"#",
      Footer: "#",
      accessor: "dcmId",
      Filter:ColumnFilter,
      disableFilters:true,
    },
    {
      Header: "Name",
      Footer: "Name",
      accessor: "employeeName",
      Filter:ColumnFilter,
      
    },
    {
      Header: "Date",
      Footer: "Date",
      accessor: "createDate",
      Filter:ColumnFilter,
    },
    {
      Header: "In-Time",
      Footer: "In-Time",
      accessor: "inTime",
      Filter:ColumnFilter,
      disableFilters:true,
    },
    {
      Header: "Cust Name",
      Footer: "Cust Name",
      accessor: "customerName",
      Filter:ColumnFilter,
      disableFilters:true,
    },
    {
      Header: "Email",
      Footer: "Email",
      accessor: "email",
      Filter:ColumnFilter,
      disableFilters:true,
    },
    {
      Header: "Mobile",
      Footer: "Mobile",
      accessor: "mobile",
      Filter:ColumnFilter,
      disableFilters:true,
    },
    {
      Header: "Needs",
      Footer: "Needs",
      accessor: "needs",
      Filter:ColumnFilter,
      disableFilters:true,
    },
    {
      Header: "Out-Time",
      Footer: "Out-Time",
      accessor: "outTime",
      Filter:ColumnFilter,
      disableFilters:true,
    },
  
  ],[]) 

  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <pre
        style={{
          fontSize: '10px',
        }}
      >
        <p>ID: {row.values.dcmId}</p>
        <p>Employee Name: {row.values.employeeName}</p>
        <p>Create Date: {row.values.createDate}</p>
        <p>In-Time: {row.values.inTime}</p>
        <p>Customer Name: {row.values.customerName}</p>
        <p>Email: {row.values.email}</p>
        <p>Contact Number: {row.values.mobile}</p>
        <p>Customer Needs: {row.values.needs}</p>
        <p>Out-Time: {row.values.outTime}</p>
      </pre>
    ),
    []
  )

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return <input type="checkbox" ref={resolvedRef} {...rest} />
    }
  )
  

  return (
   <div>
    {
      loading?(<span>Loading...</span>):(<Table columns={columns} data={gridData} renderRowSubComponent={renderRowSubComponent}
        IndeterminateCheckbox={IndeterminateCheckbox}/>)
    }
   </div>
  );
};

export default AdminEmployeeDCMDatabase;
