import React from 'react'
import { ListGroup} from 'react-bootstrap'

function ListParticipants({Object}) {
  return (
    <ListGroup>
      {Object?.map(participant => <ListGroup.Item key={participant}>{participant}</ListGroup.Item>)}
    </ListGroup>
  )
}

export default React.memo(ListParticipants)