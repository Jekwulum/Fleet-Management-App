import React, { useState } from 'react';
import moment from 'moment';
import { editMaintenance } from '../../utils/CRUD.services';

const EditMaintenanceModal = ({ onchange, data }) => {

  const [showModal, setShowModal] = useState(true);
  const [parts_used, setPartsUsed] = useState(data.parts_used);
  const [cost, setCost] = useState(data.cost);
  const [maintenance_date, setMaintenanceDate] = useState(moment(data.maintenance_date).format('yyyy-MM-DD'));

  const handleClose = () => {
    setShowModal(false);
    onchange();
  };

  const saveChanges = async (id) => {
    const payload = { parts_used, cost, maintenance_date };
    console.log(payload);
    const response = await editMaintenance(id, payload);
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
                    Edit maintenance info <i className="zmdi zmdi-edit ml-2"></i>
                  </h3>
                </div>
                {/*body*/}

                <div className="grid grid-cols-1 gap-2 p-6">
                  <div className="flex flex-col">
                    <label htmlFor="model" className="text-sm">Cost:</label>
                    <input type="text" id="model" onChange={e => setCost(e.target.value)} value={cost}
                      className="border h-8 w-[300px] text-sm p-2 focus:outline-none bg-gray-200` text-custom-bgColor'" placeholder='Cost' />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="plate_no" className='text-sm'>Parts Used</label>
                    <input type="text" id="plate_no" onChange={e => setPartsUsed([e.target.value])} value={[...parts_used]}
                      className="border h-8 w-[300px] text-sm p-2 focus:outline-none bg-gray-200` text-custom-bgColor" placeholder='Parts Used' />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="date" className="text-gray-700 text-sm">Maintenance Date:</label>
                    <input type="date" id="date" name="date" onChange={e => setMaintenanceDate(e.target.value)} value={maintenance_date}
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
                    onClick={() => saveChanges(data.maintenance_id)}
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

export default EditMaintenanceModal;