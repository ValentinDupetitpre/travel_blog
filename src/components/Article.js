import React, {useState, useEffect} from 'react'

import './Article.css'
import articleService from '../services/articles'

const Article = (props) => {
    const id = props.match.params.articleId
    const article = articleService.useArticle(id)
    const [bottomPics, setBottomPics] = useState([])
    const mainPic = articleService.useTopPicture(id, 'main')
    const leftPic = articleService.useTopPicture(id, 'left')
    const rightPic = articleService.useTopPicture(id, 'right')
    const sidePic = articleService.useTopPicture(id, 'side')
    const bottomPicsRef = articleService.useBottomPics(id)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const urls = []
        let index = 0
        bottomPicsRef.map(pic => pic.getDownloadURL().then(url => {
            const img = {
                id: index,
                name: pic.name,
                url
            }
            urls.push(img)
            index++
        }))
        setBottomPics(urls)
    }, [bottomPicsRef])

    const displayBottomPictures = () => {
        return bottomPics.map(pic => 
            <div>
                toto
                <img className="bottom-pic" key={pic.id} src={pic.url} alt={pic.name}/>
            </div>
        )
    }

    return (
        <div className="article-wrapper">
            <header className="article-pics">
                <img className="img" src={leftPic ? leftPic : undefined} alt={leftPic}/>
                <img className="img main" src={mainPic ? mainPic : undefined} alt={mainPic}/>
                <img className="img" src={rightPic ? rightPic : undefined} alt={rightPic}/>
            </header>
            <section className="article-text">
                <div className="text">
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                </div>
                <img className="side" src={sidePic || undefined} alt={sidePic}/>
            </section>
            {displayBottomPictures()}
        </div>
    )
}

export default Article