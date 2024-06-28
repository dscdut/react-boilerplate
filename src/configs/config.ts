import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBUJT56xRJIatx7GzBWowubWdnJ7BSc7vg',
  authDomain: 'gdsc-boilerplate.firebaseapp.com',
  projectId: 'gdsc-boilerplate',
  storageBucket: 'gdsc-boilerplate.appspot.com',
  messagingSenderId: '533322339814',
  appId: '1:533322339814:web:6bb50c3bf9990957c5b227',
  measurementId: 'G-Y6Q2RQEZJP'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore(app)
export default app
