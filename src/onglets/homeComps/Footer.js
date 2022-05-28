import React from 'react'
import {Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap'
import { ReactComponent as LogoSvg } from './utils/logo.svg';

export default function Section1() {
return (
<>
    <Row style={{backgroundColor : 'black' , height : '220px',width : '100%', alignItems : 'center' }}>
                <Col className='text-white col-9' style={{paddingLeft : '6%', fontFamily : 'antonio'}}>
                <h1>Contact us</h1>
                </Col>
                <Col className='col-2' >
                <Button className='home-contact'>Contact us</Button>
                </Col>
            </Row>
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
)}