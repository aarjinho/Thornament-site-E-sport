import React from 'react'
import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import { ReactComponent as LogoSvg } from './utils/logo.svg';

export default function HomeNav() {
  return (
    <>
    
  {/* Navbar d'acceuil  */}

  <Navbar  variant="dark" expand='lg'>
  <Container fluid className='ms-0 me-5'>
    <Navbar.Brand href="#home" >

      {/* notre logo de Thournament */}

    <LogoSvg  className="d-inline-block align-top" width="230" height="120" style={{position: 'relative', left : '10%'}}/>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />

    {/* les deux boutons login et sign up */}

    <Navbar.Collapse  id="basic-navbar-nav">
      <Nav style={{marginLeft : '70%'}}>
        <Nav.Item className='me-5 '>
        <Button className='m-2 text-white home-login '>LOGIN</Button>
        </Nav.Item>
        <Nav.Item>
        <Button className='text-white m-2 home-sign'>SIGN UP</Button>
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  </Container>
  </Navbar>
  
    </>
  )
}
