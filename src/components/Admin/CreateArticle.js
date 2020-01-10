import React, {useState} from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import FileUploader from '../FileUploader'

import firebase from '../../config/firebase'

const CreateArticle = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [mainPicture, setMainPicture] = useState('')
    const [leftPicture, setLeftPicture] = useState('')
    const [rightPicture, setRightPicture] = useState('')
    const [newBlob, setNewBlob] = useState(null)

    const resetFields = () => {
        document.getElementById("article-form-create").reset()
        setTitle('')
        setContent('')
        setMainPicture('')
        setLeftPicture('')
        setRightPicture('')
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)

        firebase
            .firestore()
            .collection('articles')
            .add({
                title: data.get('title'),
                content: data.get('content'),
                mainPicture,
                leftPicture,
                rightPicture,
                created: new Date()
            })
            .then(() => {
                resetFields()
            })

    }

    const getUploadedImg = (pic, img) => {
        switch (img) {
            case 'main':
                setMainPicture(pic)
                break;
            case 'left':
                setLeftPicture(pic)
            break;
            case 'right':
                setRightPicture(pic)
                break;
            default:
                break;
        }
        
    }

    // const onFileChange = (e, fileInput) => {
    //     const file = fileInput || e.target.files[0],
    //         pattern = /image-*/,
    //         reader = new FileReader();
    //     if (!file.type.match(pattern)) {
    //         alert('Format invalide');
    //         return;
    //     }
      
    //     reader.onload = (e) => {
    //         console.log(e.target.result)
    //         setPicture(e.target.result)
    //     }
    //     reader.readAsDataURL(file);
    // }

    return (
        <form id="article-form-create" onSubmit={onSubmit} noValidate autoComplete="off">
            <h2>Créer un article</h2>
            <TextField 
                className="input"
                required
                id="standard-required"
                label="Titre"
                defaultValue=""
                margin="normal"
                name="title"
                fullWidth
            />
            <TextField 
                className="input"
                id="standard-required"
                label="Détail"
                defaultValue=""
                margin="normal"
                multiline={true}
                name="content"
                fullWidth
            />
            <FileUploader parentGiveImg={leftPicture} parentGetImg={getUploadedImg} position="left" text="Image gauche"/>
            <FileUploader parentGiveImg={mainPicture} parentGetImg={getUploadedImg} position="main" text="Image principale"/>
            <FileUploader parentGiveImg={rightPicture} parentGetImg={getUploadedImg} position="right" text="Image droite"/>

            <Button className="send" type="submit" variant="contained" color="default" >
                Envoyer 
            </Button>
        </form>
        // <form onSubmit={onSubmit}>
        //     <h2>Créer un article</h2>
        //     <div>
        //         <label>Ajouter un titre</label>
        //         <input type='text' value={title} onChange={e => setTitle(e.currentTarget.value)} />
        //     </div>
        //     <div>
        //         <label>Ajouter un contenu</label>
        //         <input type='text' value={content} onChange={e => setContent(e.currentTarget.value)}/>
        //     </div>
        //     <div>
        //         <label>Ajouter une photo</label>
        //         <input type='file' accept="image/*" onChange={onFileChange}/>
        //     </div>
        //     <button>Créer</button>
        // </form>
    )
}

export default CreateArticle