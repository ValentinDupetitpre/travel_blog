import React from 'react'
import './Card.css'

const Card = (props) => {
  return (
    <div className="card-wrapper">
      <div className="image-preview">
        <img src={props.picture ? props.picture : undefined} alt={undefined}/>
      </div>
      <div className="text-preview">
        <h2>{props.title}</h2>
        <p>{props.content}</p>
      </div>
    </div>
  )
}

export default Card