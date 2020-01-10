import {useState, useEffect} from 'react'
import firebase from '../config/firebase'

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
                    content: doc.data().content,
                    mainPicture: doc.data().mainPicture
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

export default {useArticles, useArticle}