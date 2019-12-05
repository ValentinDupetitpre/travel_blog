import React, {useState, useEffect} from 'react'
import firebase from '../../config/firebase'

const AddCarousel = () => {
    const [name, setName] = useState('')
    const [picture, setPicture] = useState('')

    const resetFields = () => {
        setName('')
        setPicture('')
    }

    const onSubmit = (e) => {
        e.preventDefault()

        firebase
            .firestore()
            .collection('carousel')
            .add({
                name,
                picture,
                created: new Date()
            })
            .then(() => {
                resetFields()
            })

    }

    const onFileChange = (e, fileInput) => {
        let file = fileInput || e.target.files[0],
            pattern = /image-*/,
            reader = new FileReader();
          
        if (!file.type.match(pattern)) {
            alert('Format invalide');
            return;
        }
      
        // setLoaded(false)
      
        reader.onload = (e) => {
            console.log(e.target.result)
            setPicture(e.target.result)
            // setLoaded(true)
        }
        reader.readAsDataURL(file);
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