import React, {useRef} from 'react'
import { Card } from 'react-bootstrap'

export default function Section2() {


    const arrowStyle=
    {fontWeight : "bold",
     backgroundColor: "#5855d0",
      fontSize : "100%",
       borderRadius : "50%"} 
    
    const cardStyleImg = {borderRadius : "20px", minHeight : "15%", minWidth : "15%" }

    function turnCarousel(e){
        const img0Ref = document.querySelector(".home-carousel-img0")
        const img1Ref = document.querySelector(".home-carousel-img1")
        const img2Ref = document.querySelector(".home-carousel-img2")
        const img3Ref = document.querySelector(".home-carousel-img3")

        if(e.target.innerText == '<'){

            img0Ref.classList.remove("home-carousel-img0")
            img0Ref.classList.add("home-carousel-img3")
            
            img1Ref.classList.remove("home-carousel-img1")
            img1Ref.classList.add("home-carousel-img0")
            
            img2Ref.classList.remove("home-carousel-img2")
            img2Ref.classList.add("home-carousel-img1")
            
            img3Ref.classList.remove("home-carousel-img3")
            img3Ref.classList.add("home-carousel-img2")
        }
        else {
            img0Ref.classList.remove("home-carousel-img0")
            img0Ref.classList.add("home-carousel-img1")
            
            img1Ref.classList.remove("home-carousel-img1")
            img1Ref.classList.add("home-carousel-img2")
            
            img2Ref.classList.remove("home-carousel-img2")
            img2Ref.classList.add("home-carousel-img3")
            
            img3Ref.classList.remove("home-carousel-img3")
            img3Ref.classList.add("home-carousel-img0")
        }
    }
        

  return (
    <div  className="py-3 pt-5 home-textecarousel" style={{textAlign : "center"}}>
        <h1 className='text-white'>Find Tournament to play</h1>
        <div className='home-carrousel' style={{display : "flex",justifyContent : 'space-between',alignItems : "center"}}>
            <div className='home-control-left'>
            <span className=' text-white home-carrouselC' style={arrowStyle} onClick={turnCarousel} >  &#60; </span>
            </div>
            <div className='home-carousel-items' style={{position : "relative", display : 'flex', minHeight : "550px", minWidth : "70%"}}> 
            <Card className='home-carousel-img1'   style={{ width: '25%', border : "none", background : "none"}}>
                <Card.Img  style={cardStyleImg}  alt="carousel1" src={require("./utils/dota.jpg")} />
            </Card>               
            <Card className='home-carousel-img2'  style={{ width: '25%', border : "none", background : "none"}}>
                <Card.Img   style={cardStyleImg} alt="carousel2" src={require("./utils/fortnite.jpg")} />
            </Card>               
            <Card  className='home-carousel-img3'  style={{ width: '25%', border : "none",background : "none"}}>
                <Card.Img   style={cardStyleImg} alt="carousel3" src={require("./utils/warzone.png")}  />
            </Card>               
            <Card  className='home-carousel-img0'  style={{ width: '25%', border : "none",background : "none"}}>
                <Card.Img   style={cardStyleImg} alt="carousel4" src={require("./utils/freefire.jpg")}  />
            </Card>               

            </div>
            <div className='home-control-right'>
            <span className='text-white home-carrouselC' style={arrowStyle} onClick={turnCarousel} > &#62;</span>
            </div>
        </div>
    </div>
  )
}
