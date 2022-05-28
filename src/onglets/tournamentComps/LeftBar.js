import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faGamepad, faEarth} from '@fortawesome/free-solid-svg-icons'
import {Link, useLocation} from 'react-router-dom'

export default function LeftBar() {

  const location = useLocation();

  const active = { //style pour montrer sur quel onglet on est
    border : '1px solid rgba(255,255,255,1)',
    borderRadius : '50%', 
    padding : '5px'
  }

  const inactive = { //style pour montrer sur quel onglet on est pas
    borderRadius : '50%', 
    padding : '5px',
    border : '1px solid rgba(255,255,255,0.20)'
  }

  const linkStyle = { //style des liens
    fontSize : "22px",
    textDecoration : 'none',
     color : 'white',
     fontFamily : '"antonio", sans-serif',
  } 

  return (
    <Container style={{color:'white'}} className = "tournament-leftbar-ctnr">
        <Row>
            <Col md={12} className="mb-5">
               <Link to="/myhome" style={linkStyle} className=" leftbar-item">
                 <span className='me-2' style={location.pathname === "/myhome" ? active : {inactive}}><FontAwesomeIcon icon={faEarth} /></span>
                    My Home
               </Link>
              </Col>
            <Col md={12} className="mb-5 ">
               <Link to="/tournament" style={linkStyle} className=" leftbar-item">
                 <span className='me-2' style={location.pathname === "/tournament" ? active : {inactive}}><FontAwesomeIcon icon={faTrophy} /></span>
                    Tournaments
               </Link>
              </Col>
            <Col md={12} className="mb-5 ">
               <Link to="/games" style={linkStyle} className=" leftbar-item">
                 <span className='me-2' style={location.pathname === "/games" ? active : {inactive}}><FontAwesomeIcon icon={faGamepad} /></span>
                    Games
               </Link>
              </Col>
        </Row>
    </Container>
  )
}
