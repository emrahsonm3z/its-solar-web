import React, { Fragment } from "react";
import { closest, isNullOrUndefined } from "@syncfusion/ej2-base";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Filter,
  Inject,
  Toolbar,
  Resize,
  Page,
  Sort,
  Selection,
  ExcelExport,
  ColumnChooser,
  DetailRow
} from "@syncfusion/ej2-react-grids";
import classnames from "classnames";

import createMockData from "./mock";
import { SampleBase } from "./container/SampleBase";
import DEMO from "constants/demoData";

import "./style.scss";

export default class Default extends SampleBase<{}, {}> {
  constructor() {
    super(...arguments);
    this.state = {
      data: createMockData()
    };
    this.sortingOptions = {
      // columns: [
      //   { field: "lastTwoHour", direction: "Ascending" },
      //   { field: "workingHour", direction: "Ascending" }
      // ]
    };
    this.toolbarOptions = ["ColumnChooser", "ExcelExport", "Print"];
    this.filterSettings = { type: "Menu" };
    this.selectionsettings = { type: "Single" };
    this.pageOptions = {
      pageSize: 20,
      pageCount: 5,
      pageSizes: ["5", "10", "20", "50", "All"]
    };
    this.check = {
      type: "CheckBox"
    };
    this.status = {
      type: "CheckBox",
      itemTemplate: this.statusDetails
    };
  }

  onComplete = args => {
    if (args.requestType === "filterchoicerequest") {
      if (args.filterModel.options.field === "status") {
        var span = args.filterModel.dialogObj.element.querySelectorAll(
          ".e-selectall"
        )[0];
        if (!isNullOrUndefined(span)) {
          closest(span, ".e-ftrchk").classList.add("e-hide");
        }
      }
    }
  };

  toolbarClick = args => {
    switch (args.item.text) {
      case "Excel Export":
        this.gridInstance.excelExport();
        break;
      default:
        break;
    }
  };

  statusDetails = props => {
    if (props.status === "Select All") {
      return <span />;
    }
    return this.statusTemplate(props);
  };

  statusTemplate = props => {
    let loc = { width: "31px", height: "24px" };
    const status =
      props.status === 0
        ? "../assets/grid/InSufficient.png"
        : props.status === 1
          ? "../assets/grid/Sufficient.png"
          : "../assets/grid/Perfect.png";

    const text =
      props.status === 0
        ? "InSufficient"
        : props.status === 1
          ? "Sufficient"
          : "Perfect";
    return (
      <div>
        <img style={loc} src={status} alt={text} />
        <span id="statusText">{text}</span>
      </div>
    );
  };

  linkTemplate = text => {
    return (
      <a href={DEMO.link} className="link-animated-hover link-hover-v3">
        {text}
      </a>
    );
  };

  centralTemplate = props => this.linkTemplate(props.centralNo);
  invervorTemplate = props => this.linkTemplate(props.inverterNo);

  locationTemplate = props => {
    return (
      <div className="Mapimage">
        <img src="../assets/grid/Map.png" alt="" className="e-image" />
        <span> </span>
        {this.linkTemplate(props.location)}
      </div>
    );
  };

  progressTemplate = props => {
    const percent =
      (props.progress.workedStrings / props.progress.stringsCount) * 100;
    return (
      <div className="e-grid-progress-bar">
        <span className="e-grid-progress-bar__label">
          {props.progress.workedStrings}/{props.progress.stringsCount}
        </span>
        <div
          className={classnames("e-grid-progress-bar__item", {
            "e-grid-progress-bar__item--success": percent > 80,
            "e-grid-progress-bar__item--warning":
              percent >= 60 && percent <= 80,
            "e-grid-progress-bar__item--danger": percent < 60
          })}
          style={{ width: `${percent}%` }}
        />
      </div>
    );
  };
  sortComparer = (reference, comparer) => {
    const referencePercent = reference.workedStrings / reference.stringsCount;
    const comparerPercent = comparer.workedStrings / comparer.stringsCount;
    if (referencePercent < comparerPercent) {
      return -1;
    }
    if (referencePercent > comparerPercent) {
      return 1;
    }
    return 0;
  };

