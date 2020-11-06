import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { startCase } from "lodash";
import "./GenericTable.css";
// icons as react components
import Sort from "../icons/sort.svg";
import Asc from "../icons/sort-asc.svg";
import Desc from "../icons/sort-desc.svg";

const SORT_LABEL = "Sort";
const SORT_TYPES = {
  ASC: "Ascendant",
  DESC: "Descendant",
};
const SORT_ICONS = {
  [SORT_TYPES.ASC]: Asc,
  [SORT_TYPES.DESC]: Desc,
};

export default function GenericTable({
  cols,
  data,
  sortable,
  resizable,
  count,
}) {
  // local state to handle sort options
  const [sortOptions, setSortOptions] = useState({
    col: null,
    type: SORT_TYPES.ASC,
  });

  // on data or sort options change, recalculate sorted data
  const sortedData = useMemo(() => {
    const sorted = (data.length && [...data]) || [];
    if (sortOptions.col !== null) {
      sorted.sort((a, b) => {
        if (a[sortOptions.col] < b[sortOptions.col]) {
          return sortOptions.type === SORT_TYPES.ASC ? -1 : 1;
        }
        if (a[sortOptions.col] > b[sortOptions.col]) {
          return sortOptions.type === SORT_TYPES.ASC ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [data, sortOptions]);

  // on sort click, update sort options to trigger sorting
  const sortCol = (col) => {
    // start with ascendant
    let type = SORT_TYPES.ASC;
    if (sortOptions.col === col) {
      if (sortOptions.type === SORT_TYPES.ASC) {
        // if column already sorted ascendant, switch de descendant
        type = SORT_TYPES.DESC;
      } else {
        // if column already sorted descendant, reset by cleaning sorted column
        col = null;
      }
    }
    setSortOptions({ col, type });
  };

  // if column names not passed, use property names from first data item
  const columns = cols || (!!data.length && Object.keys(data[0])) || [];

  return (
    <table className="generic-table">
      <thead>
        <tr>
          {count && <th>#</th>}
          {columns.map((col, index) => (
            <th key={index} className={resizable && "resizable"}>
              {startCase(col)}
              {sortable && (
                <button
                  type="button"
                  title={
                    sortOptions.col === col ? sortOptions.type : SORT_LABEL
                  }
                >
                  <img
                    src={
                      sortOptions.col === col
                        ? SORT_ICONS[sortOptions.type]
                        : Sort
                    }
                    style={{ height: 16, width: 16 }}
                    onClick={() => sortCol(col)}
                  />
                </button>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {count && <td>{index + 1}</td>}
            {columns.map((col, key) => (
              <td key={key} className={resizable && "resizable"}>
                {item[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

GenericTable.propTypes = {
  cols: PropTypes.array,
  data: PropTypes.array.isRequired,
  sortable: PropTypes.bool,
  resizable: PropTypes.bool,
  count: PropTypes.bool,
};
