import React, { Fragment } from "react";
import { Query } from "react-apollo";
import moment from "moment";

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
import { RadioButton } from "@syncfusion/ej2-buttons";
import classnames from "classnames";

import Loading from "components/Loading";

import { SampleBase } from "./SampleBase";
import DEMO from "constants/demoData";

import GET_INVERTERS_SUMMERY from "../gql/getSummaries.gql";

import "../style.css";

const InvertersSummeryQuery = ({ children }) => (
  <Query query={GET_INVERTERS_SUMMERY} pollInterval={5000}>
    {({ loading, error, data }) => {
      // console.log("GET_INVERTERS_SUMMERY: ", data.AllProductionSummary[0]);
      // console.log("time: ", moment());

      const updatedTime = moment().format("D/M/YYYY HH:mm:ss");

      // if (loading) return <div style={{ paddingTop: 20 }}>yükleniyor...</div>;
      if (loading) return <Loading pastDelay={200} />;
      if (error) return <p>Error : {error} </p>;

      return children(data.AllProductionSummary, updatedTime);
    }}
  </Query>
);

const OrderProduction = {
  Inverter: 0,
  Central: 1,
  Location: 2
};

class InverterTable extends SampleBase<{}, {}> {
  constructor() {
    super(...arguments);
    this.state = {
      order: OrderProduction.Inverter,
      columns: []
    };

    this.sortingOptions = {
      // columns: [
      //   { field: "lastTwoHour", direction: "Ascending" },
      //   { field: "workingHour", direction: "Ascending" }
      // ]
    };
    this.templateRadiobutton = new RadioButton({
      label: "Radio",
      name: "default",
      checked: true
    });
    this.toolbarOptions = [
      "ColumnChooser",
      "ExcelExport",
      "Print",
      {
        type: "Input",
        id: "bindingByInverter",
        template: new RadioButton({
          label: "Invertera göre",
          name: "bindingBy",
          checked: true,
          change: () => {
            this.setState({ order: OrderProduction.Inverter });
            this.setColumns(this.state.order);
          }
        })
      },
      {
        type: "Input",
        id: "bindingByCentral",
        template: new RadioButton({
          label: "Santrale göre",
          name: "bindingBy",
          change: () => {
            this.setState({ order: OrderProduction.Central });
            this.setColumns(this.state.order);
          }
        })
      },
      {
        type: "Input",
        id: "bindingByLocation",
        template: new RadioButton({
          label: "Konuma göre",
          name: "bindingBy",
          change: () => {
            this.setState({ order: OrderProduction.Location });
            this.setColumns(this.state.order);
          }
        })
      }
    ];
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

  componentWillMount() {
    this.setColumns(0);
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

  dataStateChange = (data, order) => {
    if (order === 0) return data;

    const mappedData = data.reduce((acc, curr) => {
      const {
        location,
        centralNo,
        inverterNo,
        status,
        progress,
        ...args
      } = curr;

      let newItem = Object.assign(
        {},
        args,
        order === 1 && { location, centralNo },
        order === 2 && { location }
      );

      // if (order === 1) Object.assign(newItem, { centralNo });

      // debugger;
      const key = order === 1 ? location + "-" + centralNo : location;

      const item =
        acc.get(key) ||
        Object.assign({}, newItem, {
          lastOneHour: 0,
          lastTwoHour: 0,
          workingHour: 0,
          forToday: 0,
          yesterdayProduction: 0,
          montly: 0
        });

      item.lastOneHour += curr.lastOneHour;
      item.lastTwoHour += curr.lastTwoHour;
      item.workingHour = curr.workingHour;
      item.forToday += curr.forToday;
      item.yesterdayProduction += curr.yesterdayProduction;
      item.montly += curr.montly;

      return acc.set(key, item);
    }, new Map());

    const reduceData = [...mappedData.values()];

    return reduceData;
    // debugger;
  };

  toolbarClick = (args: ClickEventArgs) => {
    if (args.item.text === "Excel Export") {
      this.gridInstance.excelExport();
    }
  };

  // bindData = () => {
  //   this.gridInstance.dataSource = this.dataStateChange(
  //     this.props.data,
  //     this.state.order
  //   );
  // };

  excelQueryCellInfo = args => {
    if (args.column.field === "progress") {
      console.log(args);
      args.value = `${args.value.workedStrings}/${args.value.stringsCount}`;
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

  setColumns = order => {
    const cols = [
      {
        col: 0,
        columns: [
          {
            field: "location",
            headerText: "Location",
            template: this.locationTemplate,
            width: "130",
            textAlign: "left",
            filter: this.check
          }
        ],
        headerText: "Inverter",
        textAlign: "center"
      },
      {
        col: 1,
        columns: []
      },
      {
        col: 2,
        columns: [
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
            field: "montly",
            headerText: "Montly",
            width: "100",
            textAlign: "center"
          }
        ],
        headerText: `Production (kWh)`,
        textAlign: "center"
      }
    ];

    if (order < 2) {
      cols.forEach(item => {
        if (item.col === 0)
          item.columns.push({
            field: "centralNo",
            headerText: "Central",
            template: this.centralTemplate,
            width: "90",
            textAlign: "center",
            filter: this.check
          });
      });
    }
    if (order < 1) {
      cols.forEach(item => {
        if (item.col === 0)
          item.columns.push({
            field: "inverterNo",
            headerText: "Inverter",
            template: this.invervorTemplate,
            width: "90",
            textAlign: "center",
            filter: this.check
          });

        if (item.col === 1)
          Object.assign(item, {
            columns: [
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
            ],
            headerText: "Performance",
            textAlign: "center"
          });
      });
    }

    this.setState({ columns: [...cols] });
  };

  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <GridComponent
            // dataSource={this.bindData}
            dataSource={this.dataStateChange(this.props.data, this.state.order)}
            ref={grid => (this.gridInstance = grid)}
            detailTemplate={this.state.order === 0 && this.gridTemplate}
            toolbar={this.toolbarOptions}
            toolbarClick={this.toolbarClick}
            excelQueryCellInfo={this.excelQueryCellInfo}
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
            height="500"
          >
            <ColumnsDirective>
              {this.state.columns.map(item => {
                const { col, ...args } = item;
                return <ColumnDirective key={col} {...args} />;
              })}
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
              Load Time: {this.props.updatedTime}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default () => (
  <InvertersSummeryQuery>
    {(summaries, updatedTime) => (
      <InverterTable data={summaries} updatedTime={updatedTime} />
    )}
  </InvertersSummeryQuery>
);
