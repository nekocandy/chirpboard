import type { FirebaseApp } from 'firebase/app'
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import consola from './consola'

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

const messaging = getMessaging()

onMessage(messaging, (payload) => {
  const { title, ...options } = payload.notification!

  // eslint-disable-next-line no-new
  new Notification(title || 'No title', options)
})

export async function getMessageToken(vapidKey: string) {
  try {
    await Notification.requestPermission()
    const token = getToken(messaging, {
      vapidKey,
    })

    return token
  }
  catch (error) {
    consola.error('Notification permission denied', error)
    return null
  }
}

export default app
