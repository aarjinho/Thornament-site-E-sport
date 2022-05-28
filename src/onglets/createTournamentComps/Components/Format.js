import React, { useState } from 'react'
import {Form } from 'react-bootstrap'



function Format({game}) {
  const [SelctedFormat, SetSelctedFormat] = useState("")
  function  HandleChange(e){
  const selected=e.target.value
  SetSelctedFormat(selected)
}

    return (
      <Form onChange={HandleChange}>
        <div key={`inline-radio`} className="mt-3">
          {game.Formats?.map(el => <Form.Check inline type="radio" id="custom-radio" value={el} name="group1" key={el} label={el} />)}
        </div>
        <p>{SelctedFormat}</p>
      </Form>
    )
}


export default  React.memo(Format)