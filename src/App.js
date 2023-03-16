import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dispatch from './pages/dispatch/Dispatch';
import Driver from './pages/drivers/Driver';
import Home from './pages/Home';
import Maintenance from './pages/maintenance/Maintenance';
import Vehicle from './pages/vehicles/Vehicle';

import Trips from './pages/trips/Trips';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {["/", "/home"].map((path, index) => <Route exact path={path} element={<Home />} key={index} />)}
        <Route exact path='/dispatch' element={<Dispatch />} />
        <Route exact path='/driver' element={<Driver />} />
        <Route exact path='/maintenance' element={<Maintenance />} />
        <Route exact path='/vehicle' element={<Vehicle />} />
        <Route exact path='/trips' element={<Trips />} />
      </Routes>
    </Router>
  );
}

export default App;
