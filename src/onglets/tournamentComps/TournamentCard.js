import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button,Card,  Badge} from 'react-bootstrap'

export default function TournamentCard(props) {

    //fonction qui verifie quelle image doit on donner pour la plateforme du tournoi 
    function platImageGiver () { 
      if (props.el.Platform.includes("Playsation")) return "./images/play.png"
      else if (props.el.Platform.includes("Xbox")) return "./images/xbox.png"
      else return "./images/pc.png"
    }
    const platImage = platImageGiver()

    //fonction pour transformer secondes en objet Date javascript puis renvoyer en chaine de caractere le mois jour année et heure de la date
    function toDateTime(secs) {
      var t = new Date(1970, 0, 1)
      t.setSeconds(secs)
      return t.toString().slice(4,21)
  }

  return (


    <Card  className=" mb-5 tournois-card " bg="dark" text = "white" style={{ width: '18rem', border: 'none', boxShadow : '0px 1px 3px 1px rgba(255,255,255,0.22)', borderRadius: '25px',overflow: 'hidden'}}>
    <Card.Img src = {props.flag.Flag} />
    <Card.Body>
        <Card.Title> {props.el.Title} </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{toDateTime(props.el.Date.seconds)}</Card.Subtitle>  

        <Card.Footer>
            <div className = "d-flex justify-content-between align-items-center " >
              <img src={require(''+platImage)}  style={{borderRadius : "50%"}}width="25px" height="25px" alt=""/>
                <div style={{marginLeft : '-1rem'}}>
                    {props.el.Participants.length} <small className="text-muted">Participants</small>
                </div>
            { props.isJoined ? <Badge style={{lineHeight : '2', borderRadius : '10px', width : '35%'}} bg="secondary"> <span className="me-2"> &#10003; </span> Joined </Badge> :  <Button style={{borderRadius : '10px', width: '35%', marginTop : "-6px"}}>Join</Button> }
            </div>
        </Card.Footer>
    </Card.Body>
    </Card>

  )
}
