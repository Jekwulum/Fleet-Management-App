import React, { useMemo } from "react";
import { useTable } from "react-table";

export const Table = ({ columnsHeaders, data }) => {
  const tableObject = [...columnsHeaders];
  const columns = useMemo(() => tableObject, []);
  const tableData = useMemo(() => data, []);

  const tableInstance = useTable({
    columns,
    data: tableData
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow } = tableInstance;
};