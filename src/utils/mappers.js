export const driverStatusMap = {
  "true": {
    id: 1,
    label: "Active",
    fill: "bg-green-500",
  },
  "false": {
    id: 2,
    label: "Inactive",
    fill: "bg-red-500",
  },
};

export const vehicleStatusMap = {
  "true": {
    id: 1,
    label: "Commissioned",
    fill: "bg-green-500",
  },
  "false": {
    id: 2,
    label: "De-Commissioned",
    fill: "bg-red-500",
  },
};


export const driversDataMapper = (data) => {
  let mappedData = [];
  for (let obj of data) {
    let { driver_id, first_name, last_name } = obj;
    mappedData.push({ value: `${driver_id}`, label: `${first_name} ${last_name}` })
  }
  return mappedData;
};

export const vehiclesDataMapper = (data) => {
  let mappedData = [];
  for (let obj of data) {
    let {vehicle_id, model, license_plate} = obj;
    mappedData.push({value: `${vehicle_id}`, label: `${model} - ${license_plate}`})
  }
  return mappedData;
};