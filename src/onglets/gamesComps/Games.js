import React , {useState, useContext} from 'react'
import TournamentNavbar from "../tournamentComps/TournamentNavbar"
import LeftBar from '../tournamentComps/LeftBar'
import { Container, Col, Row } from 'react-bootstrap'
import GameCard from './GameCard'
import { Link } from 'react-router-dom'
import { DataContext } from '../../dataContext'


export default function Games() {

  
  const {games}=useContext(DataContext) //on recupere les données de la collection "Jeux" grace à dataContext
  const [searchInput, setSearchInput] = useState("")

  function searchHandle (e){
      var lowerCase = e.target.value.toLowerCase();
      setSearchInput(lowerCase);
  }   

  //on regarde si l'utilisateur recherche avec la barre de recherche
  const filteredData = games?.filter((el) => { 
    if (searchInput === '') {
        return el
    }
    else {
        return el.Title.toLowerCase().includes(searchInput)
    }
})
  return (
  <Container fluid  style={{backgroundColor: '#212529', minHeight : "100vh" }}>
    <Row >
      <TournamentNavbar search = {searchInput} onSearchChange={searchHandle}  />
    </Row>
    <Row className="tournament-parentrow" style={{position: "relative"}}> 
      <Col lg={3}  >
        <LeftBar/>
      </Col>
      <Col lg={9}>
        <Row>
          <h1 className='text-white mb-5'>Explore and discover all supported games !</h1>
          {/*Affichage les jeux filtrés, si aucun resultat, affiche un petit message d'excuse */}
          {filteredData?.length === 0 && <p style={{color : 'white'}}>Sorry we can't find this game. Suggest it to us with the "contact us" form</p>}
          {filteredData?.map(game => <Col key={game.Title} > <Link style={{textDecoration : "none"}} to="/game" state = {game}> <GameCard picture={game.Flag} title={game.Title} /> </Link></Col>)}
        </Row>
      </Col>
    </Row>

  </Container>
  )
}
