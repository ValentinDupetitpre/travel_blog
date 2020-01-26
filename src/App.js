import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Article from './components/Article'
import Admin from './components/Admin/Admin'
import Footer from './components/Footer'

const App = (props) => {

  const goToHome = () => {
    props.history.push('/')
  }

  return (
    <div className="app">
      <header className="app-header" onClick={goToHome}>
          <img src="https://firebasestorage.googleapis.com/v0/b/travel-blog-f8f0d.appspot.com/o/home%2Flogo.png?alt=media&token=94296b11-64f2-43a4-b4bc-61655daff67d" alt='aux antipodes' key="aux-antipodes" title="Accueil"/>
          <h1>Voyage en terre Kiwi</h1>
      </header>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/article/:articleId" render={(props) => <Article {...props} />} />
          <Route exact path="/admin" component={Admin} />
      </Switch>
      <Footer />
    </div>
  )
}

export default withRouter(App)
