<script setup lang="ts">
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

definePageMeta({
  layout: 'login',
})

async function signIn() {
  try {
    const authProvider = new GoogleAuthProvider()
    const auth = getAuth()
    await signInWithPopup(auth, authProvider)
  }
  catch (error: any) {
    consola.error('[FIREBASE] [AUTH] Failed to sign in', error)
    // eslint-disable-next-line no-alert
    alert(`Failed to sign in ${error.message}`)
  }
}
</script>

<template>
  <div rounded-md bg-zinc-950 p-8>
    <button class="flex items-center gap-2 border-2 border-zinc-900 rounded-md bg-zinc-800 px-12 py-4 hover:bg-opacity-90" @click="signIn">
      <div i-ri-google-fill />
      Sign In
    </button>
  </div>
</template>

<style scoped>

</style>
