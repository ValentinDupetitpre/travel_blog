import {useState, useEffect} from 'react'
import firebase from '../config/firebase'

const useArticle = () => {
    const [articlePreview, setArticlePreview] = useState([])

    useEffect(() => {
        const connection = firebase
            .firestore()
            .collection('articles')
            .orderBy("created", "desc")
            .onSnapshot((snapshot) => {
                const article = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setArticlePreview(article)
            })
        return () => connection()
    }, [])

    return articlePreview
}

export default useArticle