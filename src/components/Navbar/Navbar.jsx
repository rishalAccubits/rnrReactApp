import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import {  nav, button, form, input, Image } from "react-bootstrap";

const Navbar = () => {
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
            <li className="nav-item">
              <Link to='/claim'><href className="nav-link">Claim-Token</href></Link>
            </li>
            <li className="nav-item">
              <Link to='/play'><href className="nav-link">Play</href></Link>
            </li>
            <li className="nav-item">
              <Link to='/leaderboard'><href className="nav-link">Leader Board</href></Link>
            </li>
          </ul>
          <form className="d-flex">
            {/* <input className="form-control me-sm-2" type="search" placeholder="Search"/> */}
            <button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick={handleSubmit}>Register</button>
          </form>
          <form className="d-flex">
            {/* <input className="form-control me-sm-2" type="search" placeholder="Search"/> */}
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Connect Wallet</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
  )
}

export default Navbar