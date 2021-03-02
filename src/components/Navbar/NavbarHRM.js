import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { Link } from 'react-router-dom';
import './Navbar.css';

import { authLogout, removeAlert } from "../../store/actions/index";

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const history = useHistory();
  // const handleClick = () => setClick(!click);
  // const closeMobileMenu = () => setClick(false);
  const { onauthLogout} = props;

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleLogout = () => {
    onauthLogout();
    history.push("/");
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          {/* <Link to='/' className='navbar-logo' >
            <img src="uom.png"/>
          </Link> */}
          <p className="company">Jupiter Lab</p>
          <div className='menu-icon'>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>


            <li className='nav-item'>
              <Link to='/hrmusers' className='nav-links'>
                Users
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/reports' className='nav-links'>
                Reports
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/hrmuserregisteration'
                className='nav-links'
              >
                User Registeration
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/hrmaddleaveapplication'
                className='nav-links'
              >
                Add Leave
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/'
                className='nav-links'
                onClick={() => handleLogout()}
              >
                Log Out
              </Link>
            </li>
          </ul>

        </div>
      </nav>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
    alerts: state.alert.alerts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onauthLogout: () => dispatch(authLogout()),
    removeAlert: (alertId) => dispatch(removeAlert(alertId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);