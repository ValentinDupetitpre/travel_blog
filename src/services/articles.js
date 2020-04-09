import {useState, useEffect, useRef} from 'react'
import firebase, {storage} from '../config/firebase'

const useIsMountedRef = () => {
    const isMountedRef = useRef(null);
    useEffect(() => {
      isMountedRef.current = true;
      return () => isMountedRef.current = false;
    });
    return isMountedRef;
  }

const dateFromSec = (timestamp) => {
    const date = new Date(parseInt(timestamp.seconds*1000, 10))
    return date.toLocaleDateString()
}

const useArticles = () => {
    const [articlesPreview, setArticlesPreview] = useState([])
    const [unmounted, setUnmounted] = useState(false)

    useEffect(() => {
        const connection = firebase
            .firestore()
            .collection('articles')
            .orderBy("created", "desc")
            .onSnapshot((snapshot) => {
                if(!unmounted){
                    const articles = snapshot.docs.map(doc => ({
                        id: doc.id,
                        created: dateFromSec(doc.data().created),
                        title: doc.data().title,
                        content: doc.data().content
                    }))
                    setArticlesPreview(articles)
                }
            })
        return () => {
            connection()
            setUnmounted(true)
        }
    }, [unmounted])
    return articlesPreview
}

const useArticle = (id) => {
    const [article, setArticle] = useState({})
    const isMountedRef = useIsMountedRef()

    useEffect(() => {
        const connection = firebase
            .firestore()
            .collection('articles')
            .doc(id)
            .onSnapshot((snapshot) => {
                if(isMountedRef.current){
                    setArticle({
                        id: snapshot.id,
                        ...snapshot.data()
                    })
                }
            })
        return () => connection()
    }, [id, isMountedRef])
    
    return article
}

const useTopPicture = (ref, position) => {
    const [picture, setPicture] = useState({})
    const isMountedRef = useIsMountedRef()

    useEffect(() => {
        const picRef = storage.ref().child(`article/${ref}/${position}`)
        picRef.getDownloadURL()
            .then(url => {
                if(isMountedRef.current){
                    setPicture(url)}
                })
            .catch(err => {
                if(isMountedRef.current)
                    console.log(err)
            })
    }, [ref, position, isMountedRef])

    return picture
}

const useBottomPics = (ref) => {
    const [pics, setPics] = useState([])
    const isMountedRef = useIsMountedRef()

    useEffect(() => {
        const picRefs = storage.ref().child(`article/${ref}/bottom`)
        
        picRefs.listAll().then(res => {
            if(isMountedRef.current){
                setPics(res.items)
            }
          }).catch(error => {
              if(isMountedRef.current)
                  console.log(error)
          })

    }, [ref, isMountedRef])

    return pics
}

const useComments = (articleId) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        const connection = firebase
            .firestore()
            .collection(`articles/${articleId}/comments`)
            .orderBy("created", "desc")
            .onSnapshot((snapshot) => {
                const comms = snapshot.docs.map(doc => ({
                    id: doc.id,
                    created: dateFromSec(doc.data().created),
                    name: doc.data().name,
                    comment: doc.data().comment
                }))
                setComments(comms)
            })
        return () => connection()
    }, [articleId])
    return comments
}

const useMapPoints = (articleId) => {
    const [points, setPoints] = useState([])

    useEffect(() => {
        const connection = firebase
            .firestore()
            .collection(`articles/${articleId}/map`)
            .onSnapshot((snapshot) => {
                const pointsArray = snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name,
                    latitude: doc.data().latitude,
                    longitude: doc.data().longitude
                }))
                setPoints(pointsArray)
            })
            return () => connection()
    }, [articleId])
    return points
}

export default {useArticles, useArticle, useTopPicture, useBottomPics, useComments, useMapPoints, useIsMountedRef}