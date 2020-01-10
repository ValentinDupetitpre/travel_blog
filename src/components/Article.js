import React, {useState, useEffect} from 'react'

import './Article.css'
import articleService from '../services/articles'

const Article = (props) => {
    const article = articleService.useArticle(props.match.params.articleId)

    return (
        <div className="article-wrapper">
            <header className="article-pics">
                <img className="img" src={article.leftPicture ? article.leftPicture : undefined} alt={undefined}/>
                <img className="img" src={article.mainPicture ? article.mainPicture : undefined} alt={undefined}/>
                <img className="img" src={article.rightPicture ? article.rightPicture : undefined} alt={undefined}/>
            </header>
            <section className="article-text">
                <h2>{article.title}</h2>
                <p>{article.content}</p>
            </section>
        </div>
    )
}

export default Article