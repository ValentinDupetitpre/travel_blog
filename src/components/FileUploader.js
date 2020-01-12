import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import './FileUploader.css'

var propTypes = {
    baseColor: PropTypes.string,
    activeColor: PropTypes.string
  },
  
  defaultProps = {
    baseColor: 'gray',
    activeColor: 'green',
    overlayColor: 'rgba(255,255,255,0.3)'
  };

function FileUploader(props) {
    const [active, setActive] = useState(false)
    const [imageSrc, setImageSrc] = useState()
    const [loaded, setLoaded] = useState(false)
    const [labelClass, setLabelClass] = useState('uploader')
    const [borderColor, setBorderColor] = useState(props.baseColor)
    const [iconColor, setIconColor] = useState(props.baseColor)
  
    function onDragEnter(e) {
        setActive(true)
    }
  
    function onDragLeave(e) {
        setActive(false)
    }
  
    function onDragOver(e) { 
        e.preventDefault(); 
    }
  
    function onDrop(e) {
        e.preventDefault();
        setActive(false)
        this.onFileChange(e, e.dataTransfer.files[0]);
    }
  
    function onFileChange(e, fileInput) {
        let file = fileInput || e.target.files[0],
            pattern = /image-*/,
            reader = new FileReader();
          
        if (!file.type.match(pattern)) {
            alert('Format invalide');
            return;
        }
        setImageSrc(file)
      
        setLoaded(true)
      
        // reader.onload = (e) => {
        //     setImageSrc(e.target.result)
        //     setLoaded(true)
        // }
        // reader.readAsDataURL(file);

    }

    useEffect(()=>{
        setLabelClass(`uploader ${loaded && 'loaded'}`)
        const border = active ? props.activeColor : props.baseColor
        const icon = active ? 
            props.activeColor : (loaded) ? 
                props.overlayColor : props.baseColor;
        setBorderColor(border)
        setIconColor(icon)
    })

    useEffect(()=> {
        props.parentGetImg(imageSrc, props.position)
    }, [imageSrc])

    useEffect(()=>{
        if(props.parentGiveImg && props.parentGiveImg.length > 0){
            setImageSrc(props.parentGiveImg)
            setLoaded(true)
        }else if(props.parentGiveImg === null){
            setImageSrc()
        }
    }, [props.parentGiveImg])
      
    return (
        <label 
            className={labelClass}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave} 
            onDragOver={onDragOver}
            onDrop={onDrop}
            key={imageSrc}
            style={{outlineColor: borderColor}}>
            <div className="text-drop">
                {props.text}
            </div>
            <div className="text-drop">
                Placer une image ou cliquer
            </div>
            <img src={imageSrc} className={loaded ? 'loaded' : undefined} alt='uploaded'/>
            <i className="icon icon-upload" 
                style={{ color: iconColor }}></i>
            <input type="file" accept="image/*" onChange={onFileChange} />
        </label>
    );
}

FileUploader.propTypes = propTypes;
FileUploader.defaultProps = defaultProps;

export default FileUploader