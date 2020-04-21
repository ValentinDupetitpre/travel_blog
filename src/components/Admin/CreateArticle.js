import React, {useState} from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FileUploader from './FileUploader'
import Compress from 'compress.js'

import firebase, { storage } from '../../config/firebase'

const CreateArticle = () => {
    const [mainPicture, setMainPicture] = useState('')
    const [leftPicture, setLeftPicture] = useState('')
    const [rightPicture, setRightPicture] = useState('')
    const [sidePicture, setSidePicture] = useState('')
    const compress = new Compress

    const compressImage = (img, imgRef, imgName) => {
        compress.compress([img], {
            size: 4, // the max size in MB, defaults to 2MB
            quality: 0.75, // the quality of the image, max is 1,
            maxWidth: 600, // the max width of the output image, defaults to 1920px
            maxHeight: 800, // the max height of the output image, defaults to 1920px
            resize: true, // defaults to true, set false if you do not want to resize the image width and height
          }).then((results) => {
            const img1 = results[0]
            const base64str = img1.data
            const imgExt = img1.ext
            const file = Compress.convertBase64ToFile(base64str, imgExt)
                console.log(file)
                upload(file, imgRef, imgName)
            // returns an array of compressed images
          })
    }

    const uploadImages = (ref) => {
        compressImage(mainPicture, ref, 'main')
        compressImage(leftPicture, ref, 'left')
        compressImage(rightPicture, ref, 'right')
        compressImage(sidePicture, ref, 'side')
    }

    const upload = (img, ref, imgName) => {
        const uploadRef = storage.ref(`article/${ref.id}/${imgName}`).put(img, {name:`${imgName}`})
        uploadRef.on(
            'state_changed',
            snapshot => {
                console.log(snapshot)
            },
            error => {
                console.log(error)
            },
            () => {
                switch (imgName) {
                    case 'main':
                        setMainPicture('')
                        break;
                    case 'left':
                        setLeftPicture('')
                        break;
                    case 'right':
                        setRightPicture('')
                        break;
                    case 'side':
                        setSidePicture('')
                        break;
                
                    default:
                        break;
                }
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