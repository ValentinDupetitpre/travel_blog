import React from 'react'
import {withRouter} from 'react-router-dom'
import articleService from '../services/articles'
import './Card.css'

const Card = (props) => {
  const picture = articleService.useTopPicture(props.id, 'main')

  const goToArticle = () => { 
    props.history.push('/article/'+props.id)
  }

  return (
    <div className="card-wrapper" onClick={goToArticle}>
      <div className="image-preview">
        <img src={picture ? picture : undefined} alt={picture}/>
      </div>
      <div className="text-preview">
        <h2>{props.title}</h2>
        <p className="content">{props.content}</p>
        <p className="date">{props.created}</p>
      </div>
    </div>
  )
}

export default withRouter(Card)