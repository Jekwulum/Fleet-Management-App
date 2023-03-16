import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Select from 'react-select';
import { Table } from '../../components/Tables';
import Header from '../../components/Header/Header';
import SphereLoader from '../../components/loaders/sphereLoader';
import { instance as Axios } from '../../utils/axios';
import { maintenanceTableConfig } from '../../utils/dataTableConfig';
import { vehiclesDataMapper } from '../../utils/mappers';

const Maintenance = () => {

  const [loading, setLoading] = useState(true);
  const [maintenanceData, setMaintenanceData] = useState();
  const [allVehicles, setAllVehicles] = useState(); // from BE
  const [vehiclesData, setVehiclesData] = useState(); // mapped data

  const actionColumn = {
    Header: 'Action', accessor: 'action',
    Cell: ({ row }) => (
      <div className="flex">
        <span className="text-left pointer m-auto">
          <i
            className="zmdi zmdi-edit hover:cursor-pointer"
            // onClick={() => editTripInfo(row.original)}
            style={{ fontSize: "22px", color: "#ffcd4f" }}>
          </i>
        </span>
        <span className="text-left pointer m-auto">
          <i
            className="zmdi zmdi-delete hover:cursor-pointer"
            // onClick={e => { deleteTripInfo(row.original); }}
            style={{ fontSize: "22px", color: "#FC0303" }}>
          </i>
        </span>
      </div>
    )
  };

  const vehicleColumn = {
    Header: 'Vehicle', accessor: 'vehicle',
    Cell: ({ row }) => {
      const vehicleObj = allVehicles.find(obj => obj.vehicle_id === row.original.vehicle_id);
      return <p>{`${vehicleObj.model} ${vehicleObj.license_plate}`}</p>
    }
  };

  const tableObject = [...maintenanceTableConfig, vehicleColumn, actionColumn];

  useEffect(() => {
    Axios.get('/maintenance')
      .then(({ data: responseData }) => {
        if (responseData.status === "SUCCESS") {
          setMaintenanceData(responseData.data);
        } else setLoading(true);
      })
      .catch(error => console.log(error));

    Axios.get(`/vehicle`)
      .then(({ data: responseData }) => {
        if (responseData.status === "SUCCESS") {
          setAllVehicles(responseData.data);
          setVehiclesData(vehiclesDataMapper(responseData.data));
          setLoading(false);
        } else setLoading(true);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Header />
      <h1 className='text-5xl text-center mt-2 font-bold'>Trips</h1>
      {
        loading ? <SphereLoader /> :
          <div className='transition-all duration-300 ease-in-out'>


            <div className='mx-auto w-5/6 mt-5'>
              <Table columnsHeaders={tableObject} data={maintenanceData} />
            </div>
          </div>
      }
    </div>
  )
}

export default Maintenance;