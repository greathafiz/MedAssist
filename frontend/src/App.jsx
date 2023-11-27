import { Routes, Route, useLocation} from 'react-router-dom';
import './App.css';
import Calendar from './components/calendar/calendar';
import Dashboard from './components/dashboard/dashboard';
import Medications from './components/medications/medications';
import Navbar from './components/navbar/navbar';
import PatientReport from './components/patient-report/patient-report';
import Sidebar from './components/sidebar/sidebar';
import Signin from './components/signin/signin';
import Signup from './components/signup/signup';
// import RequireAuth from './components/requireAuth';

function App() {
  const location = useLocation();
  const showSidebarNavbarRoutes = ['/', '/medications', '/calendar', '/report'];

  const shouldShowSidebarNavbar = showSidebarNavbarRoutes.includes(location.pathname);

  return (
    <>
      <div className="app-container">
        {shouldShowSidebarNavbar && <Sidebar />}
        <div className="app-main">
          {shouldShowSidebarNavbar && <Navbar />}
          <Routes>
            {/* <Route element={<RequireAuth />}> */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/medications" element={<Medications />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/report" element={<PatientReport />} />
            {/* </Route> */}
          </Routes>
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
