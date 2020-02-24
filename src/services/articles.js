import {useState, useEffect} from 'react'
import firebase, {storage} from '../config/firebase'


const dateFromSec = (timestamp) => {
    const date = new Date(parseInt(timestamp.seconds*1000, 10))
    return date.toLocaleDateString()
}

const useArticles = () => {
    const [articlesPreview, setArticlesPreview] = useState([])

    useEffect(() => {
        const connection = firebase
            .firestore()
            .collection('articles')
            .orderBy("created", "desc")
            .onSnapshot((snapshot) => {
                const articles = snapshot.docs.map(doc => ({
                    id: doc.id,
                    created: dateFromSec(doc.data().created),
                    title: doc.data().title,
                    content: doc.data().content
                }))
                setArticlesPreview(articles)
            })
        return () => connection()
    }, [])
    return articlesPreview
}

const useArticle = (id) => {
    const [article, setArticle] = useState({})

    useEffect(() => {
        const connection = firebase
            .firestore()
            .collection('articles')
            .doc(id)
            .onSnapshot((snapshot) => {
                setArticle({
                    id: snapshot.id,
                    ...snapshot.data()
                })
            })
        return () => connection()
    }, [id])
    
    return article
}

const useMainPicture = (ref) => {
    const [picture, setPicture] = useState({})

    useEffect(() => {
        const picRef = storage.ref().child(`article/${ref}/main`)
        picRef.getDownloadURL().then(url => setPicture(url))
    }, [ref])

    return picture
}

const useTopPicture = (ref, position) => {
    const [picture, setPicture] = useState({})

    useEffect(() => {
        const picRef = storage.ref().child(`article/${ref}/${position}`)
        picRef.getDownloadURL().then(url => setPicture(url))
    }, [ref, position])

    return picture
}

const useBottomPics = (ref) => {
    const [pics, setPics] = useState([])

    useEffect(() => {
        const picRefs = storage.ref().child(`article/${ref}/bottom`)
        
        picRefs.listAll().then(res => {
            setPics(res.items)
          }).catch(error => {
              console.log(error)
          })
    }, [ref])

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
    }, [])
    return comments
}

export default {useArticles, useArticle, useMainPicture, useTopPicture, useBottomPics, useComments}