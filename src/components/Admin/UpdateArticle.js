import React, {useState} from 'react'
import firebase from '../../config/firebase'
import articleService from '../../services/articles'

const UpdateArticle = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [id, setId] = useState(null)
    const articles = articleService.useArticles()

    const resetFields = () => {
        setTitle('')
        setContent('')
    }

    const handleArticleSelection = (e) => {
        const article = articles.find(article => article.title === e.target.value)
        setTitle(article.title)
        setContent(article.content)
        setId(article.id)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        firebase
            .firestore()
            .collection('articles')
            .doc(id)
            .update({
                title,
                content,
            })
            .then(() => {
                resetFields()
            })

    }

    return (
        <div>
            <h2>Modifier un article</h2>
            <select name={title} onChange={handleArticleSelection}>
                {articles.map(article => 
                    <option value={article.title} key={article.id}>{article.title}</option>
                )}
            </select>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Ajouter un titre</label>
                    <input type='text' value={title} onChange={e => setTitle(e.currentTarget.value)} />
                </div>
                <div>
                    <label>Ajouter un contenu</label>
                    <input type='text' value={content} onChange={e => setContent(e.currentTarget.value)}/>
                </div>
                <button>Modifier</button>
            </form>
        </div>
    )
}

export default UpdateArticle