import React, { useState, useEffect } from 'react';
import { instance as Axios } from '../../utils/axios';
import { vehicleTableConfig } from '../../utils/dataTableConfig';
import { Table } from '../../components/Tables';
import Header from '../../components/Header/Header';
import SphereLoader from '../../components/loaders/sphereLoader';

const Vehicle = () => {
  const [vehcilesData, setVehiclesData] = useState();
  const [loading, setLoading] = useState(true);

  const actionColumn = {
    Header: 'Action', accessor: 'action',
    Cell: ({ row }) => (
      <div className="flex">
        <span className="text-left pointer m-auto">
          <i
            className="zmdi zmdi-edit hover:cursor-pointer"
            // onClick={() => editDriverinfo(row.original)}
            style={{ fontSize: "22px", color: "#ffcd4f" }}>
          </i>
        </span>
        <span className="text-left pointer m-auto">
          <i
            className="zmdi zmdi-delete hover:cursor-pointer"
            // onClick={e => { deleteDriverInfo(row.original.driver_id); }}
            style={{ fontSize: "22px", color: "#FC0303" }}>
          </i>
        </span>
      </div>
    )
  };

  const tableObject = [...vehicleTableConfig, actionColumn];

  useEffect(() => {
    Axios.get('/vehicle')
      .then(({ data: responseData }) => {
        if (responseData.status === "SUCCESS") {
          setVehiclesData(responseData.data);
          setLoading(false);
        } else setLoading(true);
      })
      .catch(error => console.log(error))
  }, []);

  return (
    <div>
      <Header />
      <h1 className='text-5xl text-center mt-2 font-bold'>Vehicles</h1>
      {loading ? <SphereLoader /> :
        <div className='transition-all duration-300 ease-in-out'>
          <div className='mx-auto h-14 w-5/6 mt-4 flex justify-between items-center'>
            <div>
              {/* <button onClick={e => toggleAddDriverRender()}
                className='flex gap-1 p-1 items-center text-center bg-custom-bgColor w-24 h-9 text-sm rounded-full text-gray-100 mr-4 hover:bg-gray-500 font-bold transition-all duration-300'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p>Add new</p>
              </button> */}
            </div>
          </div>
          <div className='mx-auto w-5/6 mt-5'>
            <Table columnsHeaders={tableObject} data={vehcilesData} />
          </div>
        </div>
      }
    </div>
  )
}

export default Vehicle;