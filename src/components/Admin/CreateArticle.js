import React, {useState} from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import FileUploader from '../FileUploader'

import firebase, { storage } from '../../config/firebase'

const CreateArticle = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [mainPicture, setMainPicture] = useState('')
    const [leftPicture, setLeftPicture] = useState('')
    const [rightPicture, setRightPicture] = useState('')
    const [newBlob, setNewBlob] = useState(null)

    const uploadImages = (ref) => {
        const uploadMainPic = storage.ref(`article/${ref.id}/main`).put(mainPicture, {name:'main'})
        const uploadLeftPic = storage.ref(`article/${ref.id}/left`).put(leftPicture, {name:'left'})
        const uploadRightPic = storage.ref(`article/${ref.id}/right`).put(rightPicture, {name:'right'})
        uploadMainPic.on(
            'state_changed',
            snapshot => {
                console.log(snapshot)
            },
            error => {
                console.log(error)
            },
            () => {
                setMainPicture('')
            }
        )
        uploadLeftPic.on(
            'state_changed',
            snapshot => {
                console.log(snapshot)
            },
            error => {
                console.log(error)
            },
            () => {
                setLeftPicture('')
            }
        )
        uploadRightPic.on(
            'state_changed',
            snapshot => {
                console.log(snapshot)
            },
            error => {
                console.log(error)
            },
            () => {
                setRightPicture('')
            }
        )
    }

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
                created: new Date()
            })
            .then(docRef => {
                uploadImages(docRef)
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
    )
}

export default CreateArticle