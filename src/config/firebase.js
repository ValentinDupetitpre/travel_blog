import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  }
  // Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase