import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Table } from '../../components/Tables';
import Header from '../../components/Header/Header';
import SphereLoader from '../../components/loaders/sphereLoader';
import { instance as Axios } from '../../utils/axios';
import { createMaintenance } from '../../utils/CRUD.services';
import { maintenanceTableConfig } from '../../utils/dataTableConfig';
import { vehiclesDataMapper } from '../../utils/mappers';
import DeleteMaintenanceModal from '../../components/modals/DeleteMaintenanceModal';
import EditMaintenanceModal from '../../components/modals/EditMaintenanceModal';

const Maintenance = () => {

  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState({ cost: 0, parts_used: [], maintenance_date: "" });
  const [maintenanceData, setMaintenanceData] = useState();
  const [allVehicles, setAllVehicles] = useState(); // from BE
  const [vehiclesData, setVehiclesData] = useState(); // mapped data
  const isDisabledBtn = Object.values(payload).every(val => val === "" || val === [] || val === 0);

  const [addMaintenanceRender, setAddMaintenanceRender] = useState(false);
  const [maintenanceDeleteInfo, setMaintenanceDeleteInfo] = useState();
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showEditInfoModal, setShowEditInfoModal] = useState(false);
  const [maintenanceEditInfo, setMaintenanceEditInfo] = useState();


  const toggleAddMaintenanceRender = () => setAddMaintenanceRender(!addMaintenanceRender);
  const changeMaintenanceInfoRenderStatus = () => setDeleteModal(false);
  const changeEditInfoRenderStatus = () => setShowEditInfoModal(false);

  const deleteMaintenanceInfo = info => {
    setMaintenanceDeleteInfo(info);
    setDeleteModal(true);
  };

  const editMaintenanceInfo = info => {
    setMaintenanceEditInfo(info);
    setShowEditInfoModal(true);
  };

  const deleteInfoModal = showDeleteModal ? <DeleteMaintenanceModal onchange={changeMaintenanceInfoRenderStatus} data={maintenanceDeleteInfo} /> : null;
  const editInfoModal = showEditInfoModal ? <EditMaintenanceModal onchange={changeEditInfoRenderStatus} data={maintenanceEditInfo} /> : null;

  const actionColumn = {
    Header: 'Action', accessor: 'action',
    Cell: ({ row }) => (
      <div className="flex">
        <span className="text-left pointer m-auto">
          <i
            className="zmdi zmdi-edit hover:cursor-pointer"
            onClick={() => editMaintenanceInfo(row.original)}
            style={{ fontSize: "22px", color: "#ffcd4f" }}>
          </i>
        </span>
        <span className="text-left pointer m-auto">
          <i
            className="zmdi zmdi-delete hover:cursor-pointer"
            onClick={e => { deleteMaintenanceInfo(row.original); }}
            style={{ fontSize: "22px", color: "#FC0303" }}>
          </i>
        </span>
      </div>
    )
  };

  const vehicleColumn = {
    Header: 'Vehicle', accessor: 'vehicle',
    Cell: ({ row }) => {
      const vehicleObj = allVehicles.find(obj => obj.vehicle_id === row.original.vehicle_id);
      return <p>{`${vehicleObj.model} ${vehicleObj.license_plate}`}</p>
    }
  };

  const tableObject = [...maintenanceTableConfig, vehicleColumn, actionColumn];
  const createNewMaintenance = async (e) => {
    e.preventDefault();
    const response = await createMaintenance(payload);
    if (response.status === "SUCCESS") {
      alert(response.message);
      window.location.reload();
    } else {
      alert(`operation failed: ${response.message}`);
    };
    console.log(payload);
  }

  useEffect(() => {
    Axios.get('/maintenance')
      .then(({ data: responseData }) => {
        if (responseData.status === "SUCCESS") {
          setMaintenanceData(responseData.data);
          Axios.get(`/vehicle`)
            .then(({ data: responseData }) => {
              if (responseData.status === "SUCCESS") {
                setAllVehicles(responseData.data);
                setVehiclesData(vehiclesDataMapper(responseData.data));
                setLoading(false);
              } else setLoading(true);
            })
            .catch(err => console.error(err));
        } else setLoading(true);
      })
      .catch(error => console.log(error));


  }, []);

  return (
    <div>
      {deleteInfoModal}
      {editInfoModal}
      <Header />
      <h1 className='text-5xl text-center mt-2 font-bold'>Maintenances</h1>
      {
        loading ? <SphereLoader /> :
          <div className='transition-all duration-300 ease-in-out'>
            <div className='mx-auto h-14 w-5/6 mt-4 flex justify-between items-center'>
              <div>
                <button onClick={e => toggleAddMaintenanceRender()}
                  className='flex gap-1 p-1 items-center text-center bg-custom-bgColor w-24 h-9 text-sm rounded-full text-gray-100 mr-4 hover:bg-gray-500 font-bold transition-all duration-300'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <p>Add new</p>
                </button>
              </div>
            </div>

            {addMaintenanceRender ?
              <div className='mx-auto flex flex-col items-center w-3/6 mt-4 text-center bg-custom-bgColor/[.1] rounded-lg p-2'>
                {/* <div className='flex'> */}
                <input type="text" onChange={e => setPayload({ ...payload, cost: e.target.value })}
                  className='border h-8 w-4/6 text-sm m-1 p-4 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='cost' />

                <input type="text" onChange={e => setPayload({ ...payload, parts_used: [e.target.value] })}
                  className='border h-8 w-4/6 text-sm m-1 p-4 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='Parts Used' />
                {/* </div> */}

                <Select options={vehiclesData}
                  isClearable={false} isSearchable={true}
                  maxMenuHeight={250} menuPlacement="bottom" placeholder="Select Vehicle"
                  onChange={option => setPayload({ ...payload, vehicle_id: option.value })}
                  className="w-4/6 m-1 text-left" />


                <div class="flex flex-col md:flex-row items-center space-x-1 mx-auto my-1">
                  <label htmlFor="date" class="text-gray-700 text-sm">Maintenance Date:</label>
                  <input type="date" id="date" name="date" onChange={e => setPayload({ ...payload, maintenance_date: e.target.value })}
                    className="border border-none rounded-md px-2 py-2 h-8 md:w-6/12 focus:outline-custom-bgColor focus:border-transparent" />
                </div>
                {/* </div> */}

                <button onClick={createNewMaintenance}
                  disabled={isDisabledBtn}
                  className={`bg-custom-bgColor h-9 w-4/6 md:w-2/6 rounded-full my-4 text-white transition-all duration-300 ${isDisabledBtn ? 'opacity-75' : "hover:bg-gray-500"}`}>
                  Add Maintenance</button>
              </div> : null}

            <div className='mx-auto w-5/6 mt-5'>
              <Table columnsHeaders={tableObject} data={maintenanceData} />
            </div>
          </div>
      }
    </div>
  )
}

export default Maintenance;