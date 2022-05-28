import React from 'react'
import HomeNav from './HomeNav'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
import Footer from './Footer'
export default function App() {
  return (
    // <Container fluid style={{minHeight : "100vh", backdropFilter: 'brightness(-100%) invert(100%) contrast(100%)  blur(500px)', background : 'rgb(24,4,37)', background : 'linear-gradient(118deg, rgba(24,4,37,0.8886905103838411) 33%, rgba(120,51,51,0.9930602582830007) 81%, rgba(70,56,38,0.8374300061821604) 100%)'}}>
      <>
      <div className='home-body'>
        <div className='rectangle1'></div>
        <div className='rectangle2'></div>
        <HomeNav />
          <Section1 />
          <Section2 />
          <Section3 />
      </div>
        

      </>
    
  )
}
