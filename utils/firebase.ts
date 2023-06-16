import type { FirebaseApp } from 'firebase/app'
import { getApp, getApps, initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyAl9OBBZtFsxzX0A79XY5YhDzdRKlG2Iew',
  authDomain: 'chirpboard-6ef65.firebaseapp.com',
  projectId: 'chirpboard-6ef65',
  storageBucket: 'chirpboard-6ef65.appspot.com',
  messagingSenderId: '232246526337',
  appId: '1:232246526337:web:e1ed45afe830e227f6e880',
}

// eslint-disable-next-line import/no-mutable-exports
let app: FirebaseApp

if (getApps().length)
  app = getApp()

else
  app = initializeApp(firebaseConfig)

export default app
