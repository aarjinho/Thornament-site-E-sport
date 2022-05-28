import React from 'react'
import {Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap'
import { ReactComponent as LogoSvg } from './utils/logo.svg';
export default function Section3() {
  return (
    <>
        <Container fluid>
            <Row className='home-containergirlimg' md={12} style={{ backgroundSize : '50%', display: 'flex',backgroundPosition : 'bottom right',backgroundRepeat: 'no-repeat',height:'900px', backgroundImage : `url(${require("./utils/girl.png")})`}}>
                    <h1 style={{textAlign : 'center', color : 'white',fontSize : '350%', fontFamily : 'antonio', fontWeight : 'bold', }}>What are you waiting for? Go play<br /> some games!</h1>
                    <Col className='home-texte1 pt-5 col-5'>
                        <h1 style={{fontSize : '55px', fontFamily : 'antonio', fontWeight : 'bold'}} className='text-white'>Tournaments for everyone.</h1>
                        <h1 style={{fontSize : '25px', fontFamily : 'antonio', fontWeight : 'bold'}} className='text-white'>Free tournament for players of all skills-<br />
                        levels in the best e-sports games.</h1>        
                    </Col>
                    <Col className='pl-3'>
                    <img className='home-gameStatistic' src={require ('./utils/classement.png') } style={{height : '60%', width : '60%' }}/>
                    </Col>
            </Row>
        </Container>
        <Container fluid>
            <div className='home-containerBrands' >
                <h1 className='text-white text-center' style={{fontSize : '300%'}}>BRANDS WE'VE WORK WITH </h1>
                    <div className='home-Brands' style={{paddingLeft : '4%'}}>
                        <Col>
                            <img src={require ('./utils/riotgames.jpg') } style={{borderRadius : '8px' }} />
                        </Col>
                        <Col>
                            <img src={require ('./utils/xbox.jpg') } style={{borderRadius : '8px' }} />
                        </Col>
                        <Col>
                            <img src={require ('./utils/Steam.jpg') } style={{borderRadius : '8px'}} />
                        </Col>
                    </div>
            </div>
        </Container>
        <Navbar className='col-9 home-navContact' style={{backgroundColor : 'rgb(22,25,27)' ,width : '100%', height : '220px', alignItems : 'center' }}>
            <Col className='text-white col-9' style={{paddingLeft : '6%', fontFamily : 'antonio'}}>
            <h1>Want to reach us?</h1>
            </Col>
            <Col className='col-3' >
            <Button className='home-contact'>Contact us</Button>
            </Col>

        </Navbar>

        <Navbar style={{backgroundColor : 'black'}}>
            <Container fluid className='ms-0 me-5' >
                <Navbar.Brand href="#home" >
                <LogoSvg  className="d-inline-block align-top" width="250" height="120" style={{position: 'relative', left : '15%'}}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse  id="basic-navbar-nav">
                <Nav className='ms-auto ' style={{position: 'relative', left : '-15%' }} >
                    <Nav.Item className='me-5'>
                    <a href ='#home' className='m-2 text-white '>Privacy Policy</a>
                    </Nav.Item>

                    <Nav.Item className='me-5'>
                    <a href ='#home' className='m-2 text-white'>Terms and Conditions</a>
                    </Nav.Item>

                    <Nav.Item className='me-5'>
                    <a href ='#home' className='m-2 text-white '>© 2021 Thornament,All Rights Reserved</a>
                    </Nav.Item>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    </>
  )
}
