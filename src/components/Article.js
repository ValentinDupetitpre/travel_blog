import React, {useEffect} from 'react'

import './Article.css'
import articleService from '../services/articles'

const Article = (props) => {
    const id = props.match.params.articleId
    const article = articleService.useArticle(id)
    const mainPic = articleService.useTopPicture(id, 'main')
    const leftPic = articleService.useTopPicture(id, 'left')
    const rightPic = articleService.useTopPicture(id, 'right')
    const sidePic = articleService.useTopPicture(id, 'side')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="article-wrapper">
            <header className="article-pics">
                <img className="img" src={leftPic ? leftPic : undefined} alt={leftPic}/>
                <img className="img" src={mainPic ? mainPic : undefined} alt={mainPic}/>
                <img className="img" src={rightPic ? rightPic : undefined} alt={rightPic}/>
            </header>
            <section className="article-text">
                <div className="text">
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                </div>
                <img className="side" src={sidePic || undefined} alt={sidePic}/>
            </section>
        </div>
    )
}

export default Article