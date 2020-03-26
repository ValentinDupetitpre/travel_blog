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
        <div className="general-info">
          <h3>Informations générales : nous indiquerons ici notre situation de vie quotidienne</h3>
          <p>Aujourd'hui lundi 23 Mars 2020 à 13h30, Jacinda Ardern, première ministre Néo-Zélandaise a indiqué un passage au niveau d'alerte 3 immédiatement et un passage au niveau 4 (sur 4) dans les 48h. 
            Cela veut dire que nous devons nous confiner totalement ici et que seuls les commerces nécessaires resteront ouvert. Ils resteront ravitaillés tout le long du confinement. Nous avons trouvé en dernière
            minute une maison dans la banlieue d'Auckland. Nous avons beaucoup de chance car la maison est grande et rien que pour nous pour pas trop cher. Le confinement total en Nouvelle Zélande implique que l'on peut sortir tant qu'on reste éloignés des autres personnes.
          </p>
          <p>Pas d'inquiétudes à avoir pour nous ! Nous sommes en bonne santé, dans une grande maison. 
            Nous sommes juste un peu frustré de ne pas pouvoir parcourir ce beau pays pour l'instant et de dépenser de l'argent pour un loyer pendant un mois.
          </p>
          <p>Si vous voulez davantage d'informations n'hésitez pas à nous écrire ;)
          </p>
        </div>
        <Preview />
    </div>
  )
}

export default Home
