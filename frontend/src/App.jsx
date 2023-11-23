import './App.css'
import Calendar from './components/calendar/calendar';
import Dashboard from './components/dashboard/dashboard';
import Medications from './components/medications/medications';
import PatientReport from './components/patient-report/patient-report';
import Sidebar from './components/sidebar/sidebar'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className='app-container'>
      <Sidebar />
      <Routes>
        <Route path="/" element={< Dashboard />} />
        <Route path="/medications" element={< Medications />} />
        <Route path="/calendar" element={< Calendar />} />
        <Route path="/report" element={< PatientReport />} />

      </Routes>
    </div>
  )
}

export default App
