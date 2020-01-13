import {useState, useEffect} from 'react'
import firebase, {storage} from '../config/firebase'

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
                    created: doc.data().created,
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

export default {useArticles, useArticle, useMainPicture, useTopPicture}