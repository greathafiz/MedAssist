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
import Doctor from './components/doctor/doctor';
import Report from './components/doctor-report/report';
import DocSidebar from './components/doc-sidebar/sidebar';
// import RequireAuth from './components/requireAuth';

function App() {
  const location = useLocation();
  const showSidebarNavbarRoutes = ['/', '/medications', '/calendar', '/report'];
  const showDocSidebarNavbarRoutes = ['/doctor', '/doctor-report'];

  const shouldShowSidebarNavbar = showSidebarNavbarRoutes.includes(location.pathname);
  const shouldShowDocSidebarNavbar = showDocSidebarNavbarRoutes.includes(location.pathname);

  return (
    <>
      <div className="app-container">
        {shouldShowSidebarNavbar && <Sidebar />}
        {shouldShowDocSidebarNavbar && <DocSidebar />}
        <div className="app-main">
          {shouldShowSidebarNavbar || shouldShowDocSidebarNavbar && <Navbar />}
          <Routes>
            {/* <Route element={<RequireAuth />}> */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/medications" element={<Medications />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/report" element={<PatientReport />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/doctor-report" element={<Report />} />
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
