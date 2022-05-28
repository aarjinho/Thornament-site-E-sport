import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import { ReactComponent as LogoSvg } from '../homeComps/utils/logo.svg';
import "./tournamentStyle.css"


export default function TournamentNavbar(props) {

    //on recupere le state "searchInput" de App.js
    const search=props.search
    
    //lorsque l'utilisateur tape quelque chose dans la barre de recherche, on met a jour le state "searchInput" de App.js
    function searchHandle (e){
        props.onSearchChange(e)
    }

    

  return (
    <Navbar  expand="lg" className=" mb-5  " variant="dark" style={{backgroundColor: '#1b1d20'}}>
  <Container fluid className='mx-0'>
    <Navbar.Brand>
      <Link to="/home">
        <LogoSvg  width="195" height="89"  style={{filter: " brightness(200%) ", position: 'relative', left : '-55px'}}/>
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll" >
      <Nav   style={{display : 'flex', justifyContent : 'center',width : '45%'}} >
            <input value={search} onChange={searchHandle} className='m-2' id="recherche" type="search" placeholder='&#128269; Search'  />
      </Nav>
      <Nav className='ms-auto'>
        <Link to="/createtournament">
        <Button className ="tournament-create-btn" variant="outline-light"  >Create a tournament</Button>
        </Link>
        <Link to="/profil">
          <p className='text-white m-2'>My profil</p>
        </Link>
      </Nav>
        
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}
