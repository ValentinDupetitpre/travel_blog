import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import AuthService from "../services/authentication"

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const {currentUser} = useContext(AuthService.authContext)
  return (
    <Route {...props}
      render={routeProps =>
        !!currentUser ? <RouteComponent {...routeProps} /> : <Redirect to={"/login"} />
      }
    />
  )
}


export default PrivateRoute