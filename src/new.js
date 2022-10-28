import React, { useContext, useEffect,useState, useMemo } from "react";
import axios from "axios";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useExpanded,
  useCallback
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";
import './style.css'
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

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Action",
        Cell: ({ row }) => (
          <button onClick={()=>editRow(row)}  title="ModalData" data-bs-toggle="modal" data-bs-target="#ModalData"><i className="fa fa-pencil"></i></button>
          // <button onClick={()=>alert(row.values.projectCode)}><i className="fa fa-pencil"></i></button>
        ),
      },
    ]);
  };
 
  
  const COLUMNS = [
    {
      Header: () => null, // No header
      id: 'expander', // It needs an ID
      Cell: ({ row }) => (
        // Use Cell to render an expander for each row.
        // We can use the getToggleRowExpandedProps prop-getter
        // to build the expander.
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? '👇' : '👉'}
        </span>
      ),
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
      Header: "Out-Time",
      Footer: "Out-Time",
      accessor: "outTime",
      Filter:ColumnFilter,
      disableFilters:true,
    },
  
  ];

  const renderRowSubComponent = useCallback(
    ({ row }) => (
      <pre
        style={{
          fontSize: '10px',
        }}
      >
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
    ),
    []
  )

  const columns = useMemo(() => COLUMNS, []);
  const defaultColumn = useMemo(()=>{
    return {
      Filter:ColumnFilter
    }
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: gridData,
      defaultColumn,
    },
    useFilters,
    tableHooks,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
   
  );

  const { globalFilter, pageIndex, pageSize,expanded } = state;


//   const rowClasses = row => (row.email ? <p style={{width:"250px"}}>{row.email}</p> : "");

//   const columns = [{
//     dataField:"dcmId" , text:"#"
//   },
//   {
//     dataField:"employeeName" , text:"Name",sort:true, filter: textFilter(),headerClasses: "columnHeader"
//   },
//   {
//     dataField:"createDate" , text:"Date", filter: dateFilter(),sort:true, width: "50%"
//   },

//   {
//     dataField:"inTime" , text:"In-Time",sort:true
//   },
//   {
//     dataField:"customerName" , text:"Cust Name",sort:true
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


  return (
    <>
    
  
   {/* <BootstrapTable bootstrap4 keyField="dcmId" 
    filterPosition="bottom"
    columns={columns} 
    expandRow={ expandRow }
    hover
    data={userData}
    pagination={pagination} 
    filter={filterFactory()}
    /> */}

    

<div className="body d-flex py-lg-4 py-3">
              <div className="container">
                <div className="row clearfix">
                  <div className="col-md-12">
                    <div className="card p-4 mb-4">
                      <GlobalFilter
                        filter={globalFilter}
                        setFilter={setGlobalFilter}
                      />
                       
                      <table {...getTableProps()}>
                        <thead>
                          {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                <th
                                  {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                  )}
                                >
                                  {column.render("Header")}
                                  <span>
                                    {column.isSorted
                                      ? column.isSortedDesc
                                        ? "▼"
                                        : "▲"
                                      : ""}
                                  </span>
                                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                          {page.map((row, i) => {
                            prepareRow(row);
                            return (
                              <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                  return (
                                    <React.Fragment {...row.getRowProps()}>
                <tr>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
               
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                     
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          {footerGroups.map((footerGroup) => (
                            <tr {...footerGroup.getFooterGroupProps()}>
                              {footerGroup.headers.map((column) => (
                                <td {...column.getFooterProps}>
                                  {column.render("Footer")}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tfoot>
                      </table>
                      <div className="pagination text-center">
                        {/* <div className="row pag"> */}
                        <div className="col-3 pagination">
                          <span>
                            Page{" "}
                            <strong>
                              {pageIndex + 1} of {pageOptions.length}
                            </strong>
                          </span>
                          </div>
                          <div className="col-3 pagination">
                          <span>
                             Go to page:{" "}
                            <input
                              type="number"
                              defaultValue={pageIndex + 1}
                              onChange={(e) => {
                                const pageNumber = e.target.value
                                  ? Number(e.target.value) - 1
                                  : 0;
                                gotoPage(pageNumber);
                              }}
                              style={{ width: "50px" }}
                            />
                          </span>
                          </div>
                          <div className="col-3 pagination">
                          <select
                            value={pageSize}
                            onChange={(e) =>
                              setPageSize(Number(e.target.value))
                            }
                            style={{marginLeft:"10px"}}
                          >
                            {[5,10, 25, 50].map((pageSize) => (
                              <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-3 pagination">
                          <button
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                            style={{marginLeft:"50px"}}
                          >
                            {"<<"}
                          </button>
                          <button
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                            
                          >
                            {"<"}
                          </button>
                          <button
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                           
                          >
                            {">"}
                          </button>
                          <button
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                            
                          >
                            {">>"}
                          </button>
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
    </>
  );
};

export default AdminEmployeeDCMDatabase;