  gridTemplate = props => {
    return (
      <table
        key={props.id}
        className="e-grid-detailtable"
        style={{ width: "100%" }}
      >
        <tbody>
          <tr>
            {props.progress.strings.map((item, index) => {
              return (
                index % 2 === 0 && (
                  <Fragment key={`${item.id}e${index}`}>
                    <th
                      key={`${item.id}a${index}`}
                      className="e-grid-detailtable__title"
                    >
                      {item.name}
                    </th>
                    <td
                      key={`${item.id}b${index}`}
                      className="e-grid-detailtable__value"
                    >
                      {item.value}
                    </td>
                  </Fragment>
                )
              );
            })}
          </tr>
          <tr>
            {props.progress.strings.map((item, index) => {
              return (
                index % 2 === 1 && (
                  <Fragment key={`${item.id}f${index}`}>
                    <th
                      key={`${item.id}c${index}`}
                      className="e-grid-detailtable__title"
                    >
                      {item.name}
                    </th>
                    <td
                      key={`${item.id}d${index}`}
                      className="e-grid-detailtable__value"
                    >
                      {item.value}
                    </td>
                  </Fragment>
                )
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  };

  onLoad = args => {
    // document
    //   .getElementById("overviewgrid")
    //   .ej2_instances[0].on("data-ready", () => {
    //     this.dReady = true;
    //     this.stTime = performance.now();
    //   });
    // document
    //   .getElementById("overviewgrid")
    //   .addEventListener("DOMSubtreeModified", () => {
    //     if (this.dReady && this.stTime && this.isDataChanged) {
    //       let msgEle = document.getElementById("msg");
    //       let val = (performance.now() - this.stTime).toFixed(0);
    //       this.stTime = null;
    //       this.dReady = false;
    //       this.dtTime = false;
    //       this.isDataChanged = false;
    //       msgEle.innerHTML = "Load Time: " + "<b>" + val + "</b>" + "<b>ms</b>";
    //       msgEle.classList.remove("e-hide");
    //     }
    //   });
  };

  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <GridComponent
            dataSource={this.state.data.mockDatas}
            ref={grid => (this.gridInstance = grid)}
            detailTemplate={this.gridTemplate}
            toolbar={this.toolbarOptions}
            toolbarClick={this.toolbarClick}
            allowPaging={true}
            pageSettings={this.pageOptions}
            showColumnChooser={true}
            allowResizing={true}
            allowSorting={true}
            sortSettings={this.sortingOptions}
            allowFiltering={true}
            filterSettings={this.filterSettings}
            selectionSettings={this.selectionsettings}
            allowExcelExport={true}
            actionComplete={this.onComplete}
            load={this.onLoad}
            height="500"
          >
            <ColumnsDirective>
              <ColumnDirective
                columns={[
                  {
                    field: "location",
                    headerText: "Location",
                    template: this.locationTemplate,
                    width: "130",
                    textAlign: "left",
                    filter: this.check
                  },
                  {
                    field: "centralNo",
                    headerText: "Central",
                    template: this.centralTemplate,
                    width: "90",
                    textAlign: "center"
                  },
                  {
                    field: "inverterNo",
                    headerText: "Inverter",
                    template: this.invervorTemplate,
                    width: "90",
                    textAlign: "center"
                  }
                ]}
                headerText="Inverter"
                textAlign="center"
              />
              <ColumnDirective
                columns={[
                  {
                    field: "status",
                    headerText: "Status",
                    width: "130",
                    textAlign: "left",
                    filter: this.status,
                    template: this.statusTemplate
                  },
                  {
                    field: "progress",
                    headerText: "Progress",
                    width: "200",
                    textAlign: "left",
                    allowFiltering: false,
                    template: this.progressTemplate,
                    sortComparer: this.sortComparer
                  }
                ]}
                headerText="Performance"
                textAlign="center"
              />
              <ColumnDirective
                columns={[
                  {
                    field: "lastOneHour",
                    headerText: "Last one hour",
                    width: "130",
                    textAlign: "center"
                  },
                  {
                    field: "lastTwoHour",
                    headerText: "Last two hours",
                    width: "130",
                    textAlign: "center"
                  },
                  {
                    field: "workingHour",
                    headerText: "Working hour",
                    width: "130",
                    textAlign: "center"
                  },
                  {
                    field: "forToday",
                    headerText: "Up to now",
                    width: "110",
                    textAlign: "center"
                  },
                  {
                    field: "yesterdayProduction",
                    headerText: "Yesterday",
                    width: "110",
                    textAlign: "center"
                  },
                  {
                    field: "lastWeek",
                    headerText: "Last week",
                    width: "110",
                    textAlign: "center"
                  },
                  {
                    field: "montly",
                    headerText: "Montly",
                    width: "100",
                    textAlign: "center"
                  }
                ]}
                headerText={`Production (${this.state.data.unit})`}
                textAlign="center"
              />
            </ColumnsDirective>
            <Inject
              services={[
                Toolbar,
                ColumnChooser,
                Resize,
                Page,
                Sort,
                Filter,
                Selection,
                ExcelExport,
                DetailRow
              ]}
            />
          </GridComponent>
          <div
            className="e-dsalign"
            style={{ textAlign: "center", padding: "16px" }}
          >
            <span className="e-grid-msg">
              Load Time: {this.state.data.lastUpdated}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
