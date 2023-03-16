import React, { useState } from 'react';
import moment from 'moment';
import { editTrip } from '../../utils/CRUD.services';

const EditTripModal = ({ onchange, data }) => {

  const [showModal, setShowModal] = useState(true);
  const [start_location, setStartLocation] = useState(data.start_location);
  const [end_location, setEndLocation] = useState(data.end_location);
  const [distance, setDistance] = useState(data.distance);
  const [trip_date, setTripDate] = useState(moment(data.trip_date).format('yyyy-MM-DD'));

  const handleClose = () => {
    setShowModal(false);
    onchange();
  };

  const saveChanges = async (id) => {
    const payload = { start_location, end_location, distance, trip_date };
    console.log(payload);
    const response = await editTrip(id, payload);
    if (response.status === "SUCCESS") {
      alert(`Success: ${response.message}`);
      handleClose();
      window.location.reload();
    } else {
      alert(`operation failed: ${response.message}`);
    };
  }

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit trip info <i className="zmdi zmdi-edit ml-2"></i>
                  </h3>
                </div>
                {/*body*/}

                <div class="grid grid-cols-1 gap-2 p-6">
                  <div class="flex flex-col">
                    <label htmlFor="model" className="text-sm">Start Location:</label>
                    <input type="text" id="model" onChange={e => setStartLocation(e.target.value)} value={start_location}
                      className="border h-8 w-[300px] text-sm p-2 focus:outline-none bg-gray-200` text-custom-bgColor'" placeholder='Model' />
                  </div>

                  <div class="flex flex-col">
                    <label htmlFor="plate_no" className='text-sm'>End Location:</label>
                    <input type="text" id="plate_no" onChange={e => setEndLocation(e.target.value)} value={end_location}
                      className="border h-8 w-[300px] text-sm p-2 focus:outline-none bg-gray-200` text-custom-bgColor" placeholder='License plate NO' />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="fuel_capacity" className="text-sm">Distance:</label>
                    <input type="text" id="fuel_capacity" onChange={e => setDistance(e.target.value)} value={distance}
                      className="border h-8 w-[300px] text-sm m-1 p-2 focus:outline-none bg-gray-200` text-custom-bgColor" placeholder='Fuel Capacity' />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="date" class="text-gray-700 text-sm">Trip Date:</label>
                    <input type="date" id="date" name="date" onChange={e => setTripDate(e.target.value)} value={trip_date}
                      className="border border-none rounded-md px-4 py-2 h-8 w-7/12 focus:outline-custom-bgColor focus:border-transparent" />
                  </div>
                </div>


                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleClose()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-custom-bgColor text-white active:bg-custom-bgColor font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => saveChanges(data.trip_id)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default EditTripModal;