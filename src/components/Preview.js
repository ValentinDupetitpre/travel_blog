import React from 'react'
import articleService from '../services/articles'
import Card from './Card'
import './Preview.css'

const Preview = (props) => {
    const articles = articleService.useArticles()

    return(
        <div className="preview">
            <h4>Nos articles</h4>
            <hr />
            <div className="preview-wrapper">
                {articles.map(preview => 
                    <Card key={preview.id} id={preview.id} title={preview.title} content={preview.content} picture={preview.mainPicture}/>
                )
                }
            </div>
        </div>
    )
}

export default Preview