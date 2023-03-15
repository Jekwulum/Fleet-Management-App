import { driverStatusMap } from "./mappers";

export const driverTableConfig = [
  { Header: 'First Name', accessor: 'first_name' },
  { Header: 'Last Name', accessor: 'last_name' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Phone', accessor: 'phone' },
  {
    Header: "Status",
    accessor: "is_active",
    Cell: ({ row }) => {
      return <span className="flex cursor-pointer items-center gap-2">
        <span className={`${driverStatusMap[row.original.is_active].fill} w-2 h-2 rounded-sm`} />
        {driverStatusMap[row.original.is_active].label}
      </span>
    }
  }
];