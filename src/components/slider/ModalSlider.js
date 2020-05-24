/** @jsx jsx */
import {useState, useEffect, useCallback} from 'react'
import ModalSliderContent from './ModalSliderContent'
import ModalSlide from './ModalSlide'
import Arrow from './Arrow'
import { css, jsx } from '@emotion/core'


const ModalSlider = (props) => {
    const getWidth = () => window.innerWidth
    const isDesktop = getWidth() > 600
    const [state, setState] = useState({
        activeIndex: 0,
        translate: 0,
        transition: 0.45
    })
    const { translate, transition, activeIndex } = state

    useEffect(()=>{
        setState({
            transition,
            activeIndex: props.startIndex || 0,
            translate: props.startIndex * getWidth()
        })
    }, [props.startIndex, transition])

    useEffect(()=>{
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
            default:
                break;
        }
    }

    const nextSlide = useCallback(() => {
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
    }, [activeIndex, props.slides.length, state])

    const prevSlide = useCallback(() => {
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
    }, [activeIndex, props.slides.length, state])

    useEffect(()=>{
        if(isDesktop){
            const timer = setTimeout(() => {
               nextSlide() 
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [nextSlide, prevSlide])

    return (
        <div css={css`
                position: relative;
                height: ${props.height};
                width: 100vw;
                margin: 0 auto;
                overflow: hidden;
            `}>
            <ModalSliderContent
                translate={translate}
                transition={transition}
                width={getWidth() * props.slides.length}
                height="100%"
            >
                {props.slides.map((slide, i) => (
                    <ModalSlide key={slide + i} content={slide.url} displaySize={props.displaySize}/>
                ))}
            </ModalSliderContent>
            <Arrow direction="left" handleClick={prevSlide} />
            <Arrow direction="right" handleClick={nextSlide} />
        </div>
    )
}

export default ModalSlider