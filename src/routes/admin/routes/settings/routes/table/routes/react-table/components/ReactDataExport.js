import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Download = props => {
  const { data, sheet } = props;
  return (
    <div>
      <ExcelFile>
        <ExcelSheet data={data} name={sheet}>
          {data.map(item => {
            return Object.keys(item).map(key => (
              <ExcelColumn
                key={`${item.id}-${key}`}
                label={key}
                value={item[key]}
              />
            ));
          })}
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
};

export default Download;
