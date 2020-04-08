import React, {useState} from 'react'
import firebase from '../../config/firebase'
import articleService from '../../services/articles'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
 
const AddMapData = () => {
    const [title, setTitle] = useState('')
    const [id, setId] = useState(null)
    const articles = articleService.useArticles()

    const resetFields = () => {
        document.getElementById("article-form-map").reset()
        setTitle('')
    }

    const handleArticleSelection = (e) => {
        const article = articles.find(article => article.title === e.target.value)
        setTitle(article.title)
        setId(article.id)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)

        firebase
            .firestore()
            .collection(`articles/${id}/map`)
            .add({
                latitude: data.get('latitude'),
                longitude: data.get('longitude'),
                name: data.get('text')
            })
            .then(docRef => {
                resetFields()
            })
    }

    return (
        <div>
            <h2>Gérer la carte d'un article</h2>
            <select name={title} onChange={handleArticleSelection}>
                {articles.map(article => 
                    <option value={article.title} key={article.id}>{article.title}</option>
                )}
            </select>
            <form id="article-form-map" onSubmit={onSubmit} noValidate autoComplete="off" key={id || null}>
                <TextField 
                    className="input"
                    id="standard-required-lat-map"
                    label="Latitude"
                    defaultValue=''
                    margin="normal"
                    name="latitude"
                    fullWidth
                />
                <TextField 
                    className="input"
                    id="standard-required-long-map"
                    label="Longitude"
                    defaultValue=''
                    margin="normal"
                    name="longitude"
                    fullWidth
                />
                <TextField 
                    className="input"
                    id="standard-required-content-map"
                    label="Nom du point"
                    defaultValue=''
                    margin="normal"
                    multiline={true}
                    name="text"
                    fullWidth
                />
                 <Button className="send" type="submit" variant="contained" color="default" >
                    Ajouter un point sur la carte 
                </Button>
            </form>
        </div>
    )
}

export default AddMapData