import React , {useState,useContext} from 'react'
import { Container,Col,Row,DropdownButton,Dropdown,FloatingLabel,Form,Button,InputGroup,FormControl  } from 'react-bootstrap'
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import { DataContext } from '../../../dataContext'
import './SearchBar.css'
import Platforms from './Platforms'
import Format from './Format'
import DateTimePicker from 'react-datetime-picker'


function Games() {

  //on se connecte a la collection  Jeux

  const {games,addDocument}=useContext(DataContext)

  const [searchInput, setSearchInput] = useState("") //mot cle dan sla barre de rechrche 


  function searchHandle (e){
      var lowerCase = e.target.value.toLowerCase();
      setSearchInput(lowerCase);
  }   

  //on regarde si l'utilisateur recherche avec la barre de recherche
  const filteredData = games?.filter((el) => { 
    if (searchInput === '' || searchInput === ' ') {
        return
        }
    else {
        return el.Title.toLowerCase().includes(searchInput)
    }})
    

const [GameSelect, SetGameSelect] = useState("") //jeux selectioné
const [Game, SetGame] = useState({}) //toutes les info du jeux dispo dans la db 

function SelectedGame(event,data){
    const selected = event.target.innerText
    setSearchInput(selected)
    const Gamedata = data
    SetGameSelect(selected)
    SetGame(Gamedata)
    setSearchInput(GameSelect)
    console.log(selected)

}


const [SelectedSize, SetSelectedSize] = useState("4")  // toornament size

function handleSelect(e){
    SetSelectedSize(e)}

const [Discription, SetDiscription] = useState("") // toornament Discription
function GetDiscription(e){
    const text = e.target.value
    SetDiscription(text)
}

const [Rules, SetRules] = useState("")  // toornament Rules
function GetRules(e){
    const text = e.target.value
    SetRules(text)
}

const [Prize, SetPrize] = useState("") // toornament Prize
function GetPrize(e){
    const text = e.target.value
    SetPrize(text)
}

const [Contact, SetContact] = useState("") // toornament Contact
function GetContact(e){
    const text = e.target.value
    SetContact(text)
}

const [TournamentTitle, SetTournamentTitle] = useState("") // tournament Title
function GetTournamentTitle(e){
    const text = e.target.value
    SetTournamentTitle(text)
}


const [Datetime, setDatetime] = useState(new Date()); // toornament start date and time
console.log(Datetime)



const [Chekedbox, SetChekedbox] = useState() // change le chekbox
function handleChangeChk(){
    const check = !Chekedbox
    SetChekedbox(check)
}
const [Password, SetPassword] = useState("") // tournament Password
function Getpassword(e){
    const text = e.target.value
    SetPassword(text)
}

const CurrentUser = "mootez"

const data={ // les info du tournoi
    Bracket:{},
    Capacity:parseInt(SelectedSize),
    Date:Datetime,
    Finished:false,
    Format:"",
    Full:false,
    Game:GameSelect,
    Organiser :CurrentUser,
    Participants:[],
    Password:Password,
    Discription:Discription,
    Platform:"",
    Private:Chekedbox,
    Rewards:Prize,
    Rules:Rules,
    Teams:{},
    Title:TournamentTitle,
    OrganiserContact:Contact
}

function send(){ // fonction qui ajoute le tournoi dans la db 

    if(TournamentTitle=="" || SelectedSize=="" || Contact=="" || GameSelect==""|| SelectedSize==""|| Discription==""|| Prize==""|| Rules==""){
        alert("rempli tou frere")
    }else{
        addDocument("Tournaments",data)}

}
  return (
  <Container fluid prefixes={{ color:"white" }}  className='createTournament'>
      <div className='createTournament-body'>

    
    <Row className="search" style={{position: "relative"}}> 

          <h3>Search Game</h3>
      <div className='searchInputs'>
                <input className="searchinput" type="text" placeholder="Game" onChange={searchHandle}/>
        </div>
        <Row className='createTournamentSuggestion'>
          <div className='dataResult'>
            {filteredData?.map(game => <Row className='dataItem' key={game.Title} onClick={(event) => SelectedGame(event, game)}> 
            <p>{game.Title}</p>
            </Row>)}
            </div>
        </Row>
    </Row>
    
    {(!GameSelect == "") ? <> <h5>Select Platform</h5><Platforms game={Game} /> <h5>Select Format</h5> <Format game={Game} /></> : <></> /* si le tournoi est prive , demande un password  */  }
    <div>
    <h4>Size</h4>
    <DropdownButton
    className='createTournamentDropdown'
      title={SelectedSize}
      id="dropdown-size"
      onSelect={handleSelect} >
              <Dropdown.Item eventKey="4">4</Dropdown.Item>
              <Dropdown.Item eventKey="8">8</Dropdown.Item>
              <Dropdown.Item eventKey="16">16</Dropdown.Item>
              <Dropdown.Item eventKey="32">32</Dropdown.Item>
              <Dropdown.Item eventKey="64">64</Dropdown.Item>
              <Dropdown.Item eventKey="128">128</Dropdown.Item>
    </DropdownButton>
          </div>
    <Col>
        <h4>Tournament Title</h4>
            <Form.Control  type="text" onChange={GetTournamentTitle}/>
        <h3>Description(Markdown)</h3>
        <FloatingLabel controlId="floatingTextarea2" >
            <Form.Control
            as="textarea"
            style={{ height: '150px' }}
            onChange={GetDiscription}
            />
        </FloatingLabel>
        <h3>Rules(Markdown)</h3>
        <FloatingLabel controlId="floatingTextarea2" >
            <Form.Control
            as="textarea"
            style={{ height: '150px' }}
            onChange={GetRules}
            />
        </FloatingLabel>
        <h3>Prize(Markdown)</h3>
        <FloatingLabel controlId="floatingTextarea2" >
            <Form.Control
            as="textarea"
            style={{ height: '150px' }}
            onChange={GetPrize}
            />
        </FloatingLabel>
        <h4>Contact</h4>
        <Form.Control  type="text" onChange={GetContact}/>
        <h4>Select Start date</h4>
        <DateTimePicker style={{color : "white"}} onChange={setDatetime} value={Datetime} />
    </Col>
    
    <div className='createTournamentCheckBox'>
    Private Tournament :
    <input type="checkbox" onChange={handleChangeChk} />
    </div>
    <div className='tournamentPassword'>
    {Chekedbox ? <Form.Control type="text" placeholder="Password"  onChange={Getpassword} /> : <></>}
    </div>
    <div>
    <Button onClick={send}>Create</Button>
    </div>
    </div>
  </Container>
  )
}

export default Games