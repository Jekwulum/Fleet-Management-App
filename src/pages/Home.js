import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { instance as Axios } from '../utils/axios';
import Card from '../components/Card';
import Header from '../components/Header/Header';
import LineChart from '../components/charts/LineChart';
import SphereLoader from '../components/loaders/sphereLoader';

const Home = () => {
  const [driversData, setDriversData] = useState();
  const [vehiclesData, setVehiclesData] = useState();
  const [tripsData, setTripsData] = useState();
  const [lineChartData, setLineChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get('/stats')
      .then(({ data }) => {
        if (data.status === "SUCCESS") {
          setDriversData(data.data.drivers);
          setVehiclesData(data.data.vehicles);
          setTripsData(data.data.trips);
          setLineChartData(data.data.trips.stats);
          setLoading(false);
        } else setLoading(true);
      })
      .catch(error => console.log(error));
  });
  // console.log(lineChartData);

  return (
    <div>
      <Header />

      <div>
        <h1 className='text-5xl text-center mt-2 font-bold'>Dashboard</h1>

        {loading ? <SphereLoader /> :
          <div>
            <div className='bg-gray-50 m-3 p-3 flex flex-col gap-4 md:flex-row items-center w-5/6 mx-auto justify-center md:w-2/3 md:h-64 md:gap-10 rounded-lg'>
              <Link to={"/driver"}>
                <Card data={driversData} icon={`zmdi zmdi-accounts-alt`} label="Drivers" />
              </Link>

              <Link to={"/vehicle"}>
                <Card data={vehiclesData} icon={`zmdi zmdi-truck`} label="Vehicles" />
              </Link>

              <Link to={"/trips"}>
                <Card data={tripsData} icon="zmdi zmdi-gps-dot" label="Trips" />
              </Link>
            </div>

            <div className='bg-gray-50 flex flex-col gap-2 items-center w-5/6 mx-auto md:w-2/3 md:h-64 md:gap-10 rounded-lg'>
              <h2 className='text-3xl font-bold mt-1'>Trips Stats</h2>
              <LineChart data={lineChartData} />
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Home;