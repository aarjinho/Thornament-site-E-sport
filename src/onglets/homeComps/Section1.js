import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

export default function Section1() {
  return (
    <>
    <div id='rectangle1'></div>
    <div id='rectangle2'></div>
    <Container fluid className='home-mainContainer'>
        <Row className='home-playerimg' style={{ zIndex : '1',backgroundSize : '30%', display: 'flex',backgroundPosition : '80% 70%',backgroundRepeat: 'no-repeat',height : '600px', backgroundImage : `url(${require("./utils/joueur.png")})`}}>
            <Col md={12} style={{paddingTop : '8%'}} >
              <div style={{margin:'auto 0',width : '60%'}} className='home-container1'>
                <h1 style={{fontSize : '450%', fontFamily : 'antonio', fontWeight : 'bold',width : '80%' }} className='text-white'>PLAY AND HOST ESPORT COMPETITIONS</h1>
                <Row className='col-8 home-buttonsmain' style={{paddingTop : '7%', zIndex:"1"}}>
                 <Col >
                    <Button className='home-play'>Play Tournament</Button>
                  </Col>
                  <Col >
                    <Button className='home-create'>Create Tournament</Button>
                  </Col>
                  
                </Row>
              </div>
            </Col>   
        </Row>
        
    </Container>
    
    </>
  )
}