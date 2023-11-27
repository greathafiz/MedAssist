import './style.css'
import Logo from '../../assets/logo.svg'
import { links } from './links'
import { Link, useLocation} from 'react-router-dom'
const DocSidebar = () => {
  const location = useLocation()
  return (
    <div className='sidebar-container'>
      <div className="logo">
        <img src={Logo} alt="" />
        <Link to='/'>MedAssist</Link>
      </div>

      <div className="links-container">
        {links.map((link)=>(
          <Link to={link.href} key={link.id} className={location.pathname === link.href ?  `link-container active` : `link-container`}>
            <img src={link.icon} alt="" />
            <h4>{link.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DocSidebar