import React, { useEffect, useState, useContext } from 'react'
import TournamentCard from './TournamentCard'
import LeftBar from './LeftBar'
import RightBar from './RightBar'
import { Container, Col, Row } from 'react-bootstrap'
import TournamentNavbar from './TournamentNavbar'
import { useLocation } from 'react-router-dom'
import { DataContext } from '../../dataContext'
export default function App() {

    const location = useLocation()

    const {games ,tournaments, getUserTable, currentUser} = useContext(DataContext)
    const data = tournaments
    function isJoined(id){
        if (!currentUser) return false
         else{
            let userData = getUserTable(currentUser.email)
            if(userData){
                return userData.Tournaments.includes(id)
            }
            else {
                return false
            }
         }
    }
//----Creation du State sa fonction pour la barre de recherche )----
// on doit creer les states ici et les envoyer en props car c'est App.js qui gere l'affichage des "tournament cards"
    const [searchInput, setSearchInput] = useState("")

    function searchHandle (e){
        var lowerCase = e.target.value.toLowerCase();
        setSearchInput(lowerCase);
    }   
    
    //----Creation des differents States et leur fonctions pour les filtres---------
    const [dateFilter, setDateFilter] = useState("Date")
    const [platformFilter, setPlatformFilter] = useState("Platform")
    const [formatFilter, setFormatFilter] = useState("Format")
    const [gameFilter, setGameFilter] = useState("Any")
    

    useEffect( () => location.state !==null && setGameFilter(location.state.filter),[location.state]) //on applique le filtre donné par l'onglet "Game" d'un jeu (si il existe)
    
    useEffect(()=>{
        const gameFilters = document.querySelectorAll(".game-filter")
        //ajoute un style bordure blanche au filtre game actif
        gameFilters.forEach(filter => (filter.alt === gameFilter) ? filter.classList.add("game-filter-active") : filter.className='me-2 my-3 game-filter' )

    },[gameFilter,games])
    

    //fonctions qui s'occupent de changer les States des filtres
    function dateClickHandler(e){
        setDateFilter(e.target.innerText)      
    }
    function platformClickHandler(e){
        setPlatformFilter(e.target.innerText)    
    }
    function formatClickHandler(e){
        setFormatFilter(e.target.innerText)      
    }

    function gameClickHandler(e){
        if(e.target.alt === gameFilter){ //si la cible est le filtre courrant, alors on le desactive ( en le mettant sur "Any")
            setGameFilter("Any")
            e.target.classList.remove("game-filter-active")
        }
        else{
            setGameFilter(e.target.alt)

        }
    }

    //fonction pour transformer seconde en objet Date javascript
    function toDateTime(secs) {
        var t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        return t;
    }

    //fonction de stackoverflow pour tester si une date est ajourd'hui
    function isToday(someDate) {
        const today = new Date()
        return someDate.getDate() === today.getDate() &&
          someDate.getMonth() === today.getMonth() &&
          someDate.getFullYear() === today.getFullYear()
      }

      //fonction de stackoverflow pour tester si une date est dans la semaine
      function isThisWeek(date) {
        const todayObj = new Date();
        const todayDate = todayObj.getDate();
        const todayDay = todayObj.getDay();
      
        // get first date of week
        const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
      
        // get last date of week
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
      
        // if date is equal or within the first and last dates of the week
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
      }


     //1 on regarde d'abord si l'utilisateur recherche avec la barre de recherche
    const filteredData = data?.filter((el) => { 
        if (searchInput === '') {
            return el
        }
        else {
            return el.Title.toLowerCase().includes(searchInput)
        }
    })

    //2 on regarde ensuite le filtre date
    const dateFilteredData = filteredData?.filter(el => { 
        if(dateFilter === 'Date'){ //si pas de filtre on renvoi tout les tournois
            return el
        }
        else{ //si il y a un filtre
            if(dateFilter === "Today"){ //si filtre à "today", on renvoi tournois prevu aujourd'hui
                return isToday(toDateTime(el.Date.seconds))
            }
            else{ //sinon on renvoi les tournois prevu cette semaine
                return isThisWeek(toDateTime(el.Date.seconds))
            }
        }
    })

    //3 on regarde ensuite le filtre format
    const formatFilteredData = dateFilteredData?.filter(el => { 
        if(formatFilter === 'Format'){ //si pas de filtre on renvoi tout les tournois
            return el
        }
        else{
            return el.Format.includes(formatFilter)//si il y a un filtre, on renvoi les tournois filtrés
        }
    })

    //4 on regarde finalement le filtre platform
    const platformFilteredData = formatFilteredData?.filter(el => { 
        if(platformFilter === 'Platform'){  //si pas de filtre on renvoi tout les tournois
            return el
        }
        else{
            return el.Platform.includes(platformFilter) //si il y a un filtre, on renvoi les tournois filtrés
        }
    })

    //5 enfin le filtre des jeux, on obtient alors  une liste des tournois entierement filtrés
    const fullFilteredData = platformFilteredData?.filter(el =>{
        if(gameFilter === "Any"){  //si pas de filtre on renvoi tout les tournois
            return el
        }
        else {
            return el.Game.includes(gameFilter) //si il y a un filtre, on renvoi les tournois filtrés
        }
    })

    //fonction qui renvoi l'url d'une image associé à un nom de jeu. Utile pour afficher l'image sur les cards
    //exemple getGamePicture("Counter-Strike GO") renverra une url pour son image
    function getGamePicture(gameTitle){
        if(games === undefined) return
        let res
        games.map(game =>{ 
            if(game.Title === gameTitle){
                res = game }
            } )
            return res
        }


    return (
        <Container fluid  style={{backgroundColor: '#212529', minHeight : "100vh" }}>
          <Row  >
            <TournamentNavbar search = {searchInput} onSearchChange={searchHandle}  />

          </Row>

            <Row className="tournament-parentrow" style={{position: "relative"}}>

            <Col lg={3}  >
                <LeftBar/>
            </Col>

            <Col lg={6} className="order-1 order-lg-0" >

                <Container>
        
                    <Row>
                        <Container  className="d-flex bg-primary mb-4" style={{position :"relative",minHeight: "120px",overflow : "visible", borderRadius : "25px"}}>
                            <img className='trophy-img' src={require("./images/trophy.png")} alt="trophy" style={{position : "absolute",left: '-15px', width :"165px", top :"-25px", zIndex: "2"}} />
                            <h3 className= "my-4" style={{margin : 'auto' ,textAlign :"center", color : 'white',  width : "45%"}}>Many tournaments are waiting for you</h3>
                        </Container>
                        {/*Affichage des tournois entierement filtrés, si aucun resultat, affiche un petit message d'excuse */}
                        {fullFilteredData?.length === 0 && <p style={{color : 'white'}}>Can't find a tournament that suits you ? Create yours easily, it's free !</p>}
                    {games && (fullFilteredData?.map(tournoi => <Col key={tournoi.Title}> <TournamentCard flag = {getGamePicture(tournoi.Game)} isJoined={isJoined(tournoi.id)} el={tournoi} /> </Col>)  )}
                    </Row>

                </Container>

            </Col>

            <Col lg={2}  >
                <RightBar date={dateFilter} platform={platformFilter} format={formatFilter} dateHandler={dateClickHandler} platformHandler={platformClickHandler} formatHandler={formatClickHandler} gameHandler = {gameClickHandler} />
            </Col>

            </Row>

      </Container>

  )
}
