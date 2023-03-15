import React, { useState } from 'react';
import Select from 'react-select';
import moment from 'moment';
import { editVehicle } from '../../utils/CRUD.services';


const EditVehicleInfoModal = ({ onchange, data }) => {
  const [showModal, setShowModal] = useState(true);
  const [model, setModel] = useState(data.model);
  const [license_plate, setLicensePlate] = useState(data.license_plate);
  const [fuel_capacity, setFuelCapacity] = useState(data.fuel_capacity);
  const [purchase_date, setPurchaseDate] = useState(moment(data.purchase_date).format('yyyy-MM-DD'));
  const [is_active, setActiveStatus] = useState(data.is_active);
  const ACTIVE_STATUS = [
    { value: true, label: 'YES' },
    { value: false, label: 'NO' }
  ];

  const handleClose = () => {
    setShowModal(false);
    onchange();
  };

  const saveChanges = async (id) => {
    const payload = { model, fuel_capacity, license_plate, purchase_date, is_active };
    console.log(payload);
    const response = await editVehicle(id, payload);
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
                    Edit driver info <i className="zmdi zmdi-edit ml-2"></i>
                  </h3>
                </div>
                {/*body*/}

                <div class="grid grid-cols-1 gap-2 p-6">
                  <div class="flex flex-col">
                    <label htmlFor="model" className="text-sm">Model:</label>
                    <input type="text" id="model" onChange={e => setModel(e.target.value)} value={model}
                      className="border h-8 w-[300px] text-sm p-2 focus:outline-none bg-gray-200` text-custom-bgColor'" placeholder='Model' />
                  </div>

                  <div class="flex flex-col">
                    <label htmlFor="plate_no" className='text-sm'>Plate NO:</label>
                    <input type="text" id="plate_no" onChange={e => setLicensePlate(e.target.value)} value={license_plate}
                      className="border h-8 w-[300px] text-sm p-2 focus:outline-none bg-gray-200` text-custom-bgColor" placeholder='License plate NO' />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="fuel_capacity" className="text-sm">Fuel capacity:</label>
                    <input type="text" id="fuel_capacity" onChange={e => setFuelCapacity(e.target.value)} value={fuel_capacity}
                      className="border h-8 w-[300px] text-sm m-1 p-2 focus:outline-none bg-gray-200` text-custom-bgColor" placeholder='Fuel Capacity' />
                  </div>

                  <div className="flex flex-col">
                    <label for="date" class="text-gray-700 text-sm">Date Purchased:</label>
                    <input type="date" id="date" name="date" onChange={e => setPurchaseDate(e.target.value)} value={purchase_date}
                      className="border border-none rounded-md px-4 py-2 h-8 w-7/12 focus:outline-custom-bgColor focus:border-transparent" />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="status">Status:</label>
                    <Select options={ACTIVE_STATUS}
                      isClearable={false} isSearchable={true}
                      maxMenuHeight={250} menuPlacement="bottom"
                      value={is_active}
                      onChange={option => setActiveStatus(option.value)}
                      className="w-[300px]" />
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
                    onClick={() => saveChanges(data.vehicle_id)}
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

export default EditVehicleInfoModal;