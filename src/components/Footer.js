import React from 'react'

import './Footer.css'

const Footer = (props) => {

    return(
        <footer className="footer-wrapper">
            {/* <div className="pictos"> */}
                <a href="https://www.instagram.com/lngvhelene/?hl=fr" target="_blank">
                    <img className="insta" alt="instagram" src="https://firebasestorage.googleapis.com/v0/b/travel-blog-f8f0d.appspot.com/o/home%2Finstagram.png?alt=media&token=17ebac78-e315-46aa-941c-c5c03241ddf2"/>
                </a>
                <div className="email">
                    <img alt="email" src="https://firebasestorage.googleapis.com/v0/b/travel-blog-f8f0d.appspot.com/o/home%2Femail.svg?alt=media&token=180f7710-2480-4cd3-aa5e-b7f1dd70131c"/>
                    valentin.dupetitpre@gmail.com
                </div>
            {/* </div> */}
            <p className="copyright">© Copyrights</p>
        </footer>
    )
}

export default Footer