import React from 'react'
import {Card} from 'react-bootstrap'

export default function GameCard(props) {
  return (
    <Card  className=" ms-3 mb-5 tournois-card " bg="dark" text = "white" style={{ width: '18rem', border: 'none', boxShadow : '0px 1px 3px 1px rgba(255,255,255,0.22)', borderRadius: '25px',overflow: 'hidden'}}>
    <Card.Img src ={props.picture} />
    <Card.Body>
        <Card.Title>{props.title}</Card.Title>
    </Card.Body>
    </Card>
  )
}
