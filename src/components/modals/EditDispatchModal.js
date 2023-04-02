import React, { useState } from 'react';
import Select from 'react-select';
import { editDispatch } from '../../utils/CRUD.services';

const EditDispatchModal = ({ onchange, data, vehiclesData, driversData }) => {
  const [showModal, setShowModal] = useState(true);
  const [vehicle_id, setVehicleID] = useState(data.vehicle_id);
  const [driver_id, setDriverID] = useState(data.driver_id);

  const handleClose = () => {
    setShowModal(false);
    onchange();
  };

  const saveChanges = async (id) => {
    const payload = { vehicle_id, driver_id };
    console.log(payload);
    const response = await editDispatch(id, payload);
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
                    Edit dispatch info <i className="zmdi zmdi-edit ml-2"></i>
                  </h3>
                </div>
                {/*body*/}

                <div className="grid grid-cols-1 gap-2 p-6">
                  <Select options={driversData}
                    isClearable={false} isSearchable={true}
                    maxMenuHeight={250} menuPlacement="bottom" placeholder="Select Driver"
                    onChange={option => setDriverID(option.value)}
                    className="w-5/6 m-1 text-left" />

                  <Select options={vehiclesData}
                    isClearable={false} isSearchable={true}
                    maxMenuHeight={250} menuPlacement="bottom" placeholder="Select Vehicle"
                    onChange={option => setVehicleID(option.value)}
                    className="w-5/6 m-1 text-left" />
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
                    onClick={() => saveChanges(data.dispatch_id)}
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

export default EditDispatchModal;