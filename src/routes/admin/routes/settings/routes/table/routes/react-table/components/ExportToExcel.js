import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

class ExportToExcel extends React.Component {
  render() {
    const { data, id, className, filename, buttonText } = this.props;
    return (
      <div>
        <ReactHTMLTableToExcel
          id={id}
          className={className}
          filename={filename}
          buttonText={buttonText}
          table="table-to-xls"
          sheet="tablexls"
        />
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              {Object.keys(data[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(item => {
              return (
                <tr key={item.id}>
                  {Object.keys(item).map(key => (
                    <th key={`${item.id}-${key}`}>{item[key]}</th>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExportToExcel;
