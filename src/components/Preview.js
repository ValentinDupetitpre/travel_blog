import React, {useState, useEffect} from 'react'
import firebase from '../config/firebase'
import useArticle from '../services/articles'
import Card from './Card'
import './Preview.css'

const Preview = () => {
    const article = useArticle()

    return(
        <div className="preview-wrapper">
            {article.map(preview => 
                <Card key={preview.id} title={preview.title} content={preview.content} picture={preview.picture} />
            )
            }
        </div>
    )
}

export default Preview