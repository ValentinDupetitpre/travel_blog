/** @jsx jsx */
import {useState, useEffect, useCallback} from 'react'
import ModalSlider from './ModalSlider'

import './Modal.css'
import { jsx } from '@emotion/core'


const ModalWraper = (props) => {
    const [isVisible, setIsVisible] = useState(false)
    const close = props.close

    useEffect(()=>{
        setIsVisible(props.open)
    }, [props.open])

    useEffect(()=>{
        document.addEventListener("keydown", keyDown);
        return () => {
            document.removeEventListener("keydown", keyDown);
        }
    })

    const keyDown = (e) => {
        if (e.key === 'Escape'){
            closeModal()
        }
    }

    const closeModal = useCallback(() => {
        setIsVisible(false)
        close()
    }, [close])

    return (
        isVisible ? 
        <div className="modal-wrapper">
            <span className="close" onClick={closeModal}>&times;</span>
            <ModalSlider slides={props.slides} startIndex={props.startIndex} height="100vh" displaySize="contain"/>
        </div>
        : <div></div>
    )
}

export default ModalWraper