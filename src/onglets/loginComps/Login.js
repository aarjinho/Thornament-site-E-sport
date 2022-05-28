import React,{useState, useEffect, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Container, Row, Button, Alert} from 'react-bootstrap'
import { DataContext } from '../../dataContext'
import ConnexionNav from './ConnexionNav'



export default function Login() {

      const navigate=useNavigate()
      const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      const {signin, currentUser} = useContext(DataContext)
      

      //fonction qui valide email
      function validateEmail(email){
        if (email==="") return true
        return String(email)
          .toLowerCase()
          .match(
            mailFormat
          )
      }

      //diferents states pour stocké l'email, le mot de passe et erreur
      const [validated, setValidated] = useState(false);
      const [userEmail, setUserEmail] = useState("")
      const [userPassword, setUserPassword] = useState("")
      const [error, setError] = useState()


      //pour recuperer l'email 
      function handleEmail(event){
        setUserEmail(event.target.value)
      }
      
      //pour recuperer le mot  de passe
      function handlePassword(event){
        setUserPassword(event.target.value)
      }
  
      //pour valider le formulaire
      function validate(event){
        event.preventDefault();
        event.stopPropagation()
        setValidated(true);
      }
      
      //si deja connecté à un compte
      useEffect(()=>{    
      if(currentUser){ 
        navigate("/myhome") //on va a /myhome
      }
    },[currentUser])
    

      async function handleLogin(){ //fonction pour se connecter

        if(!validateEmail(userEmail)) return //si l'email n'est pas valide, on sors de la fonction

        //on tente la connexion
        try{
          await signin(userEmail,userPassword)
          navigate("/myhome")
        }
        //si erreur, on l'affiche
        catch (error) {
          setError(<Alert style={{width : "70%",}} variant='danger'>{error.code}</Alert>)
        }
      }
  
      return (
        <Container fluid style={{backgroundColor : "#19191B", height : "100vh"}}>
              <ConnexionNav />
        <div style={{display : "flex", justifyContent : "center", gap : "5px", flexDirection  : "column"}}> 
          <h1 style={{textAlign : "center", color : "white"}}>LOGIN</h1>

          <Container fluid style={{ display : "flex", justifyContent : "center"}}>
            <Form validated={validated} onClick={validate} style={{color : "white"}}  >
            <Row className="mb-3 justify-content-center" style={{maxWidth : "500px"}}>
            <Row className="justify-content-center" xs = "2" style={{width : "80%"}}>
              {error}
            </Row>
              <Form.Group >
                <Form.Label >Email</Form.Label>
                <Form.Control
                  className='mb-3 text-white'
                  onChange={handleEmail}
                  required
                  type="email"
                  placeholder="Email"
                  />
                  { !validateEmail(userEmail) && <p style={{width : "60%",color : "rgba(255,0,0,0.7)", margin : "10px -50px 10px 0px"}}> Please enter a valid email address </p> }
              </Form.Group>

              <Form.Group >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className='text-white'
                  required
                  onChange={handlePassword}
                  type="password"
                  placeholder="Password"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row className="justify-content-center" xs = "5">
                  <Button onClick={handleLogin}>Login</Button>
                </Row>
                  <p  className = "mt-5" style={{textAlign : "center"}}>You dont have an account yet ? <Link to="/signup">Sign Up</Link></p>
                </Form>
            </Container>
       </div>
      </Container>
      );
    }
    
