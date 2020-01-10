import React from 'react'
import {withRouter} from 'react-router-dom'
import './Card.css'

const Card = (props) => {

  const goToArticle = () => { 
    props.history.push('/article/'+props.id)
  }

  return (
    <div className="card-wrapper" onClick={goToArticle}>
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

export default withRouter(Card)