import React, {useState} from 'react'
import {storage} from '../../config/firebase'

const AddCarousel = () => {
    const [name, setName] = useState('')
    const [picture, setPicture] = useState('')

    const resetFields = () => {
        setName('')
        setPicture('')
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const uploadTask = storage.ref(`carousel/${name}`).put(picture)
        uploadTask.on(
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

    const onFileChange = (e, fileInput) => {
        const file = fileInput || e.target.files[0]
        const pattern = /image-*/
          
        if (!file.type.match(pattern)) {
            alert('Format invalide');
            return;
        }
        setPicture(file)
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Ajouter une photo au carousel</h2>
            <div>
                <label>Nom de la photo</label>
                <input type='text' value={name} onChange={e => setName(e.currentTarget.value)} />
            </div>
            <div>
                <label>Ajouter une photo</label>
                <input type='file' accept="image/*" onChange={onFileChange}/>
            </div>
            <button>Créer</button>
        </form>
    )
}

export default AddCarousel