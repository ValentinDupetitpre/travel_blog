import {useState, useEffect} from 'react'
import firebase, {storage} from '../config/firebase'

const useCarousel = () => {
    const [images, setImages] = useState([])

    useEffect(() => {
        const listRef = storage.ref().child('carousel')

        listRef.listAll().then(res => {
            setImages(res.items)
          }).catch(error => {
              console.log(error)
          })
    }, [])

    return images
}

export default useCarousel