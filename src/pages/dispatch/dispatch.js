import React, { useState, useEffect } from 'react';
import { instance as Axios } from '../../utils/axios';
import { driversDataMapper, vehiclesDataMapper } from '../../utils/mappers';
import { dispatchesTableConfig } from '../../utils/dataTableConfig';
import { Table } from '../../components/Tables';
import Header from '../../components/Header/Header';
import SphereLoader from '../../components/loaders/sphereLoader';

const Dispatch = () => {

  const [loading, setLoading] = useState(true);
  const [allDrivers, setAllDrivers] = useState(); // from BE
  const [allVehicles, setAllVehicles] = useState(); // from BE
  const [dispatchesData, setDispatchesData] = useState(); // mapped data
  const [vehiclesData, setVehiclesData] = useState(); // mapped data
  const [driversData, setDriversData] = useState(); // mapped data

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

  const tableObject = [...dispatchesTableConfig, actionColumn];
  // const createNewTrip = async (e) => {
  //   e.preventDefault();
  //   const response = await createTrip(payload);
  //   if (response.status === "SUCCESS") {
  //     alert(response.message);
  //     window.location.reload();
  //   } else {
  //     alert(`operation failed: ${response.message}`);
  //   };
  //   console.log(payload);
  // }


  useEffect(() => {
    Axios.get('/dispatch')
      .then(({ data: responseData }) => {
        if (responseData.status === "SUCCESS") {
          setDispatchesData(responseData.data);
        } else setLoading(true);
      })
      .catch(error => console.log(error));

    Axios.get(`/driver`)
      .then(({ data: responseData }) => {
        setAllDrivers(responseData.data);
        setDriversData(driversDataMapper(responseData.data));
      })
      .catch(err => console.error(err));

    Axios.get(`/vehicle`)
      .then(({ data: responseData }) => {
        setAllVehicles(responseData.data);
        setVehiclesData(vehiclesDataMapper(responseData.data));
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Header />
      <h1 className='text-5xl text-center mt-2 font-bold'>Dispatch</h1>
      {loading ? <SphereLoader /> :
        <div className='transition-all duration-300 ease-in-out'>
          <div className='mx-auto w-5/6 mt-5'>
            <Table columnsHeaders={tableObject} data={dispatchesData} />
          </div>
        </div>
      }
    </div>
  )
}

export default Dispatch;