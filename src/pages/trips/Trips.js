import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { instance as Axios } from '../../utils/axios';
import { tripsTableConfig } from '../../utils/dataTableConfig';
import { Table } from '../../components/Tables';
import { createTrip } from '../../utils/CRUD.services';
import { driversDataMapper, vehiclesDataMapper } from '../../utils/mappers';
import Header from '../../components/Header/Header';
import SphereLoader from '../../components/loaders/sphereLoader';

const Trips = () => {
  const [tripsData, setTripsData] = useState();
  const [allDrivers, setAllDrivers] = useState(); // from BE
  const [vehiclesData, setVehiclesData] = useState(); // mapped data
  const [driversData, setDriversData] = useState(); // mapped data
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState({
    driver_id: "", start_location: "", end_location: "",
    vehicle_id: "", distance: "", trip_date: ""
  });
  const isDisabledBtn = Object.values(payload).every(val => val === "");

  const [addTripRender, setAddTripRender] = useState(false);
  const toggleAddTripRender = () => setAddTripRender(!addTripRender);

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

  const driverColumn = {
    Header: 'Driver', accessor: 'driver',
    Cell: ({ row }) => {
      const driverObj = allDrivers.find(obj => obj.driver_id === row.original.driver_id);
      return <p>{`${driverObj.first_name} ${driverObj.last_name}`}</p>
    }
  };

  const tableObject = [...tripsTableConfig, driverColumn, actionColumn];
  const createNewTrip = async (e) => {
    e.preventDefault();
    const response = await createTrip(payload);
    if (response.status === "SUCCESS") {
      alert(response.message);
      window.location.reload();
    } else {
      alert(`operation failed: ${response.message}`);
    };
    console.log(payload);
  }

  useEffect(() => {
    Axios.get('/trip')
      .then(({ data: responseData }) => {
        if (responseData.status === "SUCCESS") {
          setTripsData(responseData.data);
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
        setVehiclesData(vehiclesDataMapper(responseData.data));
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Header />
      <h1 className='text-5xl text-center mt-2 font-bold'>Trips</h1>
      {loading ? <SphereLoader /> :
        <div className='transition-all duration-300 ease-in-out'>

          <div className='mx-auto h-14 w-5/6 mt-4 flex justify-between items-center'>
            <div>
              <button onClick={e => toggleAddTripRender()}
                className='flex gap-1 p-1 items-center text-center bg-custom-bgColor w-24 h-9 text-sm rounded-full text-gray-100 mr-4 hover:bg-gray-500 font-bold transition-all duration-300'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p>Add new</p>
              </button>
            </div>
          </div>

          {addTripRender ?
            <div className='mx-auto flex flex-col items-center w-3/6 mt-4 text-center bg-custom-bgColor/[.1] rounded-lg p-2'>
              {/* <div className='flex'> */}
              <input type="text" onChange={e => setPayload({ ...payload, start_location: e.target.value })}
                className='border h-8 w-4/6 text-sm m-1 p-4 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='Start Location' />

              <input type="text" onChange={e => setPayload({ ...payload, end_location: e.target.value })}
                className='border h-8 w-4/6 text-sm m-1 p-4 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='End location' />
              {/* </div> */}

              {/* <div className='flex'> */}
              <input type="email" onChange={e => setPayload({ ...payload, distance: e.target.value })}
                className='border h-8 w-4/6 text-sm m-1 p-4 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='Distance' />


              <Select options={driversData}
                isClearable={false} isSearchable={true}
                maxMenuHeight={250} menuPlacement="bottom" placeholder="Select Driver"
                onChange={option => setPayload({ ...payload, driver_id: option.value })}
                className="w-4/6 m-1 text-left" />

              <Select options={vehiclesData}
                isClearable={false} isSearchable={true}
                maxMenuHeight={250} menuPlacement="bottom" placeholder="Select Vehicle"
                onChange={option => setPayload({ ...payload, vehicle_id: option.value })}
                className="w-4/6 m-1 text-left" />


              <div class="flex items-center space-x-2 mx-auto my-1">
                <label for="date" class="text-gray-700 text-sm">Trip Date:</label>
                <input type="date" id="date" name="date" onChange={e => setPayload({ ...payload, trip_date: e.target.value })}
                  className="border border-none rounded-md px-4 py-2 h-8 w-8/12 focus:outline-custom-bgColor focus:border-transparent" />
              </div>
              {/* </div> */}

              <button onClick={createNewTrip}
                disabled={isDisabledBtn}
                className={`bg-custom-bgColor h-9 w-2/6 rounded-full my-4 text-white transition-all duration-300 ${isDisabledBtn ? 'opacity-75' : "hover:bg-gray-500"}`}>
                Create trip</button>
            </div> : null}

          <div className='mx-auto w-5/6 mt-5'>
            <Table columnsHeaders={tableObject} data={tripsData} />
          </div>
        </div>
      }
    </div>
  )
}

export default Trips;