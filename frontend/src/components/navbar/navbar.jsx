import './style.css'
import DefaultPic from '../../assets/default-profile.svg'
import Dropdown from '../../assets/dropdown-icon.svg'
import { useLocation } from 'react-router'
import useAuth from '../../hook/useAuth'
const Navbar = () => {
  const location = useLocation()
  const {auth} = useAuth()

  return (
    <div className='container'>
      <div className="header">
        
        {location.pathname === '/' ? (
          <h3>Dashboard</h3>
        ): location.pathname === '/medications'?(
          <h3>Medications</h3>
        ): location.pathname === '/calendar' ? (
          <h3>Calendar</h3>
        ): location.pathname === '/report' ? (
          <h3>Report</h3>
        ): <></>}
        

        <div className="profile">
          <img className='profile-pic' src={DefaultPic} alt="profile picture" />
          <div className="profile-name">
            <h4>{auth?.userDetails?.fullName}</h4>
            <img src={Dropdown} alt="dropdown icon" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar