import React, { useState, useEffect } from 'react';
import { instance as Axios } from '../../utils/axios';
import { tripsTableConfig } from '../../utils/dataTableConfig';
import { Table } from '../../components/Tables';
import Header from '../../components/Header/Header';
import SphereLoader from '../../components/loaders/sphereLoader';

const Trips = () => {
  const [tripsData, setTripsData] = useState();
  const [loading, setLoading] = useState(true);

  const actionColumn = {
    Header: 'Action', accessor: 'action',
    Cell: ({ row }) => (
      <div className="flex">
        <span className="text-left pointer m-auto">
          <i
            className="zmdi zmdi-edit hover:cursor-pointer"
            // onClick={() => editVehicleInfo(row.original)}
            style={{ fontSize: "22px", color: "#ffcd4f" }}>
          </i>
        </span>
        <span className="text-left pointer m-auto">
          <i
            className="zmdi zmdi-delete hover:cursor-pointer"
            // onClick={e => { deleteVehicleInfo(row.original); }}
            style={{ fontSize: "22px", color: "#FC0303" }}>
          </i>
        </span>
      </div>
    )
  };

  const tableObject = [...tripsTableConfig, actionColumn];

  useEffect(() => {
    Axios.get('/trip')
      .then(({ data: responseData }) => {
        if (responseData.status === "SUCCESS") {
          setTripsData(responseData.data);
          setLoading(false);
        } else setLoading(true);
      })
      .catch(error => console.log(error))
  }, []);

  return (
    <div>
      <Header />
      <h1 className='text-5xl text-center mt-2 font-bold'>Trips</h1>
      {loading ? <SphereLoader /> :
        <div className='transition-all duration-300 ease-in-out'>
          <div className='mx-auto w-5/6 mt-5'>
            <Table columnsHeaders={tableObject} data={tripsData} />
          </div>
        </div>
      }
    </div>
  )
}

export default Trips;