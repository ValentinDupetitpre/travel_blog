import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Article from './components/Article'
import Admin from './components/Admin/Admin'

const App = (props) => {

  const goToHome = () => {
    props.history.push('/')
  }

  return (
    <div className="app">
      <header className="app-header" onClick={goToHome}>
          <img src="https://firebasestorage.googleapis.com/v0/b/travel-blog-f8f0d.appspot.com/o/home%2Flogo.png?alt=media&token=059fd9fc-16e5-43a6-9a55-8dd3841e645d" alt='logo'/>
          <h1>De l'ouest aux antipodes</h1>
      </header>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/article/:articleId" render={(props) => <Article {...props} />} />
          <Route exact path="/admin" component={Admin} />
      </Switch>
    </div>
  )
}

export default withRouter(App)
