<script lang="ts" setup>
import '@unocss/reset/tailwind.css'
import { getAuth } from 'firebase/auth'
import { Credentials } from 'realm-web'
import app from './utils/firebase'

const realmApp = useRealmApp()

consola.info('Initializing Firebase!', app)

onMounted(() => {
  const auth = getAuth()

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userIdToken = await user.getIdToken()
      const credentials = Credentials.jwt(userIdToken)

      try {
        const realmUser = await realmApp.logIn(credentials)
        if (realmUser) {
          // TODO: get notification permission and call atlas function to store notification token
        }

        navigateTo('/questions')
      }
      catch (error: any) {
        consola.error('[REALM] Failed to log in', error)
      }
    }
  })
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
