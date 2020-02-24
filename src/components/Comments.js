import React, {useState} from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './Comments.css'

import articleService from '../services/articles'
import firebase from '../config/firebase'

const Comments = (props) => {
    const comments = articleService.useComments(props.articleId)
    const [error, setError] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)

        if(data.get('name')===''){
            setError("On aimerai bien connaitre ton petit nom")
        }else if(data.get('comment') === ''){
            setError("Ton message est vide, écris nous quelque chose")

        } else if(props.articleId){
            firebase
                .firestore()
                .collection(`articles/${props.articleId}/comments`)
                .add({
                    name: data.get('name'),
                    comment: data.get('comment'),
                    created: new Date()
                })
                .then(docRef => {
                    resetFields()
                })
        }else{
            console.log('impossible d\'enregistrer car article non reconnu')
        }
    } 

    const resetFields = () => {
        document.getElementById("create-comments").reset()
    }

    return (
        <section className="comments-wrapper">
            <form id="create-comments" onSubmit={onSubmit} noValidate autoComplete="off">
                <h2 className="comments-title">Laisse nous un petit commentaire</h2>
                <TextField 
                    className="input"
                    required
                    id="standard-required-title"
                    label="Ton petit nom"
                    defaultValue=""
                    margin="normal"
                    name="name"
                    fullWidth
                    onChange={() => setError('')}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Ton commentaire"
                    multiline
                    rows="4"
                    defaultValue=""
                    variant="outlined"
                    margin="normal"
                    name="comment"
                    fullWidth
                    onChange={() => setError('')}
                />
                <p className="error">{error}</p>
                <Button className="send" type="submit" variant="contained" color="default" >
                    Envoyer 
                </Button>
            </form>
            {comments && comments.length>0 && 
                <h4>Commentaires précédents</h4>
            }
            {comments
            && comments.map(comment => 
                <article className="comment">
                    <h5>{comment.name}</h5>
                    <p>{comment.comment}</p>
                </article>
            )}
        </section>
    )
}

export default Comments