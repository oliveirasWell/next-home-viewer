import firebase from 'firebase'

export const firebaseConfig = {
  apiKey: process.env.API_KEY_FIREBASE,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
}

export const firebaseDatabase = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig).database()
  : firebase.app().database()
