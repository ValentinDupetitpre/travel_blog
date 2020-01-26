import React from 'react'
import './Home.css'
import Preview from './components/Preview'
import Carousel from './components/Carousel'

const Home = () => {
  return (
    <div className="home">
        <Carousel />
        <section className="presentation">
          <h3>Présentation</h3>
          <hr />
          <h5>De l'ouest aux antipodes : Bienvenue sur notre blog !</h5>
          <div className="text-wrapper">
            <div className="text left">
              <p>Ce blog est un carnet de voyage retraçant à travers différents articles nos découvertes, nos émotions, nos rencontres …</p>
              <p>Notre voyage nous emmènera de l’Europe en Asie, puis en Océanie où nous avons décidé de poser nos valises pendant 12 mois en Nouvelle-Zélande.</p> 
              <p>Qui sommes-nous ?</p>
              <div className="persons">
                <p className="person"><strong>Hélène :</strong> 26 ans, amatrice de vin rouge, Mayennaise de naissance et nantaise de cœur</p>
                <p className="person"><strong>Valentin :</strong> 27 ans, Sharky pour les intimes, Angevin et surfeur à ses heures perdues</p>
              </div>
            </div>
            <div className="text right">
              <p>Elevés en plein air dans la région du Maine et de l'Anjou pendant notre tendre enfance, nous sommes un couple d’ex-parisiens qui avons décidé de partir à l’aventure en 2020. </p>
              <p>Munissez-vous de votre visa de lecteur et installez-vous confortablement dans votre canapé, nous vous emmenons avec nous à travers nos aventures !</p>
              <p>Merci d’être présent ici, en espérant que ce voyage vous fera autant plaisir qu’à nous. </p>
              <p className="signature"><strong>Hélène et Valentin</strong></p>
            </div>
          </div>
        </section>
        <Preview />
    </div>
  )
}

export default Home
