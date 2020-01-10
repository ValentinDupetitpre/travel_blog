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
          Blog de voyage en NZ  !
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
