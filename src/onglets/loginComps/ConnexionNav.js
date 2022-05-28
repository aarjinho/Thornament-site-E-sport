import React from 'react'
import { ReactComponent as LogoSvg } from '../homeComps/utils/Thornamentlogo.svg'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'


export default function ConnexionNav() {
  return (
    <div style={{textAlign : "start", display :"flex", justifyContent : "space-between", alignItems : "center"}}>
        <Link to="/home">
            <LogoSvg style={{width : "max(20%, 300px)"}}/>
        </Link>
        <div className='text-white'>
            <Link to="/login">
                <Button className='m-2' variant = "outline-light" >Login</Button>
            </Link>
            <Link to="/signup">
                <Button className='m-2' variant = "outline-light" >Signup</Button>
            </Link>
        </div>
    </div>    
)
}
