import React, { useCallback, useContext } from "react"
import { withRouter, Redirect } from "react-router"
import { auth } from "../config/firebase"
import AuthService from "../services/authentication";

const Login = ({ history }) => {

  const handleLogin = useCallback(
    async event => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await auth
          .signInWithEmailAndPassword(email.value, password.value)
        history.push("/admin")
      } catch (error) {
        alert(error)
      }
    },[history])

  const { currentUser } = useContext(AuthService.authContext)

  if (currentUser) {
    return <Redirect to="/admin" />
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default withRouter(Login)