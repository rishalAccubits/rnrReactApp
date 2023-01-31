import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import {  nav, button, form, input, Image } from "react-bootstrap";
import { getBsProps } from 'react-bootstrap/lib/utils/bootstrapUtils';
// import { Web3Modal } from '@web3modal/standalone'

const Navbar = (props) => {
  const navigate = useNavigate();


  const handleSubmit = () => {
    navigate('/register')
  }

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
          <Link to='/'>
            <href className="navbar-brand">Cryptopathi</href>
          </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav me-auto">
            { props.registrationStatus &&
              <li className="nav-item">
                <Link to='/claim'><href className="nav-link">Claim-Token</href></Link>
              </li>
            }
            { props.registrationStatus &&
              <li className="nav-item">
                <Link to='/play'><href className="nav-link">Play</href></Link>
              </li>
            }
            { props.registrationStatus &&
              <li className="nav-item">
                <Link to='/leaderboard'><href className="nav-link">Leader Board</href></Link>
              </li>
            }
          </ul>
          <form className="d-flex">
            {/* <input className="form-control me-sm-2" type="search" placeholder="Search"/> */}
            <button className="btn btn-secondary my-2 my-sm-0" type="submit" disabled={props.registrationStatus} onClick={handleSubmit}>Register</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
  )
}

export default Navbar