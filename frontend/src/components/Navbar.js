import './Navbar.css';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios';

// Actions
import { logout } from '../redux/actions/studentActions'

const Navbar = (props) => {
  axios.defaults.withCredentials = true

  const dispatch = useDispatch()

  const profile = useSelector(state => state.student.profile)

  const [click, setClick] = useState(false)

  const handleClick = () => {
    setClick(!click)
  }

  const closeMobileMenu = () => {
    setClick(false)
  }

  const logoutHandler = () => {
    dispatch(logout())
    setClick(false)
    props.history.push('/login')
  }

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <Link to='/' className="logo-link" onClick={closeMobileMenu}>
          Course Registration
        </Link>
      </div>

      <div className="hamburger-menu" onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>

      <ul className={click ? "navbar-links active" : "navbar-links"}>
        {profile && profile.role === 1 ? (
          <>
            <li>
              <Link to='/courses' className="navbar-link" onClick={closeMobileMenu}>
                Courses
              </Link>
            </li>
            <li>
              <Link to='/students' className="navbar-link" onClick={closeMobileMenu}>
                Students
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to='/registration' className="navbar-link" onClick={closeMobileMenu}>
              Registration
            </Link>
          </li>
        )}

        {profile && !click ? (
          <>
            <li className="navbar-fullname" >
              <span>{profile.firstName}</span>
            </li>
            <li>
              <span className="navbar-link-button" onClick={logoutHandler}>Log Out</span>
            </li>
          </>
        ) : (
          <li>
            <Link to='/login' className="navbar-link" onClick={closeMobileMenu}>
              Log In
            </Link>
          </li>
        )}
      </ul>
    </nav >
  )
}

export default withRouter(Navbar)