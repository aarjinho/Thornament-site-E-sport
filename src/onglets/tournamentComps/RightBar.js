import React , {useContext} from 'react'
import { Dropdown } from 'react-bootstrap'
import { DataContext } from '../../dataContext'


export default function RightBar(props) {

    //le style des petite images du filtre jeux
    const gameFilterStyle =
    {   width : "65px",
        height : "auto",
        borderRadius : "10px",
        cursor : "pointer",
        objectFit : "cover"
         }

    //fonctions pour filtrer (on utilise les fonctions qu'on a envoyé en tant que props dans App.js)
    function dateClickHandler(e) {
        props.dateHandler(e)
    }
    function platformClickHandler(e) {
        props.platformHandler(e)
    }
    function formatClickHandler(e) {
        props.formatHandler(e)
    }
    function gameClickHandler(e) {
        props.gameHandler(e)
    }
    
    const {games}=useContext(DataContext) //on recupere les données de la collection "Jeux" grace à dataContext


  return (
    
    <div >
        <h4 className='text-white mb-5'>Filter By</h4>
        <div>

        <Dropdown className="mb-4 border border-2 border-light "style={{width: 'fit-content', borderRadius : '8px'}}>
            <Dropdown.Toggle  variant="dark">
            {props.date}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
                <Dropdown.Item className="dateFilter" onClick={dateClickHandler} >Date</Dropdown.Item>
                <Dropdown.Item className="dateFilter" onClick={dateClickHandler}>Today</Dropdown.Item>
                <Dropdown.Item  className="dateFilter" onClick={dateClickHandler}>This week</Dropdown.Item>
            </Dropdown.Menu>  
        </Dropdown>

        <Dropdown className="mb-4 border border-2 border-light "style={{width: 'fit-content', borderRadius : '8px'}}>
            <Dropdown.Toggle  variant="dark">
            {props.platform}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
                <Dropdown.Item className="platformFilter" onClick={platformClickHandler}  >Platform</Dropdown.Item>
                <Dropdown.Item className="platformFilter" onClick={platformClickHandler}>PC</Dropdown.Item>
                <Dropdown.Item className="platformFilter" onClick={platformClickHandler}>Playstation</Dropdown.Item>
                <Dropdown.Item className="platformFilter" onClick={platformClickHandler}>Xbox</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="mb-4 border border-2 border-light "style={{width: 'fit-content', borderRadius : '8px'}}>
            <Dropdown.Toggle  variant="dark">
            {props.format}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
                <Dropdown.Item className="formatFilter" onClick={formatClickHandler} >Format</Dropdown.Item>
                <Dropdown.Item className="formatFilter" onClick={formatClickHandler} >1v1</Dropdown.Item>
                <Dropdown.Item className="formatFilter" onClick={formatClickHandler}>2v2</Dropdown.Item>
                <Dropdown.Item className="formatFilter" onClick={formatClickHandler}>3v3</Dropdown.Item>
                <Dropdown.Item className="formatFilter" onClick={formatClickHandler}>4v4</Dropdown.Item>
                <Dropdown.Item className="formatFilter" onClick={formatClickHandler}>5v5</Dropdown.Item>
                
            </Dropdown.Menu>
        </Dropdown>
        </div>
        <h5 className='text-white'>Games</h5>
        <div className='d-flex game-filter-ctnr' style={{flexWrap: 'wrap'}}>
            {games?.map(game => <img  key={game.Title} alt={game.Title} src ={game.Picture} className='me-2 my-3 game-filter' style={gameFilterStyle} onClick={gameClickHandler}/>)}
        </div>
    </div>
  )
}
