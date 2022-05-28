import { SingleEliminationBracket,Match, SVGViewer , createTheme} from '@g-loot/react-tournament-brackets';
import "./styles.css";
import React , {useState,useEffect, useContext} from 'react';
import {db} from "../../firebase-config";
import {collection, getDocs, setDoc,doc, updateDoc} from "firebase/firestore"
import { DataContext } from "../../dataContext"
import { Button } from 'react-bootstrap';


export default function ContactUs() {
  const TournoiRef = collection(db, "Tournaments")
  const {updateDocument, tournaments,users} = useContext(DataContext)

  console.log(tournaments?.[1]);
  console.log(initializeParticpants(tournaments));
  function addTournament(){
    if (tournaments===undefined) return
    // let teams=currentTournament.Teams
    let teams={
      "salut": [
          {
              "email": "123456",
              "gamertag": "123456"
          },
          {
              "email": "azda",
              "gamertag": "azd"
          },
          {
              "email": "azd",
              "gamertag": "zad"
          }
      ]
  }
    for (const [key1, value1] of Object.entries(teams)) {
      if (teams[key1]===undefined) return
      for (const [key2, value2] of Object.entries(teams[key1])) {
        addMail(value2.email)
      }
    }
  }
  console.log(users);
  console.log(addTournament());
  function addMail(email){
    if (users===undefined) return
    users.map(user=>{
      if (user.Email===email){
        // updateDocument('Users',user.id,{Tournaments : [...user.Tournaments,tournaments?.[1].id] })
        console.log(user);
        // user.Tournaments.push(currentTournament)
      }
    })
  }
  function removeTournament(email){
    let tourn=[]
    users.map(user=> {if (user.Email===email) {
      user.Tournament.map(tournament=>{
        if (tournament!==currentTournament){
          tourn.push(tournament)
        }
      })
    }
    updateDocument("Users",user.id,{Tournament : tourn})
    }
    ) 
  }

  //fonction qui mis à jour la base de données (déjà prédéfini en DataContext)
    async function update(n){
      if (n===null) return
      await updateDocument("Tournaments",tournaments?.[1].id,{Bracket : n})
    }
    console.log(tournaments?.[1].id);

  //fonction qui ajoute le gagnant à un match 
  function setWinner(winner){
    let rounds=tournaments?.[1].Bracket
    if (rounds===undefined || rounds === null) return 
    let len = Object.keys(rounds).length; 
    let lastRound=rounds[len]
    if (lastRound===undefined || lastRound === null) return 
    for(let i=0; i<lastRound.length; i++){
      let match=lastRound[i].split(', ')
      if (match.slice(0,2).includes(winner) && match[2]==='null' ) {
        lastRound[i]=(match[0]+', '+match[1]+', '+winner)
      }
    }
    return rounds
  }
  function updateBracket(team,Won){
    if (Won){
      update(newRound(setWinner(team)))
    }
    else{
      update(newRound(setWinner(opponent(team))))
    }
    
  }

  function afficheOpponent(team){

    return(opponent(team)==='you won'?<h1>Congratulations you won the tournament</h1> :(opponent(team)==='not started'? <></>:(opponent(team)==='not found'?<h1>You don't have match</h1>  :(opponent(team)!=='null')? <div>
      <h2>{team} vs {opponent(team)}</h2>
      <Button variant="success" onClick={()=>updateBracket(team, true) }>I Won</Button>
      <Button variant="danger" onClick={()=>updateBracket(team, false)  }>I Lost</Button>

    
    </div>: <h2>wait for your opponent</h2> )))
  }
  console.log(tournaments?.[1].Bracket);
  function opponent(team){
    let bracket=tournaments?.[1].Bracket
    let capa = tournaments?.[1].Capacity
    if (bracket===undefined || bracket === null) return
    let len= Object.keys(bracket).length;
    if (len===Math.log2(capa)){
      if (bracket===null || bracket=== undefined) return
      if (bracket[len][0].split(', ')[2]===team){
        return 'you won'
      }
    }
    if (len===0) return  'not started'
    let lastRound=bracket[len]
    if (lastRound===undefined || lastRound === null) return 
    for (let i=0; i<lastRound.length;i++){
      let teams=lastRound[i].split(', ')
      if (team===teams[0]){
        return teams[1]
      } 
      if (team===teams[1]){
        return teams[0]
      } 
      }
      return 'not found'
    }
  console.log(opponent('Mootez'));
  console.log(Math.log2(tournaments?.[1].Capacity));
console.log(tournaments?.[1].Bracket[1]);
//fonction qui renvoie le nouveau round dès qu'on a tous les gagnants

  function newRound(bra){
    if (bra === undefined || null ) return
    let lastRoundNumber = Object.keys(bra).length;
    let lastRound = bra[lastRoundNumber]
    let newR= []
    let players1 = lastRound?.map(match => `${match.split(', ')[0]}`)
    let players2 = lastRound?.map(match => `${match.split(', ')[1]}`)
    let winners = lastRound?.map(match => `${match.split(', ')[2]}`)
    if (winners===undefined || winners === null) return 
    if (winners.length===1) return bra
    for (let i=0;i<winners.length/2;i++){
      let firstWinner=winners[2*i]
      let secondWinner=winners[2*i+1]
      if (isMatchNull(players1[2*i],players2[2*i],firstWinner) || isMatchNull(players1[2*i+1],players2[2*i+1],secondWinner) ) return bra
      else {
      if (firstWinner==='null' || secondWinner==='null'){
        if (firstWinner==='null'){
          newR.push(firstWinner+', '+secondWinner+', '+secondWinner)
        }
        else{
          newR.push(firstWinner+', '+secondWinner+', '+firstWinner)
        }
      }
      else{
        newR.push(firstWinner +', '+secondWinner+', null')
      }
    }
  }
    let newRoundNumber = lastRoundNumber+1
    bra[newRoundNumber.toString()] = newR
  }

   
//fonction qui vérifie s'il y'a un match entre deux null

  function isMatchNull(player1,player2,winner){

      if (player1 !== 'null' && player2 !== 'null' && winner==='null'){
        return true
      }
      
      return false
      }

//fonction qui initialise le bracket avec les participants (se lance une seul fois)

  function initializeParticpants(tournament){
    if (tournament===undefined || tournament===null) return
    let participants= tournament?.[1].Participants
    if (participants===undefined || participants===null) return
    
    for(let i= participants.length;i<tournament[1].Capacity;i++){ 
      participants.push('null')
    }
    let bracket=[]
    participants.sort((a, b) => 0.5 - Math.random())
    for (let i=0;i<participants.length/2;i++){
      if (participants[2*i]==='null' && participants[2*i+1]!=='null'){
        bracket.push(participants[2*i]+', '+participants[2*i+1]+', '+participants[2*i+1])
      }
      else if (participants[2*i]!=='null' && participants[2*i+1]==='null'){
        bracket.push(participants[2*i]+', '+participants[2*i+1]+', '+participants[2*i])
      }
      else{
        bracket.push(participants[2*i]+', '+participants[2*i+1]+', null')
      }
    }

    return {1 : bracket }

  }
console.log(initializeParticpants(tournaments) );


//fonction qui renvoie le nouveau bracket avec le nouveau round

   function initializeBracket(tourn){
    if (tourn===undefined || tourn===null) return
     let capa = tourn.Capacity
     let matches = []
     let indexmatch = 1
     let indexnextmatch = capa/2+1
       for (let i=1; i<=Math.log2(capa) ;i++){
        for (let j=1; j<=Math.floor((capa/2)/i) ;j++){
          if (indexmatch===capa){
            break
          }
          matches.push(
            {id :  indexmatch ,
              nextMatchId: indexnextmatch,
              participants: [],
              tournamentRoundText : i
          })
          indexmatch++
          if (indexmatch%2 === 1){
            indexnextmatch++
          }
          if (indexmatch===capa-1){
            indexnextmatch=null
          }

        }
      }
      return matches.map(match =>updateParticipants(tourn.Bracket,match))
   }


   //fonction qui trouve le round d'un match X à l'aide de son id

    function findRoundNumber(rounds,id){
      if (rounds===undefined || rounds === null) return 
      let len = Object.keys(rounds).length; 
      for (let j = 1; j<=len ;j++){
        for (let i=1;i<=rounds[j].length;i++){
          if (id === i){
            return j
          }
        }
        id=id-rounds[j].length
      }
    }

    //fonction qui renvoie un match avec les nouveaux participants

    function updateParticipants(rounds,match){
      let roundNumber=findRoundNumber(rounds,match.id)
      let totalMatches=1
      for (let j = 1; j<roundNumber ;j++){
        totalMatches=totalMatches+rounds[j].length
      }
      
        let round=rounds?.[roundNumber]
        if (round === undefined || round === null ){
          match.participants.push()
        }
        else{
        let particip = round[match.id-totalMatches].split(', ')  

        match.participants.push({ name : particip[0] } , { name : particip[1] })}

      return match
    }
    

    //Thème du Bracket

    const WhiteTheme = createTheme({
      textColor: { main: '#000000', highlighted: '#07090D', dark: '#3E414D' },
      matchBackground: { wonColor: '#daebf9', lostColor: '#96c6da' },
      score: {
        background: { wonColor: '#87b2c4', lostColor: '#87b2c4' },
        text: { highlightedWonColor: '#7BF59D', highlightedLostColor: '#FB7E94' },
      },
      border: {
        color: '#CED1F2',
        highlightedColor: '#da96c6',
      },
      roundHeader: { backgroundColor: '#da96c6', fontColor: '#000' },
      connectorColor: '#000000',
      connectorColorHighlight: '#da96c6',
      svgBackground: '#FAFAFA',
    }); 
    
    console.log(initializeBracket(tournaments?.[1]));
    
    let matches;
    function createMatches(tournoi){
      if(tournoi === undefined || tournoi === null) return
      else{
        matches= initializeBracket(tournoi?.[1]) } 
      }
      createMatches(tournaments)
   
      console.log(tournaments?.[1].Bracket);

      function removeTeam(target){
          let res = {}
          let Teams=tournaments?.[3].Teams
          for (let el in Teams){
              if (el!==target){
                  res[el]=Teams[el]
              }
              }
           return res
        }
        
  return (
    <div  style={{width : "100vw", height : "100vh"}}>
      <div>

      {tournaments?.[1].Participants.includes('samirtt')? afficheOpponent('samirtt') :<h1>you are not participant </h1>} 
      </div>
      <button onClick={()=>updateDocument("Tournaments",tournaments?.[3].id,{Teams : removeTeam('BDS')})}>Remove</button>
      <button onClick={()=>update(initializeParticpants(tournaments))}>UPDATE</button>
      {matches? <SingleEliminationBracket  style={{width : "100%", height : "100%"}}
      theme={WhiteTheme}
      options={{
        style: {
          roundHeader: {
            backgroundColor: WhiteTheme.roundHeader.backgroundColor,
            fontColor: WhiteTheme.roundHeader.fontColor,
          },
          connectorColor: WhiteTheme.connectorColor,
          connectorColorHighlight: WhiteTheme.connectorColorHighlight,
        }}}
        matchComponent={Match}
        matches={matches}

    svgWrapper={({ children, ...props }) => (
      <SVGViewer background={WhiteTheme.svgBackground}
      SVGBackground={WhiteTheme.svgBackground}
       width={window.innerWidth*2} height={window.innerHeight*2} {...props}>
        {children}
      </SVGViewer>
    )}
  />: 
  <center>
    <progress  max="100" value="70"> 70% </progress>
  </center>

    }
    </div>
    
  )
}
