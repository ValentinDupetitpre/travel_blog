import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9aLoeIurIysrayjik-n1ATonk-vgWa5I",
    authDomain: "travel-blog-f8f0d.firebaseapp.com",
    databaseURL: "https://travel-blog-f8f0d.firebaseio.com",
    projectId: "travel-blog-f8f0d",
    storageBucket: "travel-blog-f8f0d.appspot.com",
    messagingSenderId: "29095996582",
    appId: "1:29095996582:web:d3625438176c5e69d8d867",
    measurementId: "G-VNVL2M7DZB"
  }
  // Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase