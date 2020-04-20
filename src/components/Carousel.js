import React, {useState, useEffect} from 'react'
import useCarousel from '../services/carousel.js'
import articleService from '../services/articles'
import './Carousel.css'
import ModalSlider from './slider/ModalSlider'

const Carousel = () => {
    const imagesRef = useCarousel()
    const [images, setImages] = useState(null)
    const isMountedRef = articleService.useIsMountedRef()

    useEffect(() => {
        const urls = []
        let index = 0
        if(isMountedRef.current){
            imagesRef.forEach(image => image.getDownloadURL().then(url => {
                const img = {
                    id: index,
                    url
                }
                urls.push(img)
                index++
                if(index === imagesRef.length){
                    setImages(urls)
                }
            }))
        }
    }, [imagesRef, isMountedRef])

    return(
        <section className='carousel'>
            {images ? <ModalSlider slides={images} height="50vh" displaySize="cover"/> : <div></div>}
        </section>
    )
}

export default Carousel