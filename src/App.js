import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Driver from './pages/drivers/Driver';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {["/", "/home"].map((path, index) => <Route exact path={path} element={<Home />} key={index} />)}
        <Route exact path='/driver' element={<Driver />} />
      </Routes>
    </Router>
  );
}

export default App;
