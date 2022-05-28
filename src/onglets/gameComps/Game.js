import React from 'react'
import { useLocation } from "react-router"
import { Container, Row, Col,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './game.css'



export default function Game() {

    const location = useLocation()
    const game = location.state
    console.log(game);
    //si l'utilisateur arrive sur cet onglet sans passer par l'onglet "games" on le redirige vers "games"
    if (game===null){
      return <p>There seems to be a problem, go back to the <Link to="/games">games page</Link></p>
    }
  return (
    <Container fluid className = "pt-3 game-body" style={{minHeight : "100vh", backgroundColor :"#212529"}}>
      <div className='d-flex pt-2'>
        <small ><Link  to="/games"style={{textDecoration:"none"}}> &#60;-- back to games</Link></small>
          <Link  to="/tournament" state={{filter : game.Title}} style={{marginLeft :"auto"}}>
        <Button >
        Find a tournament for this game
        </Button>
        </Link>
      </div>
      <h1 className='mb-5' style={{textAlign : "center"}}>{game.Title}</h1>
      <Row>
        <Col md={8}>
            <img style={{maxWidth:"100%"}} src={game.Flag} />
        </Col>
        <Col md={4}>
          <h3 >Gameplay</h3>
          <p >{game.Informations}</p>
          <h3 >Game Formats</h3>
          <ul>
            {game.Formats.map(format => <li>{format}</li>)}
          </ul>
          <h3>Game Platforms</h3>
            <ul>
              {game.Platforms.map(platform => <li>{platform}</li>)}
            </ul>

        </Col>
      </Row>
    </Container>
  )
}

