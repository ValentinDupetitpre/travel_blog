import React from 'react'
import './Home.css'
import Preview from './components/Preview'
import Carousel from './components/Carousel'

import Admin from './components/Admin/Admin'

const Home = () => {
  return (
    <div className="home">
        <Carousel />
        <section className="presentation">
          <h3>Présentation</h3>
          <hr />
          <div className="text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus cras adipiscing enim eu turpis egestas pretium. Nisl pretium fusce id velit ut. Enim diam vulputate ut pharetra. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus cras adipiscing enim eu turpis egestas pretium. Nisl pretium fusce id velit ut. Enim diam vulputate ut pharetra. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui.</p>
          </div>
        </section>
        <Preview />
    </div>
  )
}

export default Home
