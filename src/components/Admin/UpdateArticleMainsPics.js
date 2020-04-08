import React, {useState} from 'react'
import { storage } from '../../config/firebase'
import articleService from '../../services/articles'

import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import FileUploader from '../FileUploader'
import Compress from 'compress.js'

const UpdateArticleMainsPics = () => {
    const [title, setTitle] = useState('')
    const [id, setId] = useState(null)
    const [picture, setPicture] = useState('')
    const [picName, setPicName] = useState('')
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
        setPicName('')
    }
   
    const onSubmit = (e) => {
        e.preventDefault()

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
                console.log(file)
                upload(file)
            // returns an array of compressed images
          })
    }

    const upload = (pic) => {

        const uploadPic = storage.ref(`article/${id}/${picName}`).put(pic)
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
            <h2>Modifier une photo d'un article</h2>
            <select name={title} onChange={handleArticleSelection}>
                {articles.map(article => 
                    <option value={article.title} key={article.id}>{article.title}</option>
                )}
            </select>
            <div className="img-name">
                <InputLabel>PicName</InputLabel>
                <Select
                    value={picName}
                    onChange={e => setPicName(e.target.value)}>
                    <MenuItem value="left">Left</MenuItem>
                    <MenuItem value="main">Main</MenuItem>
                    <MenuItem value="right">Right</MenuItem>
                    <MenuItem value="side">Side</MenuItem>
                </Select>
            </div>
            
            <form id="article-form-update" onSubmit={onSubmit} noValidate autoComplete="off" key={id || null}>
                <FileUploader parentGiveImg={picture} parentGetImg={getUploadedImg} position="bottom" text="Image princpale"/>
                 <Button className="send" type="submit" variant="contained" color="default" >
                    Envoyer
                </Button>
            </form>
        </div>
    )
}

export default UpdateArticleMainsPics