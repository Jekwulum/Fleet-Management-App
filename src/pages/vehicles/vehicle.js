import React, { useState, useEffect } from 'react';
import { instance as Axios } from '../../utils/axios';
import { vehicleTableConfig } from '../../utils/dataTableConfig';
import { Table } from '../../components/Tables';
import { createVehicle } from '../../utils/CRUD.services';
import Header from '../../components/Header/Header';
import SphereLoader from '../../components/loaders/sphereLoader';

const Vehicle = () => {
  const [vehcilesData, setVehiclesData] = useState();
  const [payload, setPayload] = useState({ model: "", fuel_capacity: "", license_plate: "", purchase_date: "" });
  const [loading, setLoading] = useState(true);
  const [addVehicleRender, setAddDriverRender] = useState(false);

  const isDisabledBtn = Object.values(payload).every(val => val === "");

  const toggleAddVehicleRender = () => setAddDriverRender(!addVehicleRender);

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

  const createVehicleProfile = async (e) => {
    e.preventDefault();
    const response = await createVehicle(payload);
    if (response.status === "SUCCESS") {
      alert(response.message);
      window.location.reload();
    } else {
      alert(`operation failed: ${response.message}`);
    };
  }

  return (
    <div>
      <Header />
      <h1 className='text-5xl text-center mt-2 font-bold'>Vehicles</h1>

      {loading ? <SphereLoader /> :
        <div className='transition-all duration-300 ease-in-out'>

          <div className='mx-auto h-14 w-5/6 mt-4 flex justify-between items-center'>
            <div>
              <button onClick={e => toggleAddVehicleRender()}
                className='flex gap-1 p-1 items-center text-center bg-custom-bgColor w-24 h-9 text-sm rounded-full text-gray-100 mr-4 hover:bg-gray-500 font-bold transition-all duration-300'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p>Add new</p>
              </button>
            </div>
          </div>

          {addVehicleRender ?
            <div className='mx-auto flex flex-col items-center w-3/6 mt-4 text-center bg-custom-bgColor/[.1] rounded-lg p-2'>
              {/* <div className='flex'> */}
              <input type="text" onChange={e => setPayload({ ...payload, model: e.target.value })}
                className='border h-8 w-4/6 text-sm m-1 p-4 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='Model' />

              <input type="text" onChange={e => setPayload({ ...payload, fuel_capacity: e.target.value })}
                className='border h-8 w-4/6 text-sm m-1 p-4 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='Fuel Capacity (L)' />
              {/* </div> */}

              {/* <div className='flex'> */}
              <input type="email" onChange={e => setPayload({ ...payload, license_plate: e.target.value })}
                className='border h-8 w-4/6 text-sm m-1 p-4 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='License Plate No' />

              {/* <input type="text" onChange={e => setPayload({ ...payload, phone: e.target.value })}
                  className='border h-8 w-3/6 text-sm m-1 p-4 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='Phone' /> */}

              <div class="flex items-center space-x-2 mx-auto my-1">
                <label for="date" class="text-gray-700 text-sm">Date Purchased:</label>
                <input type="date" id="date" name="date" onChange={e => setPayload({ ...payload, purchase_date: e.target.value })}
                  className="border border-none rounded-md px-4 py-2 h-8 w-7/12 focus:outline-custom-bgColor focus:border-transparent" />
              </div>
              {/* </div> */}

              <button onClick={createVehicleProfile}
                disabled={isDisabledBtn}
                className={`bg-custom-bgColor h-9 w-2/6 rounded-full my-4 text-white transition-all duration-300 ${isDisabledBtn ? 'opacity-75' : "hover:bg-gray-500"}`}>
                Create profile</button>
            </div> : null}

          <div className='mx-auto w-5/6 mt-5'>
            <Table columnsHeaders={tableObject} data={vehcilesData} />
          </div>
        </div>
      }
    </div>
  )
}

export default Vehicle;