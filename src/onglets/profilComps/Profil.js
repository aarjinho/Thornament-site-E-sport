
import { Button, Navbar,Container, Nav} from 'react-bootstrap'
import React , {useState,useEffect, useContext} from 'react';
import {db} from "../../firebase-config";
import {collection} from "firebase/firestore"
import { DataContext } from "../../dataContext"
import { ReactComponent as LogoSvg } from '../homeComps/utils/logo.svg';
import {signOut} from 'firebase/auth'
import { auth } from '../../firebase-config'; 
import "./index.css";
import { Link ,useNavigate } from 'react-router-dom';
// import ParticlesBg from 'particles-bg'

export default function ContactUs() {
  const TournoiRef = collection(db, "Users")
  const {users,currentUser,getUserTable} = useContext(DataContext)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!currentUser){ //si pas de session en cours, on ne peut pas acceder a myHome
      navigate("/login")}
  },[currentUser])
  
  async function logout () {
    try {
      await signOut(auth)
    }
    catch {
      alert("Can't logout, please try again later")
    }
  }
  let cUser = getUserTable(currentUser?.email)
  console.log(currentUser);

 
  return (
    <>
      <Navbar  variant="dark" style={{backgroundColor : 'black' }} expand='lg'>
  <Container fluid className='ms-0 me-5' >
    <Navbar.Brand href="/#home" >
    <LogoSvg  className="d-inline-block align-top" width="230" height="120" style={{position: 'relative', left : '10%'}}/>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Container>
    </Navbar>
    <div className='profilBody' >
      <h1>My Profil</h1>
      <h1>Lastname : {cUser?.LastName}</h1>
      <h1>FirstName : {cUser?.FirstName}</h1>
      <h1>Pseudo : {cUser?.Pseudo}</h1>
      <h1>Email : {currentUser?.email}</h1>
      <h1>Tournament Played : {cUser?.Tournaments.length}</h1>
      <div>
      <Button variant='danger' onClick={logout}> Logout </Button>
      </div>
      <div>
      <a href="./contactus">You have a problem with your account ?</a>
      </div>
    </div>
    <Navbar style={{backgroundColor : 'black'}}>
                <Container fluid className='ms-0 me-5' >
                    <Navbar.Brand href="#home" >
                    <LogoSvg  className="d-inline-block align-top" width="250" height="120" style={{position: 'relative', left : '15%'}}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse  id="basic-navbar-nav">
                    <Nav className='ms-auto ' style={{position: 'relative', left : '-15%' }} >
                        <Nav.Item className='me-5'>
                        <a className='m-2 text-white '>Privacy Policy</a>
                        </Nav.Item>
                        <Nav.Item className='me-5'>
                        <a className='m-2 text-white'>Terms and Conditions</a>
                        </Nav.Item>
                        <Nav.Item className='me-5'>
                        <a className='m-2 text-white '>© 2021 Thornament,All Rights Reserved</a>
                        </Nav.Item>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <ParticlesBg bg={true} style="height : 100vh;" height="100vh" /> */}
    </>
  )
}
