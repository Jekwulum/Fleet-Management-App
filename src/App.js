import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Driver from './pages/drivers/Driver';
import Home from './pages/Home';
import Vehicle from './pages/vehicles/Vehicle';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {["/", "/home"].map((path, index) => <Route exact path={path} element={<Home />} key={index} />)}
        <Route exact path='/driver' element={<Driver />} />
        <Route exact path='/vehicle' element={<Vehicle />} />
      </Routes>
    </Router>
  );
}

export default App;
