import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../dataContext'
import TournamentNavbar from '../tournamentComps/TournamentNavbar'
import TournamentCard from '../tournamentComps/TournamentCard'
import LeftBar from '../tournamentComps/LeftBar'
import { Container, Row, Col } from 'react-bootstrap'
import "./myhome.css"

export default function MyHome() {


  const navigate = useNavigate() //pour naviguer entre les pages
  const {currentUser, getUserTable, tournaments, games} = useContext(DataContext) //on recup des fonctions et données du Context Provider
  const refs = getUserTable(currentUser?.email)?.Tournaments //Recupere la liste des ids des tournois d'un utilisateur
  const data = refs?.map( ref=> getTournament(ref) ) //les tournois en eux meme

  
  useEffect(() => {
    if (!currentUser){ //si pas de session en cours, on ne peut pas acceder a myHome
      navigate("/login")}
  },[currentUser, navigate])
  
  //state pour fonction recherche
  const [searchInput, setSearchInput] = useState("")

  //fonction pour recherche
  function searchHandle (e){
      var lowerCase = e.target.value.toLowerCase();
      setSearchInput(lowerCase);
  }

  //on regarde d'abord si l'utilisateur recherche avec la barre de recherche
  const filteredData = data?.filter((el) => { 
    if (searchInput === '') {
        return el
    }
    else {
        return el.Title.toLowerCase().includes(searchInput)
    }
  })

  //renvoi les données d'un tournoi à partir d'une id d'un tournoi
  function getTournament(id){
    if(tournaments === undefined) return 
    let res
    tournaments.map(tournoi =>{ 
        if(tournoi.id === id){
          res = tournoi}
        } )
        return res
  }

    //fonction qui renvoi l'url d'une image associé à un nom de jeu. Utile pour afficher l'image sur les cards
    //exemple getGamePicture("Counter-Strike GO") renverra une url pour son image
  function getGamePicture(gameTitle){
    if(games === undefined) return
    let res
    games.map(game =>{ 
        if(game.Title === gameTitle){
            return res = game }
        } )
        return res
    }

  return (
    <Container fluid  className="myhome-body" style={{backgroundColor: '#212529', minHeight : "100vh" }}>
      <Row>
        <TournamentNavbar search = {searchInput} onSearchChange={searchHandle} />
      </Row>
      <Row>
        <Col lg={3} > 
          <LeftBar />
        </Col>

        <Col>
          <h1 className="mb-5" style={{textAlign : "center"}}>Find all your tournaments here</h1>
          <h3>tournaments that I have joined</h3>
          <div>
            {filteredData?.length === 0 && <p style={{color :"gold"}}>We can't find that tournament in your profil :&#40;</p>}
            {refs && filteredData?.map( tournoi => <TournamentCard key={tournoi.Title} el={tournoi} flag ={getGamePicture(tournoi.Game)} isJoined = {true} /> )}
          </div>
          <h3>tournaments that I have created </h3>
          <div>
          </div>

        </Col>
      </Row>
    </Container>
  )
}
