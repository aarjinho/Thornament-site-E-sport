import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Row ,Col , Form , Button, Container, Alert} from 'react-bootstrap'
import { DataContext } from '../../dataContext';
import ConnexionNav from '../loginComps/ConnexionNav';
import './index.css'

function App() {
    const navigate=useNavigate()
    const {signup, currentUser, addDocument} = useContext(DataContext)
    const [userData,setUserData] = useState({email : "", firstName : "", lastName : "", password : "", confirmPassword : "", pseudo : ""})
    const [error, setError] = useState()
    const [passwordValidate, setPasswordValidate] = useState()
    const [passwordConfirmation, setPasswordConfirmation] = useState()


    //A chaque fois que l'utilisateur renseigne un champ, on met à jour ses donneés
    function handleChange(e){
      let input = e.target
      switch(input.placeholder){
        case "First Name":
          setUserData(prev => ({...prev, firstName : input.value}))
          break
        case "Last Name" : 
          setUserData(prev => ({...prev, lastName : input.value}))
          break
        case "Pseudo" : 
          setUserData(prev => ({...prev, pseudo : input.value}))
          break
        case "Enter email" : 
          setUserData(prev => ({...prev, email : input.value}))
          break
        case "Password" : 
          setUserData(prev => ({...prev, password : input.value}))
          break
        case "Confirm Password" : 
          setUserData(prev => ({...prev, confirmPassword : input.value}))
          break

      }
    }

    useEffect(()=>{
      if(currentUser){ //si deja connecté
        navigate("/myhome") //on va a /myhome
      }

      if(userData.confirmPassword !== userData.password){
        setPasswordConfirmation("Passwords do not match")
      }
      else{
        setPasswordConfirmation("")
      }

      if (userData.password.length>0 && userData.password.length<6 ){
        setPasswordValidate("The password must contain at least 6 characters")
      }
      else {
        setPasswordValidate("")
      }
    },[userData.password, userData.confirmPassword, currentUser])

    async function handleSignup(){ //fonction pour s'inscrire

      for( let [key,value] of Object.entries(userData)){ //verifie si tout les champs sont complété
        if (value===""){  //si un champs est vide, on return sans s'inscrire
          setError(<Alert style={{minWidth :"100%"}} variant='danger'>All fields are required</Alert>)
          return
        }
      }

      if(passwordConfirmation!=="") return //si les 2 mots de passes ne sont pas identique, on return sans s'inscrire

      try{ //si tout est ok, on tente d'inscrire l'utilisateur
        await signup(userData.email,userData.password)
        await addDocument("User",parseData(userData))
        navigate("/myhome")
      }
      catch (error) { //si l'inscription a échoué, on affiche l'erreur
        setError(<Alert style={{minWidth :"100%"}} variant='danger'>{error.code}</Alert>)
      }
    }


    function parseData(data){
      return {
        lastName : data.lastName,
        firstName : data.firstName,
        pseudo : data.pseudo,
        email : data.email,
        tournaments : []
      }
    }

  return (

    <Container fluid style={{backgroundColor : "#19191B", minHeight : "100vh"}}>   
    <ConnexionNav />
  <Row>
    <Col  className = "signup-img" style={{minHeight : "100vh",height : "100%",backgroundSize : '100%',backgroundPosition : 'top left',backgroundRepeat: 'no-repeat', backgroundImage : `url(${require("./img2.png")})`}}>
      </Col>  
    <Col className='signup-ctnr text-white pt-0'>
      <div className='text-center'>
        <h1>Sign up</h1>
      </div>
      <Form className='signup-form pt-3'>
      {error}
      <Row>
        <Col>
          <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control required className = "text-white" placeholder="First Name" onChange={handleChange} value={userData.firstName}/>
      </Form.Group>
        </Col>
        <Col>
        
  <Form.Group className="mb-3">
    <Form.Label>Last Name</Form.Label>
    <Form.Control required className = "text-white" placeholder="Last Name" onChange={handleChange}  value={userData.lastName} />
  </Form.Group>
        </Col>
      </Row>
  <Form.Group className="mb-2">
    <Form.Label>Pseudo</Form.Label>
    <Form.Control required className='text-white' placeholder="Pseudo" onChange={handleChange}  value={userData.pseudo} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control required className='signup-form text-white' type="email" placeholder="Enter email" onChange={handleChange}  value={userData.email} />
  </Form.Group>

  <Form.Group className="mb-3 " controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control required className = "text-white" type="password" placeholder="Password" onChange={handleChange}  value={userData.password} />
    <small style={{color : "rgba(255,0,0,0.6)"}}>{passwordValidate}</small>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword2">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control required className = "text-white" type="password" placeholder="Confirm Password" onChange={handleChange}  value={userData.confirmPassword} />
    <small style={{color : "rgba(255,0,0,0.6)"}}>{passwordConfirmation}</small>
  </Form.Group>
  <Col className='signup-container' style={{alignItems : 'center'}}>
  <Button  onClick={handleSignup}>
    Sign up
  </Button>
  </Col>
</Form>
      </Col>
</Row>
    </Container>
  );
}

export default App;