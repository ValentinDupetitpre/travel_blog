import React, {useState, useEffect} from 'react'
import { auth } from '../config/firebase'

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          setCurrentUser(user)
        })
      }, [])
      return currentUser
}

const authContext = React.createContext()

export default {useAuth, authContext}