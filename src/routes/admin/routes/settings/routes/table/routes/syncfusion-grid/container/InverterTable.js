import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import moment from "moment";
import { intlShape, injectIntl } from "react-intl";

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
import { convertToShortDiffByMinute } from "utils/dateParser";

import { SampleBase } from "./SampleBase";
import DEMO from "constants/demoData";

import INVERTER_STATS_QUERY from "../gql/getInverterStats.gql";

import "../style.scss";

const InvertersSummeryQuery = ({ children }) => (
  <Query query={INVERTER_STATS_QUERY} pollInterval={1000 * 60 * 5}>
    {({ loading, error, data }) => {
      // console.log("GET_INVERTERS_SUMMERY: ", data.AllProductionSummary[0]);
      // console.log("time: ", moment());

      const updatedTime = moment().format("D/M/YYYY HH:mm:ss");

      // if (loading) return <div style={{ paddingTop: 20 }}>yükleniyor...</div>;
      if (loading) return <Loading pastDelay={200} />;
      if (error) return <p>Error : {error} </p>;

      return children(data.getStatisticDataByInverter, updatedTime);
    }}
  </Query>
);

const OrderProduction = {
  Inverter: 0,
  Company: 1,
  Location: 2
};

class InverterTable extends SampleBase {
  constructor(props) {
    super(props);
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
          label: props.formatMessage({
            id: "syncFusionGrid.productionTable.toolbar.bindingByInverter"
          }),
          name: "bindingBy",
          checked: true,
          change: () => this.setColumns(OrderProduction.Inverter)
        })
      },
      {
        type: "Input",
        id: "bindingByCompany",
        template: new RadioButton({
          label: props.formatMessage({
            id: "syncFusionGrid.productionTable.toolbar.bindingByCompany"
          }),
          name: "bindingBy",
          change: () => this.setColumns(OrderProduction.Company)
        })
      },
      {
        type: "Input",
        id: "bindingByLocation",
        template: new RadioButton({
          label: props.formatMessage({
            id: "syncFusionGrid.productionTable.toolbar.bindingByLocation"
          }),
          name: "bindingBy",
          change: () => this.setColumns(OrderProduction.Location)
        })
      }
    ];
    this.filterSettings = { type: "Menu" };
    this.selectionsettings = { type: "Single" };
    this.pageOptions = {
      pageSize: 20,
      pageCount: 5,
      pageSizes: [
        "5",
        "10",
        "20",
        "50",
        "100",
        props.formatMessage({
          id: "syncFusionGrid.productionTable.pager.All"
        })
      ]
      // pageSizes: true
    };
    this.check = {
      type: "CheckBox"
    };
    this.status = {
      type: "CheckBox",
      itemTemplate: this.statusTemplate
    };
  }

  componentWillMount() {
    this.setColumns(0);
  }

  onComplete = args => {
    if (args.requestType === "filterchoicerequest") {
      if (args.filterModel.options.field === "InverterStatus") {
        args.filterModel.dialogObj.element
          .querySelectorAll(".e-searchbox")[0]
          .classList.add("e-hide");
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
        InverterID,
        InverterNumber,
        LocationID,
        LocationName,
        CompanyID,
        CompanyName,
        InverterStatus,
        PowerStrings,
        ...args
      } = curr;

      let newItem = Object.assign(
        {},
        args,
        order === 1 && { LocationID, LocationName, CompanyID, CompanyName },
        order === 2 && { LocationID, LocationName }
      );

      const key = order === 1 ? LocationName + "-" + CompanyName : LocationName;

      const item =
        acc.get(key) ||
        Object.assign({}, newItem, {
          EnergyLast1Hour: 0,
          EnergyLast2Hour: 0,
          EnergyToday: 0,
          EnergyYesterday: 0,
          EnergyLastWeek: 0,
          MonthlyEnergy: 0
        });

      item.EnergyLast1Hour += parseInt(curr.EnergyLast1Hour);
      item.EnergyLast2Hour += parseInt(curr.EnergyLast2Hour);
      item.EnergyToday += parseInt(curr.EnergyToday);
      item.EnergyYesterday += parseInt(curr.EnergyYesterday);
      item.EnergyLastWeek += parseInt(curr.EnergyLastWeek);
      item.MonthlyEnergy += parseInt(curr.MonthlyEnergy);

      return acc.set(key, item);
    }, new Map());

    const reduceData = [...mappedData.values()];

    return reduceData;
    // debugger;
  };

  toolbarClick = args => {
    if (args.item.text === "Excel Export") {
      debugger;

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
    debugger;

    if (args.column.field === "PowerStrings") {
      args.value = `${args.value.workedStrings}/${args.value.stringsCount}`;
    }
  };

  // statusDetails = props => {
  //   console.log("statusDetails", props);
  //   const invStatusId = [0, 1, 2, 3];
  //   if (
  //     typeof invStatusId.find(x => x === parseInt(props.InverterStatus)) ===
  //     "undefined"
  //   ) {
  //     debugger;
  //     return <span>{props.InverterStatus}</span>;
  //   }
  //   return this.statusTemplate(props);
  // };

  // statusDetails = props => {
  //   console.log("props.InverterStatus", props.InverterStatus);
  //   if (props.InverterStatus === "Select All") {
  //     debugger;
  //     return <span />;
  //   }
  //   return this.statusTemplate(props);
  // };

  invStatusId = [0, 1, 2, 3];

  statusTemplate = props => {
    const { formatMessage } = this.props;
    let loc = { width: "31px", height: "24px" };

    let status = "";
    switch (props.InverterStatus) {
      case 0:
        status = "../assets/grid/noready.png";
        break;
      case 1:
        status = "../assets/grid/running.png";
        break;
      case 2:
        status = "../assets/grid/noconnection.png";
        break;
      case 3:
        status = "../assets/grid/fault.png";
        break;
      default:
        status = "";
        break;
    }

    const text =
      typeof this.invStatusId.find(
        x => x === parseInt(props.InverterStatus)
      ) !== "undefined"
        ? formatMessage({
            id: `syncFusionGrid.productionTable.columns.InverterStatusType.${
              props.InverterStatus
            }`
          })
        : "";

    return (
      <div>
        <img style={loc} src={status} alt={text} />
        <span id="statusText">{text}</span>
      </div>
    );
  };

  LinkTemplate = text => {
    return (
      <a href={DEMO.link} className="link-animated-hover link-hover-v3">
        {text}
      </a>
    );
  };

  CompanyTemplate = props => this.LinkTemplate(props.CompanyName);
  InvertorTemplate = props => this.LinkTemplate(props.InverterNumber);

  LocationTemplate = props => {
    return (
      <div className="Mapimage">
        <img src="../assets/grid/Map.png" alt="" className="e-image" />
        <span> </span>
        {this.LinkTemplate(props.LocationName)}
      </div>
    );
  };

  ProgressTemplate = props => {
    const percent = (props.WorkedStrings / props.StringsCount) * 100;
    return (
      <div className="e-grid-progress-bar">
        <span className="e-grid-progress-bar__label">
          {props.WorkedStrings}/{props.StringsCount}
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

  SortComparer = (reference, comparer) => {
    const referencePercent =
      reference.filter(c => c.Value !== null && c.Value > 0).length /
      reference.length;
    const comparerPercent =
      comparer.filter(c => c.Value !== null && c.Value > 0).length /
      comparer.length;
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
        key={props.InverterID}
        className="e-grid-detailtable"
        style={{ width: "100%" }}
      >
        <tbody>
          <tr>
            {props.PowerStrings.map((item, index) => {
              return (
                index % 2 === 0 && (
                  <Fragment key={`${item.Id}e${index}`}>
                    <th
                      key={`${item.Id}a${index}`}
                      className="e-grid-detailtable__title"
                    >
                      {item.Name}
                    </th>
                    <td
                      key={`${item.Id}b${index}`}
                      className="e-grid-detailtable__value"
                    >
                      {item.Value}
                    </td>
                  </Fragment>
                )
              );
            })}
          </tr>
          <tr>
            {props.PowerStrings.map((item, index) => {
              return (
                index % 2 === 1 && (
                  <Fragment key={`${item.Id}f${index}`}>
                    <th
                      key={`${item.Id}c${index}`}
                      className="e-grid-detailtable__title"
                    >
                      {item.Name}
                    </th>
                    <td
                      key={`${item.Id}d${index}`}
                      className="e-grid-detailtable__value"
                    >
                      {item.Value}
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

  DateDiffByMinuteTemplate = props => {
    const { formatMessage } = this.props;
    const date = convertToShortDiffByMinute(props.DailyRuntime);
    const result = (date.day > 0
      ? `${date.day}${formatMessage({ id: "fields.date.day.short" })} `
      : ""
    )
      .concat(
        date.hour > 0
          ? `${date.hour}${formatMessage({ id: "fields.date.hour.short" })} `
          : ""
      )
      .concat(
        date.minute > 0
          ? `${date.minute}${formatMessage({ id: "fields.date.minute.short" })}`
          : ""
      );

    return <span>{result}</span>;
  };

  setColumns = order => {
    const { formatMessage } = this.props;
    const cols = [
      {
        col: 0,
        columns: [
          {
            field: "LocationName",
            headerText: formatMessage({
              id: "syncFusionGrid.productionTable.columns.LocationName"
            }),
            template: this.LocationTemplate,
            width: "160",
            textAlign: "left",
            filter: this.check
          }
        ],
        headerText: formatMessage({
          id: "syncFusionGrid.productionTable.columns.InverterBlock"
        }),
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
            field: "EnergyLast1Hour",
            headerText: formatMessage({
              id: "syncFusionGrid.productionTable.columns.EnergyLast1Hour"
            }),
            width: "130",
            textAlign: "center",
            visible: false
          },
          {
            field: "EnergyLast2Hour",
            headerText: formatMessage({
              id: "syncFusionGrid.productionTable.columns.EnergyLast2Hour"
            }),
            width: "130",
            textAlign: "center",
            visible: false
          },
          {
            field: "DailyRuntime",
            headerText: formatMessage({
              id: "syncFusionGrid.productionTable.columns.DailyRuntime"
            }),
            width: "160",
            textAlign: "center",
            template: this.DateDiffByMinuteTemplate
          },
          {
            field: "EnergyToday",
            headerText: formatMessage({
              id: "syncFusionGrid.productionTable.columns.EnergyToday"
            }),
            width: "110",
            textAlign: "center"
          },
          {
            field: "EnergyYesterday",
            headerText: formatMessage({
              id: "syncFusionGrid.productionTable.columns.EnergyYesterday"
            }),
            width: "110",
            textAlign: "center"
          },
          {
            field: "EnergyLastWeek",
            headerText: formatMessage({
              id: "syncFusionGrid.productionTable.columns.EnergyLastWeek"
            }),
            width: "110",
            textAlign: "center"
          },
          {
            field: "MonthlyEnergy",
            headerText: formatMessage({
              id: "syncFusionGrid.productionTable.columns.MonthlyEnergy"
            }),
            width: "100",
            textAlign: "center"
          }
        ],
        headerText: `${formatMessage({
          id: "syncFusionGrid.productionTable.columns.ProductionBlock"
        })} (kWh)`,
        textAlign: "center"
      }
    ];

    if (order < 2) {
      cols.forEach(item => {
        if (item.col === 0)
          item.columns.push({
            field: "CompanyName",
            headerText: formatMessage({
              id: "syncFusionGrid.productionTable.columns.CompanyName"
            }),
            template: this.CompanyTemplate,
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
            field: "InverterNumber",
            headerText: formatMessage({
              id: "syncFusionGrid.productionTable.columns.InverterNumber"
            }),
            template: this.InvertorTemplate,
            width: "90",
            textAlign: "center",
            filter: this.check
          });

        if (item.col === 1) {
          Object.assign(item, {
            columns: [
              {
                field: "ReadDate",
                headerText: formatMessage({
                  id: "syncFusionGrid.productionTable.columns.ReadDate"
                }),
                width: "130",
                textAlign: "center",
                type: "datetime",
                format: {
                  type: "datetime",
                  format: "dd/MM/yyyy HH:mm"
                },
                allowFiltering: false
              },
              {
                field: "InverterStatus",
                headerText: formatMessage({
                  id: "syncFusionGrid.productionTable.columns.InverterStatus"
                }),
                width: "140",
                textAlign: "left",
                filter: this.status,
                template: this.statusTemplate
              },
              {
                field: "PowerStrings",
                headerText: formatMessage({
                  id: "syncFusionGrid.productionTable.columns.PowerStrings"
                }),
                width: "120",
                textAlign: "left",
                allowFiltering: false,
                template: this.ProgressTemplate,
                sortComparer: this.SortComparer
              }
            ],
            headerText: formatMessage({
              id: "syncFusionGrid.productionTable.columns.PerformanceBlock"
            }),
            textAlign: "center"
          });
        }
      });
    }
    //Clear sorting
    typeof this.gridInstance !== "undefined" &&
      this.gridInstance.clearSorting();

    this.setState({ columns: [...cols], order: order });
  };

  // created = args => {
  //   debugger;
  //   const columnchooser = document.querySelectorAll("[id^=columnchooser]")[0];
  // };

  render() {
    const { lang, formatMessage } = this.props;
    return (
      <div className="control-pane">
        <div className="control-section">
          <GridComponent
            // dataSource={this.bindData}
            dataSource={this.dataStateChange(this.props.data, this.state.order)}
            ref={grid => (this.gridInstance = grid)}
            // locale={lang === "tr" ? "tr-TR" : lang === "de" ? "de-DE" : "en-US"}
            locale={lang}
            // created={this.created}
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
                if (item.columns.length === 0) {
                  return false;
                }
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
              {formatMessage({
                id: "syncFusionGrid.productionTable.footer.loadTime"
              })}
              : {this.props.updatedTime}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const Container = props => {
  return (
    <InvertersSummeryQuery>
      {(inverterStats, updatedTime) => (
        <InverterTable
          data={inverterStats}
          updatedTime={updatedTime}
          lang={props.lang}
          formatMessage={props.intl.formatMessage}
        />
      )}
    </InvertersSummeryQuery>
  );
};

Container.propTypes = {
  intl: intlShape.isRequired
};

const mapStateToProps = state => {
  return {
    lang: state.locale.lang
  };
};

export default injectIntl(
  connect(
    mapStateToProps,
    null
  )(Container)
);
