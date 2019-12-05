import React from 'react'
import firebase from './config/firebase'
import logo from './logo.svg'
import './App.css'
import Preview from './components/Preview'
import CreateArticle from './components/Admin/CreateArticle'
import UpdateArticle from './components/Admin/UpdateArticle'
import Carousel from './components/Carousel'
import AddCarousel from './components/Admin/AddCarousel';
import UpdateCarousel from './components/Admin/UpdateCarousel';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        Blog de voyage en NZ des deux chatons !
      </header>
      <Carousel />
        <Preview />
        <AddCarousel />
        <UpdateCarousel />
         <CreateArticle />
        <UpdateArticle />
    </div>
  )
}

export default App
