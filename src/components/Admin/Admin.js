import React from 'react'

import AddCarousel from './AddCarousel'
import UpdateCarousel from './UpdateCarousel'
import CreateArticle from './CreateArticle'
import UpdateArticle from './UpdateArticle'
import AddArticlePic from './AddArticlePic'
import UpdateArticleMainsPics from './UpdateArticleMainsPics'
import AddMapData from './AddMapData'

import './Admin.css'

const Admin = () => {

    return (
        <div className="admin">
            <AddCarousel />
            <UpdateCarousel />
            <CreateArticle />
            <AddMapData />
            <UpdateArticle />
            <AddArticlePic />
            <UpdateArticleMainsPics />
        </div>
    )
}

export default Admin