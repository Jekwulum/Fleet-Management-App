import React, { useMemo } from "react";
import { useTable } from "react-table";
import './Table.css';

export const Table = ({ columnsHeaders, data }) => {
  const tableObject = [...columnsHeaders];
  const columns = useMemo(() => tableObject, []);
  const tableData = useMemo(() => data, []);

  const tableInstance = useTable({ columns, data: tableData, striped: true });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow } = tableInstance;

  return (
    <div className="rounded-lg border shadow-2xl drop-shadow-lg">
      <table {...getTableProps()} className="mx-auto w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="p-[8px] py-[10px] text-left bg-custom-bgColor text-white">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className={index % 2 === 0 ? 'bg-white' : 'bg-custom-bgColor/[.4] text-white'}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()} className="p-[6px]">
                    {cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};