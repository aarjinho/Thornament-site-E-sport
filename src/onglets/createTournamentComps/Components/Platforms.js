import React,{useState} from 'react'
import { Form} from 'react-bootstrap'

function Platforms({game}) {

  const [SelctedPlatform, SetSelctedPlatform] = useState("")
  function  HandleChange(e){
  const selected=e.target.value
  SetSelctedPlatform(selected)}

  return (
    <div className="mt-3" onChange={HandleChange}>
         {game.Platforms?.map(game => <Form.Check inline type="radio" name="group2"  value={game} key={game} label={game}/> )}
         <p>{SelctedPlatform}</p> 
    </div>
  )
}

export default React.memo(Platforms)