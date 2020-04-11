import React, { useEffect, useState } from "react"
import { auth } from "../config/firebase"
import AuthService from "../services/authentication"

const Authentication = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    })
  }, [])

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthService.authContext.Provider value={{currentUser}}>
      {children}
    </AuthService.authContext.Provider>
  )
}

export default Authentication