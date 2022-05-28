import React , {useState, useContext, useEffect} from 'react'
import { useSearchParams } from "react-router-dom";
import './Toornament.css'
import { DataContext } from '../../../dataContext'
import { Container,Col,Row,Button,Stack, Card,ListGroup,Tabs,Tab} from 'react-bootstrap'
import ListParticipants from './ListParticipants'
import { getFirestore, collection, query, getDocs } from 'firebase/firestore'



function Toornament() {

const currentUser = "rdgdrg@yahoo.fr"
const {tournaments,users,getbyid}=useContext(DataContext)
const currentToornament2 = getbyid("3kAYq05VOqR4Hkv8EAM3")
const currentToornament = tournaments?.[0]
console.log(currentToornament)
//console.log(currentToornament2)
/*
if(idd){
const cityRef = doc(db,'User',"eAEPgwxfy2CN6fKeQwlP");

async function tt(){
    await updateDoc(cityRef, {
        Tournois: ["salu","toi","moi","kk"],
       });
}tt()
}*/
const [searchParams, setSearchParams] = useSearchParams(); 
console.log(searchParams.get("id"))
const nameToornament = currentToornament?.Title //Nom du Tournoi
const Rules = currentToornament?.Rules //Nom du Tournoi
const Organizer = currentToornament?.Organiser //Oganisateur  du Tournoi
const cashPrize = currentToornament?.Recompense //Nom du Tournoic
const Format= currentToornament?.Format
const Platform= currentToornament?.Platform
const Date= currentToornament?.Date
const Participants= currentToornament?.Participants
const Teams= currentToornament?.Teams
const Capacity =  currentToornament?.Capacity

const[currentTeam, SetcurrentTeam] = useState("")
const[userGamertag, SETuserGamertag] = useState("")


const [rightPassword, setRightPassword] = useState(false)
  const [typedPassword, setTypedPassword] = useState("")
  const [error, setError] = useState("")
  const password = "123456"
  const isPrivate = true

  function handlePassword(e){
    setTypedPassword(e.target.value)
  }
  function checkPassword(){
    if(typedPassword !== password){
      setError("wrong password")
    }
    setRightPassword(typedPassword === password)
  }

function getTeam(Obj, currentMail) { // une fonction qui permet recuprer l'equipe de l'utilsateur connecter 

    for(let key in Obj){
      let team = key
      let arr = Obj[key]
      for(let el in arr){
          if(arr[el]?.email === currentMail ){
              SetcurrentTeam(team)
              break;
          }
        }
      }    
}

function Checkjoin(Obj, currentMail) { //fonction qui permet de verifer si l'utilisateur est deja inscrit au tournoi

  for(let key in Obj){
    let arr = Obj[key]
    for(let el in arr){
      if(arr[el]?.email === currentMail ){
          return true
      }
    }
  }
  return false  
}
const [Startvisible, setStartvisible] = useState(true)
function start(){
  setStartvisible(false)
}
function printButton(user,team,Organiser){
    if(Checkjoin(team,user)){
        if(user===Organiser){
          return((Startvisible ? <div><Button>Leave</Button> <Button onClick={start}>Start</Button></div> : <div><Button>Leave</Button></div>))
        }
        return(<div><Button>Leave</Button></div>)
    }else{
      if(user===Organiser){
        return((Startvisible ? <div><Button>Join</Button> <Button onClick={start}>Start</Button></div> : <div><Button>Join</Button></div>))
      }
      return(<div><Button>join</Button></div>)
    }
}

useEffect(()=>{ 
    getTeam(Teams,currentUser)
    console.log(currentTeam);
},[currentToornament,currentTeam])

  return (
    <Container  className='border border-primary'>
      {isPrivate ? rightPassword ? <>
      <Col>
        <Row className='border border-warning mt-3'>
          <Col>
            <h2>{nameToornament}</h2>
            <Stack direction="horizontal" gap={3}>
              <div>First item</div>
              <div>Second item</div>
            </Stack>
          </Col>
          <Col>
          {printButton(currentUser,Teams,Organizer)}
          </Col>
        </Row>
        <Row className='border border-danger mt-3 '>
          <Col>
            <h4>Info</h4>
            <Stack direction="horizontal" gap={3}>
              <Card>{Format}</Card>
              
              <Card>{Platform}</Card>
            </Stack>
          </Col>
        </Row >
      </Col>
      <Tabs
        defaultActiveKey="Info"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Info" title="Home">
        <ListParticipants Object={Participants} />
        </Tab>
        <Tab eventKey="Rules" title="Rules">
          <p>Salur</p>
        </Tab>
        <Tab eventKey="Cash Prize" title="Cash Prize" >
          <p>cava</p>
        </Tab>
        <Tab eventKey="Bracket" title="Bracket" >
          <p>Bracket</p>
        </Tab>
      </Tabs>
      </> : 
      <>
      <label>Enter the password</label>
      <input id="input1" type="password" onChange={handlePassword} value={typedPassword}/>
      <button onClick={checkPassword}>Confirm</button>
      <p style={{color : "red"}}>{error}</p>
      </> :
      <h1>pas de mdp requis</h1>}
    </Container>
  )
}

export default React.memo(Toornament)