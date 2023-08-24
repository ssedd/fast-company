import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    // console.log("item", item);
    // console.log("=======================================");
    // console.log("column", columns[column]);

    // const dataItem = data.map((item) => console.log(item));
    // console.log(dataItem);

    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        // console.log("component(item)", typeof component === "function");
        // console.log("component(item)", component(item));
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>{renderContent(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableBody;
