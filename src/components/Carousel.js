import React, {useState, useEffect} from 'react'
import useCarousel from '../services/carousel.js'
import './Carousel.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Carousel = () => {
    const imagesRef = useCarousel()
    const [images, setImages] = useState([])
    const [selectedImg, setSelectedImg] = useState(null)
    const [imgComesFrom, setImgComesFrom] = useState('left')

    useEffect(() => {
        console.log(imagesRef)
        const urls = []
        let index = 0
        imagesRef.map(image => image.getDownloadURL().then(url => {
            const img = {
                id: index,
                url
            }
            urls.push(img)
            if(index === 0){
                setSelectedImg(img)
            }
            index++
        }))
        setImages(urls)
    }, [imagesRef])

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

                <img key={selectedImg ? selectedImg.id : null} src={selectedImg ? selectedImg.url : 'https://via.placeholder.com/350x150'} alt={'carousel'}/>
            </ReactCSSTransitionGroup>
           
        </section>
    )
}

export default Carousel