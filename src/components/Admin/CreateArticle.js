import React, {useState, useEffect} from 'react'
import firebase from '../../config/firebase'

const CreateArticle = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [picture, setPicture] = useState('')

    const resetFields = () => {
        setTitle('')
        setContent('')
        setPicture('')
    }

    const onSubmit = (e) => {
        e.preventDefault()

        firebase
            .firestore()
            .collection('articles')
            .add({
                title,
                content,
                picture,
                created: new Date()
            })
            .then(() => {
                resetFields()
            })

    }

    const onFileChange = (e, fileInput) => {
        const file = fileInput || e.target.files[0],
            pattern = /image-*/,
            reader = new FileReader();
        if (!file.type.match(pattern)) {
            alert('Format invalide');
            return;
        }
      
        reader.onload = (e) => {
            console.log(e.target.result)
            setPicture(e.target.result)
        }
        reader.readAsDataURL(file);
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Créer un article</h2>
            <div>
                <label>Ajouter un titre</label>
                <input type='text' value={title} onChange={e => setTitle(e.currentTarget.value)} />
            </div>
            <div>
                <label>Ajouter un contenu</label>
                <input type='text' value={content} onChange={e => setContent(e.currentTarget.value)}/>
            </div>
            <div>
                <label>Ajouter une photo</label>
                <input type='file' accept="image/*" onChange={onFileChange}/>
            </div>
            <button>Créer</button>
        </form>
    )
}

export default CreateArticle