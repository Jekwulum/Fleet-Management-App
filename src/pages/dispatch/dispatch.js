import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { instance as Axios } from '../../utils/axios';
import { driversDataMapper, vehiclesDataMapper } from '../../utils/mappers';
import { dispatchesTableConfig } from '../../utils/dataTableConfig';
import { Table } from '../../components/Tables';
import { createDispatch } from '../../utils/CRUD.services';
import EditDispatchModal from '../../components/modals/EditDispatchModal';
import Header from '../../components/Header/Header';
import SphereLoader from '../../components/loaders/sphereLoader';

const Dispatch = () => {

  const [loading, setLoading] = useState(true);
  const [dispatchesData, setDispatchesData] = useState(); // mapped data
  const [vehiclesData, setVehiclesData] = useState(); // mapped data
  const [driversData, setDriversData] = useState(); // mapped data
  const [payload, setPayload] = useState({ driver_id: "", vehicle_id: "" });
  const [dispatchEditInfo, setDispatchEditInfo] = useState();
  const [showEditInfoModal, setShowEditInfoModal] = useState(false);
  const isDisabledBtn = Object.values(payload).every(val => val === "");

  const [addDispatchRender, setAddDispatchRender] = useState(false);

  const editDispatchInfo = info => {
    setDispatchEditInfo(info);
    setShowEditInfoModal(true);
  };

  const toggleAddDispatchRender = () => setAddDispatchRender(!addDispatchRender);
  const changeEditInfoRenderStatus = () => setShowEditInfoModal(false);

  const editInfoModal = showEditInfoModal ?
    <EditDispatchModal onchange={changeEditInfoRenderStatus} data={dispatchEditInfo} driversData={driversData} vehiclesData={vehiclesData} /> : null;

  const actionColumn = {
    Header: 'Action', accessor: 'action',
    Cell: ({ row }) => (
      <div className="flex">
        <span className="text-left pointer m-auto">
          <i
            className="zmdi zmdi-edit hover:cursor-pointer"
            onClick={() => editDispatchInfo(row.original)}
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

  const createNewDispatch = async (e) => {
    e.preventDefault();
    const response = await createDispatch(payload);
    if (response.status === "SUCCESS") {
      alert(response.message);
      window.location.reload();
    } else {
      alert(`operation failed: ${response.message}`);
    };
    console.log(payload);
  }


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
      {editInfoModal}
      <Header />
      <h1 className='text-5xl text-center mt-2 font-bold'>Dispatch</h1>
      {loading ? <SphereLoader /> :
        <div className='transition-all duration-300 ease-in-out'>

          <div className='mx-auto h-14 w-5/6 mt-4 flex justify-between items-center'>
            <div>
              <button onClick={e => toggleAddDispatchRender()}
                className='flex gap-1 p-1 items-center text-center bg-custom-bgColor w-24 h-9 text-sm rounded-full text-gray-100 mr-4 hover:bg-gray-500 font-bold transition-all duration-300'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p>Add new</p>
              </button>
            </div>
          </div>

          {addDispatchRender ?
            <div className='mx-auto flex flex-col items-center w-3/6 mt-4 text-center bg-custom-bgColor/[.1] rounded-lg p-2'>

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

              <button onClick={createNewDispatch}
                disabled={isDisabledBtn}
                className={`bg-custom-bgColor h-9 w-2/6 rounded-full my-4 text-white transition-all duration-300 ${isDisabledBtn ? 'opacity-75' : "hover:bg-gray-500"}`}>
                Create Dispatch</button>
            </div> : null}

          <div className='mx-auto w-5/6 mt-5'>
            <Table columnsHeaders={tableObject} data={dispatchesData} />
          </div>
        </div>
      }
    </div>
  )
}

export default Dispatch;