import React from 'react'
import {Link} from 'react-router-dom'

export default function Sommaire() {
  return (
    
    <div>
      <h1 style={{textAlign: "center"}}>Sommaire des pages en developpement.</h1>
      <ul style={{lineHeight: '3'}}>
        <li>
            <Link to="/home">Home </Link>(en cours de dev par Yahya)
        </li>

        <li>
            <Link to="/login">Login </Link> (en cours de dev par ????)
        </li>

        <li>
            <Link to="/signup">SignUp </Link> (en cours de dev par Yanis)
        </li>

        <li>
            <Link to="/aboutus">About Us </Link> (en cours de dev par ????)
        </li>

        <li>
            <Link to="/contactus">Contact Us  </Link> (en cours de dev par ?????)
        </li>

        <li>
            <Link to="/myhome">My Home  </Link> (en cours de dev par Ahmed )
        </li>

        <li>
            <Link to="/createtournament">Create Tournament </Link> (en cours de dev par Mootez)
        </li>

        <li>
            <Link to="/tournament">Tournament </Link> (en cours de dev par Ayoub)
        </li>

        <li>
            <Link to="/games">Games </Link> (en cours de dev par ???? )
        </li>

        <li>
            <Link to="/profil">Profil </Link>  (en cours de dev par ????)
        </li>

        <li>
            <Link to="/tournamentpage">TournamentPage </Link>  (en cours de dev par Mootez)
        </li>
      </ul>
    </div>
  )
}
