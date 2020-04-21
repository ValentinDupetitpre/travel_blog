import React, {useState} from 'react'
import { storage } from '../../config/firebase'
import articleService from '../../services/articles'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FileUploader from './FileUploader'
import Compress from 'compress.js'
 
const AddArticlePic = () => {
    const [title, setTitle] = useState('')
    const [id, setId] = useState(null)
    const [picture, setPicture] = useState('')
    const articles = articleService.useArticles()
    const compress = new Compress()

    const handleArticleSelection = (e) => {
        const article = articles.find(article => article.title === e.target.value)
        setTitle(article.title)
        setId(article.id)
    }

    const resetFields = () => {
        setTitle('')
        setPicture('')
    }
   
    const onSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const picName = data.get('picName')

        compress.compress([picture], {
            size: 4, // the max size in MB, defaults to 2MB
            quality: 0.75, // the quality of the image, max is 1,
            maxWidth: 1200, // the max width of the output image, defaults to 1920px
            maxHeight: 1000, // the max height of the output image, defaults to 1920px
            resize: true, // defaults to true, set false if you do not want to resize the image width and height
          }).then((results) => {
            const img1 = results[0]
            const base64str = img1.data
            const imgExt = img1.ext
            const file = Compress.convertBase64ToFile(base64str, imgExt)
                upload(picName, file)
            // returns an array of compressed images
          })

    }

    const upload = (picName, pic) => {

        const uploadPic = storage.ref(`article/${id}/bottom/${picName}`).put(pic)
        uploadPic.on(
            'state_changed',
            snapshot => {
                console.log(snapshot)
            },
            error => {
                console.log(error)
            },
            () => {
                resetFields()
            }
        )
    }

    const getUploadedImg = (pic) => {
        setPicture(pic)
    }

    return (
        <div>
            <h2>Ajouter une photo à un article</h2>
            <select name={title} onChange={handleArticleSelection}>
                {articles.map(article => 
                    <option value={article.title} key={article.id}>{article.title}</option>
                )}
            </select>
            <form id="article-form-update" onSubmit={onSubmit} noValidate autoComplete="off" key={id || null}>
                <TextField 
                    className="input"
                    id="standard-required-picture-name"
                    label="Nom de la photo"
                    defaultValue=''
                    margin="normal"
                    name="picName"
                    fullWidth
                />
                <FileUploader parentGiveImg={picture} parentGetImg={getUploadedImg} position="bottom" text="Image mosaique"/>
                 <Button className="send" type="submit" variant="contained" color="default" >
                    Modifier 
                </Button>
            </form>
        </div>
    )
}

export default AddArticlePic