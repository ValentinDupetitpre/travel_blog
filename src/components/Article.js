import React, {useState, useEffect} from 'react'

import './Article.css'
import articleService from '../services/articles'

const Article = (props) => {
    const id = props.match.params.articleId
    const article = articleService.useArticle(id)
    const mainPic = articleService.useTopPicture(id, 'main')
    const leftPic = articleService.useTopPicture(id, 'left')
    const rightPic = articleService.useTopPicture(id, 'right')

    return (
        <div className="article-wrapper">
            <header className="article-pics">
                <img className="img" src={leftPic ? leftPic : undefined} alt={undefined}/>
                <img className="img" src={mainPic ? mainPic : undefined} alt={undefined}/>
                <img className="img" src={rightPic ? rightPic : undefined} alt={undefined}/>
            </header>
            <section className="article-text">
                <h2>{article.title}</h2>
                <p>{article.content}</p>
            </section>
        </div>
    )
}

export default Article