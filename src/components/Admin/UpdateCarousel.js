import React, {useState} from 'react'
import firebase from '../../config/firebase'
import useCarousel from '../../services/carousel'

const UpdateCarousel = () => {
    const [name, setName] = useState('')
    const [picture, setPicture] = useState('')
    const [id, setId] = useState(null)
    const images = useCarousel()

    const resetFields = () => {
        setName('')
        setPicture('')
    }

    const handleImageSelection = (e) => {
        const image = images.find(image => image.name === e.target.value)
        setName(image.name)
        setPicture(image.picture)
        setId(image.id)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        firebase
            .firestore()
            .collection('carousel')
            .doc(id)
            .update({
                name,
                picture,
            })
            .then(() => {
                resetFields()
            })

    }

    const onDelete = (e) => {
        e.preventDefault()
        firebase
            .firestore()
            .collection('carousel')
            .doc(id)
            .delete()
            .then(() => {
                resetFields()
            })
    }

    return (
        <div>
            <h2>Sélectionner une photo à supprimer du carousel</h2>
            <select name={name} onChange={handleImageSelection}>
                {images.map(image => 
                    <option value={image.name} key={image.id}>{image.name}</option>
                )}
            </select>
            <label>Modifier le nom du tableau</label>
            <input type='text' value={name} onChange={e => setName(e.currentTarget.value)} />
            <img src={picture ? picture : null} />
            <button onClick={onSubmit}>Sauvegarder les modifications</button>
            <button onClick={onDelete}>Supprimer la photo</button>
        </div>
    )
}

export default UpdateCarousel