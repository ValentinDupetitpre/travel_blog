import React, {useState} from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FileUploader from '../FileUploader'

import firebase, { storage } from '../../config/firebase'

const CreateArticle = () => {
    // const [title, setTitle] = useState('')
    // const [content, setContent] = useState('')
    const [mainPicture, setMainPicture] = useState('')
    const [leftPicture, setLeftPicture] = useState('')
    const [rightPicture, setRightPicture] = useState('')
    const [sidePicture, setSidePicture] = useState('')

    const uploadImages = (ref) => {
        const uploadMainPic = storage.ref(`article/${ref.id}/main`).put(mainPicture, {name:'main'})
        const uploadLeftPic = storage.ref(`article/${ref.id}/left`).put(leftPicture, {name:'left'})
        const uploadRightPic = storage.ref(`article/${ref.id}/right`).put(rightPicture, {name:'right'})
        const uploadSidePic = storage.ref(`article/${ref.id}/side`).put(rightPicture, {name:'side'})
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
        uploadSidePic.on(
            'state_changed',
            snapshot => {
                console.log(snapshot)
            },
            error => {
                console.log(error)
            },
            () => {
                setSidePicture('')
            }
        )
    }

    const resetFields = () => {
        document.getElementById("article-form-create").reset()
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
            case 'side':
                setSidePicture(pic)
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
                id="standard-required-title"
                label="Titre"
                defaultValue=""
                margin="normal"
                name="title"
                fullWidth
            />
            <TextField 
                className="input"
                id="standard-required-content"
                label="Détail"
                defaultValue=""
                margin="normal"
                multiline={true}
                name="content"
                fullWidth
            />
            <div className="row">
                <FileUploader parentGiveImg={leftPicture} parentGetImg={getUploadedImg} position="left" text="Image gauche"/>
                <FileUploader parentGiveImg={mainPicture} parentGetImg={getUploadedImg} position="main" text="Image principale"/>
            </div>
            <div className="row">
                <FileUploader parentGiveImg={rightPicture} parentGetImg={getUploadedImg} position="right" text="Image droite"/>
                <FileUploader parentGiveImg={sidePicture} parentGetImg={getUploadedImg} position="side" text="Image sur cote"/>
            </div>

            <Button className="send" type="submit" variant="contained" color="default" >
                Envoyer 
            </Button>
        </form>
    )
}

export default CreateArticle