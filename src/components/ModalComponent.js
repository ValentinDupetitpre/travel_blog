import React, { useEffect, useState, useCallback } from 'react'
import './ModalComponent.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

function ModalComponent(props){
    const [visible, setVisible] = useState(false)
    const [img, setImg] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(null)
    const [swipeAbs, setSwipeAbs] = useState(0)
    const [swiping, setSwiping] = useState(false)
    const [imgComesFrom, SetImgComesFrom] = useState('left')
    const close = props.close
    
    useEffect(()=>{
        setVisible(props.open)
    }, [props.open])
    
    useEffect(()=>{
        if(props.indexImg || props.indexImg === 0) {
            setCurrentIndex(props.indexImg)
            setImg(props.imgArray[props.indexImg])
        }
    }, [props.indexImg, props.imgArray])
    
    useEffect(()=>{
        setVisible(false)
    },[])
    
    useEffect(()=>{
        document.addEventListener("keydown", keyDown);
        return () => {
            document.removeEventListener("keydown", keyDown);
        }
    })
    
    const keyDown = (e) => {
        switch (e.key) {
            case 'ArrowLeft':
            goLeft()
            break;
            case 'ArrowRight':
            goRight()
                break;
            case 'Escape':
            closeModal()
            break;
            default:
            break;
        }
    }
    function goRight(){
        SetImgComesFrom('right')
        if(props.imgArray[currentIndex+1]) {
            setImg(props.imgArray[currentIndex+1])
            setCurrentIndex(currentIndex+1)
        }else{
            setImg(props.imgArray[0])
            setCurrentIndex(0)
        }
    }
    function goLeft(){
        SetImgComesFrom('left')
        if(props.imgArray[currentIndex - 1]){
            setImg(props.imgArray[currentIndex - 1])
            setCurrentIndex(currentIndex - 1)
        }else{
            const lastIndex = props.imgArray.length - 1
            setImg(props.imgArray[lastIndex])
            setCurrentIndex(lastIndex)
        }
    }

    const closeModal = useCallback(() => {
        setVisible(false)
        close()
        setImg(null)
    }, [close])

    useEffect(()=> {
        window.onpopstate = (e) => {
            closeModal()
        }
    }, [closeModal])
    
    const startTouching = (e) => {
        const touch = e.touches[0];
        setSwipeAbs(touch.clientX);
    }
    
    const touching = (e) => {
        if (e.changedTouches && e.changedTouches.length) {
            setSwiping(true);
        }
    }
    
    const endTouching = (e) => {
        const touch = e.changedTouches[0];
        const abscisse = touch.clientX - swipeAbs;
        if (swiping && Math.abs(abscisse) > 50 ) {
            abscisse > 0 ? goLeft() : goRight()
        }
        setSwipeAbs(0)
        setSwiping(false)
    }
    
    function modalOverview(){
        return visible ? (
            <div id="myModal" className="modal">
                <span className="close" onClick={closeModal}>&times;</span>
                <span className="modal-left" onClick={goLeft}>&lt;</span>
                <span className="modal-right" onClick={goRight}>&gt;</span>
                <div className="img_wrapper">
                    <ReactCSSTransitionGroup
                        transitionName={imgComesFrom}
                        transitionEnterTimeout={400}
                        transitionLeaveTimeout={400}>

                        <img className="modal-content" key={img ? img.url : null} onTouchStart={startTouching} onTouchMove={touching}
                        onTouchEnd={endTouching} src={img ? img.url : null} alt=""/>

                    </ReactCSSTransitionGroup>
                </div>
                <div className="caption">
                    <div className="caption-title">{img ? img.name : ''}</div>
                </div>
            </div>
        ) : <div></div>
    }

    return(
        <div>
            {modalOverview()}
        </div>
    )
}

export default ModalComponent