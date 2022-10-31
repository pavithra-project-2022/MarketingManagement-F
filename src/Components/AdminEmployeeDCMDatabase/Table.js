import React from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useExpanded,
  useCallback,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";

const Table = ({
  columns,
  data,
  renderRowSubComponent,
  IndeterminateCheckbox,
}) => {
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
    state: { globalFilter, pageIndex, pageSize, expanded },
    setGlobalFilter,
    visibleColumns,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  );

  return (
    <div className="body d-flex py-lg-4 py-3">
      <div className="container">
        <div className="row clearfix">
          <div className="col-md-12">
            {/* <div className="card p-4 mb-4"> */}
            <div className="row">
              <div className="col-sm-12">
                <GlobalFilter
                  filter={globalFilter}
                  setFilter={setGlobalFilter}
                />
              </div>
              <br/>
              <h6>Column visibility</h6>
              <div className="col-sm-12">
                <div>
                  <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />{" "}
                  Toggle All
                </div>
                {allColumns.map((column) => (
                  <div key={column.id}>
                    <label>
                      <input
                        type="checkbox"
                        {...column.getToggleHiddenProps()}
                      />{" "}
                      {column.Header}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <br/>
            <div className="pagination text-center">
              <div className="row d-flex">
            <div className="col-6 pagination">
                <span>
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>
                </span>
              </div>
              <div className="col-6 pagination">
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  style={{ marginLeft: "5px" }}
                >
                  {[5, 10, 25, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              </div>
              </div>
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
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <React.Fragment key={row.id} {...row.getRowProps()}>
                      <tr>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
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
             
              <div className="col-6 pagination">
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
                    style={{ width: "10px" }}
                  />
                </span>
              </div>
             
              <div className="col-6 pagination">
                <button
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                  style={{ marginLeft: "10px" }}
                >
                  {"<<"}
                </button>
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                  style={{ marginLeft: "6px" }}
                >
                  {"<"}
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage} style={{ marginLeft: "6px" }}>
                  {">"}
                </button>
                <button
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                  style={{ marginLeft: "6px" }}
                >
                  {">>"}
                </button>
              </div>
              {/* </div> */}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
