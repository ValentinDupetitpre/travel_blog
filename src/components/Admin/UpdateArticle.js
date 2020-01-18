import React, {useState} from 'react'
import firebase, { storage } from '../../config/firebase'
import articleService from '../../services/articles'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
 
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
        const data = new FormData(e.target)

        firebase
            .firestore()
            .collection('articles')
            .doc(id)
            .update({
                title: data.get('title'),
                content: data.get('content'),
            })
            .then(() => {
                resetFields()
            })
    }

    const deleteFolderContent = (refToDel) => {
        const ref = storage.ref(refToDel)
        ref.listAll().then(dir => {
            dir.items.forEach(fileRef => {
                fileRef.delete()
                    .then(() => console.log('fichier supprimé'))
                    .catch(e => console.log(e))
            });
            dir.prefixes.forEach(folderRef => {
                deleteFolderContent(`${refToDel}/${folderRef}`)
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleDelete = (e) => {
        const articleId = id
        firebase
            .firestore()
            .collection('articles')
            .doc(articleId)
            .delete()
            .then(() => {
                deleteFolderContent(`article/${articleId}`)
                
            })
            .catch(e => console.log(e))

    }

    return (
        <div>
            <h2>Modifier un article</h2>
            <select name={title} onChange={handleArticleSelection}>
                {articles.map(article => 
                    <option value={article.title} key={article.id}>{article.title}</option>
                )}
            </select>
            <form id="article-form-update" onSubmit={onSubmit} noValidate autoComplete="off" key={id || null}>
                <TextField 
                    className="input"
                    id="standard-required-title-update"
                    label="Titre"
                    defaultValue={title || ''}
                    margin="normal"
                    name="title"
                    fullWidth
                />
                <TextField 
                    className="input"
                    id="standard-required-content-update"
                    label="Détail"
                    defaultValue={content || ''}
                    margin="normal"
                    multiline={true}
                    name="content"
                    fullWidth
                />
                 <Button className="send" type="submit" variant="contained" color="default" >
                    Modifier 
                </Button>
                <Button className="delete" variant="contained" color="secondary" onClick={handleDelete}>
                    Supprimer
                </Button>
            </form>
        </div>
    )
}

export default UpdateArticle