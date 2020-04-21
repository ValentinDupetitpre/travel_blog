import React, {useState, useEffect, lazy, Suspense} from 'react'
import useCarousel from '../services/carousel.js'
import sharedService from '../services/shared'
import './Carousel.css'
import Placeholder from '../media/placeholder.png'
// import ModalSlider from './slider/ModalSlider'

const ModalSlider = lazy(()=> import('./slider/ModalSlider'))

const Carousel = () => {
    const imagesRef = useCarousel()
    const [images, setImages] = useState(null)
    const isMountedRef = sharedService.useIsMountedRef()

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
            <Suspense fallback={<img alt="blog voyage Nouvelle-Zélande" src={Placeholder}/>}>
                {images ? <ModalSlider slides={images} height="50vh" displaySize="cover"/> : <div></div>}
            </Suspense>
        </section>
    )
}

export default Carousel