import React, { useState, useEffect } from 'react';
import { instance as Axios } from '../../utils/axios';
import { driverTableConfig } from '../../utils/dataTableConfig';
import { Table } from '../../components/Tables';
import { createDriver } from '../../utils/CRUD.services';
import DeleteDriverModal from '../../components/modals/DeleteDriverModal';
import EditDriverModal from '../../components/modals/editDriverModal';
import Header from '../../components/Header/Header';
import SphereLoader from '../../components/loaders/sphereLoader';

const Driver = () => {
  const [driversData, setdriversData] = useState();
  const [loading, setLoading] = useState(true);
  const [driverDeleteInfo, setDriverDeleteInfo] = useState() // for delete modal
  const [payload, setPayload] = useState({ first_name: "", last_name: "", phone: "", email: "" });
  const [addDriverRender, setAddDriverRender] = useState(false);
  const [driverInfo, setDriverInfo] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);


  const deleteDriverInfo = info => {
    setDriverDeleteInfo(info);
    setDeleteModal(true);
  };

  const editDriverinfo = info => {
    setDriverInfo(info);
    setShowModal(true);
  };
  const toggleAddDriverRender = () => setAddDriverRender(!addDriverRender);
  const changeEditInfoRenderStatus = () => setShowModal(false);
  const changeDeleteInfoRenderStatus = () => setDeleteModal(false);

  const editInfoModal = showModal ? <EditDriverModal onchange={changeEditInfoRenderStatus} data={driverInfo} /> : null;
  const deleteInfoModal = showDeleteModal ? <DeleteDriverModal onchange={changeDeleteInfoRenderStatus} data={driverDeleteInfo} /> : null;

  const actionColumn = {
    Header: 'Action', accessor: 'action',
    Cell: ({ row }) => (
      <div className="flex">
        <span className="text-left pointer m-auto">
          <i
            className="zmdi zmdi-edit hover:cursor-pointer"
            onClick={() => editDriverinfo(row.original)}
            style={{ fontSize: "22px", color: "#ffcd4f" }}>
          </i>
        </span>
        <span className="text-left pointer m-auto">
          <i
            className="zmdi zmdi-delete hover:cursor-pointer"
            onClick={e => { deleteDriverInfo(row.original); }}
            style={{ fontSize: "22px", color: "#FC0303" }}>
          </i>
        </span>
      </div>
    )
  };

  const tableObject = [...driverTableConfig, actionColumn];

  useEffect(() => {
    Axios.get('/driver')
      .then(response => {
        if (response.data.status === "SUCCESS") {
          setdriversData(response.data.data);
          setLoading(false);
        } else setLoading(true);
      })
      .catch(error => console.log(error))
  }, []);


  const createDriverProfile = async (e) => {
    e.preventDefault();
    const response = await createDriver(payload);
    if (response.status === "SUCCESS") {
      window.location.reload();
    } else {
      alert(`operation failed: ${response.message}`);
    };
  }

  return (
    <div className=''>
      {deleteInfoModal}
      {editInfoModal}
      <Header />
      <h1 className='text-5xl text-center mt-2 font-bold'>Drivers</h1>

      {loading ? <SphereLoader /> :
        <div className='transition-all duration-300 ease-in-out'>

          <div className='mx-auto h-14 w-5/6 mt-4 flex justify-between items-center'>
            <div className=''>
              <button onClick={e => toggleAddDriverRender()}
                className='flex gap-1 p-1 items-center text-center bg-custom-bgColor w-24 h-9 text-sm rounded-full text-gray-100 mr-4 hover:bg-gray-500 font-bold transition-all duration-300'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p>Add new</p>
              </button>
            </div>
          </div>

          {addDriverRender ?
            <div className='mx-auto w-5/6 mt-4 text-center bg-custom-bgColor/[.1] rounded-lg p-2'>
              <div className='flex'>
                <input type="text" onChange={e => setPayload({ ...payload, first_name: e.target.value })}
                  className='border h-8 w-3/6 text-sm m-1 p-4 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='First Name' />

                <input type="text" onChange={e => setPayload({ ...payload, last_name: e.target.value })}
                  className='border h-8 w-3/6 text-sm m-1 p-4 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='Last Name' />
              </div>

              <div className='flex'>
                <input type="email" onChange={e => setPayload({ ...payload, email: e.target.value })}
                  className='border h-8 w-3/6 text-sm m-1 p-4 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='Email' />

                <input type="text" onChange={e => setPayload({ ...payload, phone: e.target.value })}
                  className='border h-8 w-3/6 text-sm m-1 p-4 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='Phone' />
              </div>

              <button onClick={createDriverProfile}
                className='bg-custom-bgColor h-9 w-2/6 rounded-full mt-3 text-white hover:bg-gray-500 transition-all duration-300'>
                Create profile</button>
            </div> : ""}

          <div className='mx-auto w-5/6 mt-5'>
            <Table columnsHeaders={tableObject} data={driversData} />
          </div>
        </div>}
    </div>
  )
}

export default Driver;