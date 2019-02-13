import React from "react";
// import ReactToPrint from "react-to-print";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import createMockData from "./mock";
// import ExportToExcel from "./components/ExportToExcel";

import "./style.css";
// import ReactDataExport from "./components/ReactDataExport";

function MyCell({
  value,
  columnProps: {
    rest: { someFunc }
  }
}) {
  return (
    <a href={`/#/app/settings/table/react-table/${value}`} onClick={someFunc}>
      {value}
    </a>
  );
}
function handleDownload() {
  document.getElementById("test-table-xls-button").click();
}
const columns = [
  {
    Header: () => {
      return (
        <div>
          <button onClick={handleDownload}>Export</button>
          {/* <ReactToPrint
            trigger={() => <a href="#">Print this out!</a>}
            content={() => this.componentRef}
          /> */}
          {/* <Table ref={el => (this.  = el)} /> */}
        </div>
      );
    },
    columns: [
      {
        Header: "Invertor",
        columns: [
          {
            accessor: "id",
            Header: "ID",
            maxWidth: 50,
            filterable: false,
            Cell: MyCell
            // getProps: () => ({ someFunc: () => alert("clicked") })
          },
          { accessor: "location", Header: "Location" },
          {
            accessor: "centralNo",
            Header: "CentralNo",
            sortable: false,
            width: 80
          },
          {
            accessor: "inverterNo",
            Header: "InverterNo",
            sortable: false,
            width: 80
          }
        ]
      },
      {
        Header: "Values",
        columns: [
          {
            accessor: "progress",
            Header: "Profile progress",
            Cell: row => {
              //stringsCount , workedStrings
              const percent =
                (row.value.workedStrings / row.value.stringsCount) * 100;
              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#dadada",
                    borderRadius: "2px",
                    display: "grid"
                  }}
                >
                  <span style={{ fontSize: "12px" }}>
                    {row.value.workedStrings}/{row.value.stringsCount}
                  </span>
                  <div
                    style={{
                      width: `${percent}%`,
                      height: "100%",
                      backgroundColor:
                        percent > 80
                          ? "#85cc00"
                          : percent > 70
                            ? "#ffbf00"
                            : "#ff2e00",
                      borderRadius: "2px",
                      transition: "all .2s ease-out"
                    }}
                  />
                </div>
              );
            }
          },
          {
            accessor: "status",
            Header: "Status",
            Cell: (
              row // 2-running 1-slow 0-stopped
            ) => (
              <div style={{ display: "table" }}>
                <span
                  style={{
                    color:
                      row.value === 0
                        ? "#ff2e00"
                        : row.value === 1
                          ? "#ffbf00"
                          : "#57d500",
                    transition: "all .3s ease",
                    fontSize: "24px",
                    display: "table-cell",
                    verticalAlign: "middle",
                    padding: "0 10px"
                  }}
                >
                  &#x25cf;
                </span>
                <span
                  style={{ display: "table-cell", verticalAlign: "middle" }}
                >
                  {row.value === 0
                    ? "stopped"
                    : row.value === 1
                      ? "slow"
                      : "running"}
                </span>
              </div>
            ),
            filterMethod: (filter, row) => {
              if (filter.value === "all") {
                return true;
              }
              return row[filter.id] === parseInt(filter.value);
            },
            Filter: (
              { filter, onChange } //2-running 1-slow 0-stopped
            ) => (
              <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
              >
                <option value="all">all</option>
                <option value="0">stopped</option>
                <option value="1">slow</option>
                <option value="2">running</option>
              </select>
            )
          },
          { accessor: "lastOneHour", Header: "Last one hour" },
          { accessor: "lastTwoHour", Header: "Last two hours" },
          {
            accessor: "workingHour",
            Header: "Working hour"
          },
          { accessor: "forToday", Header: "Present production" },
          {
            accessor: "yesterdayProduction",
            Header: "Yesterday"
          },
          { accessor: "montly", Header: "Montly" }
        ]
      }
    ]
  }
];

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      data: createMockData()
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div className="m-0 mx-sm-4 my-sm-4">
        <ReactTable
          data={data.mockDatas}
          noDataText="Error fetching data!"
          columns={columns}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          defaultSorted={[
            {
              id: "status",
              desc: false
            }
          ]}
          defaultPageSize={20}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: e =>
                console.log("Cell - onClick", {
                  state,
                  rowInfo,
                  column,
                  instance,
                  event: e
                })
            };
          }}
          onResizedChange={(newResized, event) => {
            console.log("resize", newResized, event);
          }}
          className="-striped -highlight"
          style={{
            //height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
            textAlign: "center",
            width: "auto",
            flex: "50 0 auto"
          }}
        />
      </div>
    );
  }
}

export default Table;

//TODO
//Sub-component
