import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { instance as Axios } from '../utils/axios';
import Card from '../components/Card';
import Header from '../components/Header/Header';
import SphereLoader from '../components/loaders/sphereLoader';

const Home = () => {
  const [driversData, setDriversData] = useState();
  const [vehiclesData, setVehiclesData] = useState();
  const [tripsData, setTripsData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get('/stats')
      .then(({ data }) => {
        if (data.status === "SUCCESS") {
          setDriversData(data.data.drivers);
          setVehiclesData(data.data.vehicles);
          setTripsData(data.data.trips);
          setLoading(false);
        } else setLoading(true);
      })
      .catch(error => console.log(error))
  });

  return (
    <div>
      <Header />

      <div>
        <h1 className='text-5xl text-center mt-2 font-bold'>Dashboard</h1>

        {loading ? <SphereLoader /> :
          <div>
            <div className='bg-red-200 m-3 flex flex-col gap-4 md:flex-row items-center w-full mx-auto justify-center md:gap-10'>
              <Card data={driversData} icon={`zmdi zmdi-accounts-alt`} label="Drivers" />

              <Card data={vehiclesData} icon={`zmdi zmdi-truck`} label="Vehicles" />

              <Card data={tripsData} icon="zmdi zmdi-gps-dot" label="Trips" />
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Home;