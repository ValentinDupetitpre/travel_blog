import React, {useState, useEffect, lazy, Suspense} from 'react'

import './Article.css'
import articleService from '../services/articles'
import sharedService from '../services/shared'
import Comments from './Comments'

import ModalWrapper from './slider/ModalWrapper'

const Map = lazy(() => import('./Map'))

const Article = (props) => {
    const isMountedRef = sharedService.useIsMountedRef()
    const id = props.match.params.articleId
    const article = articleService.useArticle(id)
    const [bottomPics, setBottomPics] = useState([])
    const mainPic = articleService.useTopPicture(id, 'main')
    const leftPic = articleService.useTopPicture(id, 'left')
    const rightPic = articleService.useTopPicture(id, 'right')
    const sidePic = articleService.useTopPicture(id, 'side')
    const bottomPicsRef = articleService.useBottomPics(id)

    const [openModal, setOpenModal] = useState(false)
    const [indexForModal, setIndexForModal] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const urls = []
        let index = 1
        if(isMountedRef.current){
            bottomPicsRef.forEach(pic => pic.getDownloadURL().then(url => {
                const img = {
                    id: index,
                    name: pic.name,
                    url
                }
                urls.push(img)
                index++
                if(index === bottomPicsRef.length +1){
                    // setBottomPics(urls)
                    sortPaintings(urls)
                }
            }))
        }
    }, [bottomPicsRef, isMountedRef])

    const sortPaintings = (array) => {
        const bottomPics = document.getElementById('bottom-pics') || {};
        const screenWidth = window.innerWidth
        const columns = Math.floor((bottomPics.clientWidth - (screenWidth>600 ? 160 : 0))/240)
        const out = [];
        let col = 0
        while(col < columns) {
            for(let i = 0; i < array.length; i += columns) {
                let _val = array[i + col]
                if (_val !== undefined)
                    out.push(_val);
            }
            col++;
        }
        setBottomPics(out)
    }

    const handlePicClick = (id) => {
        callModal(bottomPics.findIndex(pic => pic.id === id))
    }

    const displayBottomPictures = () => {
        return bottomPics.map((pic, index) => 
            <Suspense key={index} fallback={<div>Chargement...</div>}>
                <img className="bottom-pic" key={index} src={pic.url} alt={pic.name} onClick={() => handlePicClick(pic.id)}/>
            </Suspense>
        )
    }
    
    const callModal = (index) => {
        setIndexForModal(index)
        setOpenModal(true)
    } 

    const closeModal = () => {
        setIndexForModal(null)
        setOpenModal(false)
    }

    return (
        <div className="article-wrapper">
            <header className="article-pics">
                <img className="img" src={leftPic ? leftPic : undefined} alt={leftPic || ""}/>
                <img className="img main" src={mainPic ? mainPic : undefined} alt={mainPic || ""}/>
                <img className="img" src={rightPic ? rightPic : undefined} alt={rightPic || ""}/>
            </header>
            <section className="article-text">
                <div className="text">
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                </div>
                <img className="side" src={sidePic || undefined} alt={sidePic}/>
            </section>
            {bottomPics && 
                <React.Fragment>
                    {bottomPics.length>0 && 
                        <h3 className="bottom-pics-title">Quelques photos...</h3>
                    }
                    <div id="bottom-pics" className="bottom-pics">
                        {displayBottomPictures()}
                    </div>
                <ModalWrapper open={openModal} slides={bottomPics} startIndex={indexForModal} close={closeModal}/>
                </React.Fragment>
            }
            <Suspense fallback={<div>Chargement...</div>}>
                <Map articleId={id}/>
            </Suspense>
            <Comments articleId={id}/>
        </div>
    )
}

export default Article