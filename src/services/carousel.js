import {useState, useEffect} from 'react'
import firebase from '../config/firebase'

const useCarousel = () => {
    const [images, setImages] = useState([])

    useEffect(() => {
        const connection = firebase
            .firestore()
            .collection('carousel')
            .onSnapshot((snapshot) => {
                console.log(snapshot)
                const imagesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setImages(imagesData)
            })
        return () => connection()
    }, [])

    return images
}

export default useCarousel