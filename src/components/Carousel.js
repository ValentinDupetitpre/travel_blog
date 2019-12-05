import React, {useState, useEffect} from 'react'
import useCarousel from '../services/carousel.js'
import './Carousel.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Carousel = () => {
    const images = useCarousel()
    const [selectedImg, setSelectedImg] = useState({})
    const [imgComesFrom, setImgComesFrom] = useState('left')

    useEffect(() => {
        setSelectedImg(images[0]) 
    }, [images])

    const goRight = () => {
        setImgComesFrom('right')
        const pictureIndex = images.map(img => img.id).indexOf(selectedImg.id) +1
        if(images[pictureIndex]){
            setSelectedImg(images[pictureIndex])
        } else {
            setSelectedImg(images[0])
        }
    }
    const goLeft = () => {
        setImgComesFrom('left')
        const pictureIndex = images.map(img => img.id).indexOf(selectedImg.id) -1
        if(images[pictureIndex]){
            setSelectedImg(images[pictureIndex])
        } else {
            setSelectedImg(images[images.length-1])
        }
    }

    return(
        <section className='carousel'>
            <span className="carousel-left" onClick={goLeft}>&lt;</span>
            <span className="carousel-right" onClick={goRight}>&gt;</span>
            <ReactCSSTransitionGroup
                transitionName={imgComesFrom}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>

                <img key={selectedImg? selectedImg.id : null} src={selectedImg ? selectedImg.picture : null}/>
            </ReactCSSTransitionGroup>
           
        </section>
    )
}

export default Carousel