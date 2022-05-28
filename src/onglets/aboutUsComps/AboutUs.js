import React, {useState} from 'react'
export default function AboutUs() {
  const liste= [1,2,3,4]
  const [data, setData] = useState([])
  function handleChange(e){
      let x = e.target.getAttribute("data-indice")
      console.log(data);
      let temp = data
      
      if (e.target.getAttribute("data-type") === 'gamertag') {	
      
        let newData = {...data[x], name : e.target.value }
        temp[x] = newData       
        setData(temp) }
          
      else {
  
        let newData = {...data[x], email : e.target.value }
          temp[x]= newData        
        setData(temp)
      }
      
  }
  console.log(data);
  

 
          
  return (
    <div>
      {
      liste.map(i =>{ //LES PSEUDO
        return <> GAMERTAG
        <input data-indice = {i-1} data-type = "gamertag" onChange={handleChange} />
          </>          }) }
      
      {
      liste.map(i =>{ //LES EMAILS
      return <> MAIL
        <input data-indice = {i-1} data-type = "email" onChange={handleChange} />
          </>
          }) }
      

    </div>
  )
        }
