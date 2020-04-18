/** @jsx jsx */
import {useState, useEffect, useCallback} from 'react'
import ModalSliderContent from './ModalSliderContent'
import ModalSlide from './ModalSlide'
import Arrow from './Arrow'

import './Modal.css'
import { jsx } from '@emotion/core'


const ModalSlider = (props) => {
    const [isVisible, setIsVisible] = useState(false)
    const getWidth = () => window.innerWidth
    const [state, setState] = useState({
        activeIndex: 0,
        translate: 0,
        transition: 0.45
    })
    const close = props.close
    const { translate, transition, activeIndex } = state

    useEffect(()=>{
        setIsVisible(props.open)
        setState({
            transition,
            activeIndex: props.startIndex,
            translate: props.startIndex * getWidth()
        })
    }, [props.open, props.startIndex, transition])

    const closeModal = useCallback(() => {
        setIsVisible(false)
        close()
    }, [close])


    useEffect(()=>{
        console.log(props.slides)
        document.addEventListener("keydown", keyDown);
        return () => {
            document.removeEventListener("keydown", keyDown);
        }
    })
    
    const keyDown = (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                prevSlide()
                break;
            case 'ArrowRight':
                nextSlide()
                break;
            case 'Escape':
                closeModal()
                break;
            default:
                break;
        }
    }

    const nextSlide = () => {
        if (activeIndex === props.slides.length - 1) {
          return setState({
            ...state,
            translate: 0,
            activeIndex: 0
          })
        }
    
        setState({
          ...state,
          activeIndex: activeIndex + 1,
          translate: (activeIndex + 1) * getWidth()
        })
    }

    const prevSlide = () => {
        if (activeIndex === 0) {
          return setState({
            ...state,
            translate: (props.slides.length - 1) * getWidth(),
            activeIndex: props.slides.length - 1
          })
        }
    
        setState({
          ...state,
          activeIndex: activeIndex - 1,
          translate: (activeIndex - 1) * getWidth()
        })
    }

    return (
        isVisible ? 
        <div className="modal-slider-wrapper">    
            <span className="close" onClick={closeModal}>&times;</span>
            <ModalSliderContent
                translate={translate}
                transition={transition}
                width={getWidth() * props.slides.length}
                height="100%"
            >
                {props.slides.map((slide, i) => (
                    <ModalSlide key={slide + i} content={slide.url} />
                ))}
            </ModalSliderContent>
            <Arrow direction="left" handleClick={prevSlide} />
            <Arrow direction="right" handleClick={nextSlide} />
        </div>
        : <div></div>
    )
}

export default ModalSlider