<script setup lang="ts">
import { getAuth } from 'firebase/auth'

const realmApp = useRealmApp()

const PATHS = [
  {
    icon: 'i-mingcute-sydney-opera-house-line',
    name: 'Home',
    path: '/home',
  },
  {
    icon: 'i-mingcute-hashtag-fill',
    name: 'Hashtags',
    path: '/hashtags',
  },
  {
    icon: 'i-mingcute-user-3-line',
    name: 'Profile',
    path: `/profile/${realmApp.currentUser?.id}`,
  },
]

const userName = toRef(realmApp.currentUser?.profile.name)
const userImage = getGravatarImageURL(realmApp.currentUser?.profile.email || '')
const notificationPermission = ref<'loading' | 'granted' | 'denied' | 'default'>('loading')

async function logout() {
  const auth = getAuth()
  await auth.signOut()
  await realmApp.currentUser?.logOut()
  navigateTo('/')
}

async function askForNotificationPermission() {
  const permission = await Notification.requestPermission()
  notificationPermission.value = permission
}

onMounted(() => {
  askForNotificationPermission()
})
</script>

<template>
  <div h-full w-full flex flex-col justify-between>
    <!-- start -->
    <div class="flex flex-col gap-4">
      <NuxtLink to="/home" class="group" flex cursor-pointer items-center gap-4 pl-3>
        <div
          i-game-icons-nest-birds h-12 w-12 text-teal-400
        />

        <span text-2xl font-black group-hover="underline underline-wavy underline-teal-400">
          ChirpBoard
        </span>
      </NuxtLink>

      <div flex flex-col pt-2>
        <NuxtLink
          v-for="path in PATHS" :key="path.path"
          :to="path.path"
          class="group"
          :class="{ 'font-bold': $route.path === path.path }"

          flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3
          hover="bg-white/10"
        >
          <div
            :class="path.icon" h-8 w-8
          />

          <span text-xl>
            {{ path.name }}
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- end -->
    <div flex flex-col gap-2>
      <div
        :class="{
          'bg-teal-300/10': notificationPermission === 'granted' || notificationPermission === 'default',
          'bg-red/10': notificationPermission === 'denied',
          'bg-zinc-900': notificationPermission === 'loading',
        }"
        relative z-10 flex items-center justify-center gap-2 rounded-lg px-4 py-3
      >
        <div v-if="notificationPermission === 'loading'" class="bg-yellow-900" absolute bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center rounded-lg>
          <div class="h-6 w-6 text-white" i-line-md-loading-twotone-loop />
        </div>

        <div i-mingcute-notification-line h-5 w-5 />
        <span text-sm font-light>
          {{
            notificationPermission === 'granted' ? 'Notifications Enabled' : 'Notifications Disabled'
          }}
        </span>
      </div>

      <!-- logout -->
      <button class="group" hover="bg-red/10" flex cursor-pointer items-center justify-between gap-2 rounded-xl px-4 py-3 @click="logout">
        <div flex items-center gap-2>
          <img :src="userImage" h-8 w-8 rounded-full :alt="`${userName}'s pfp'`">
          {{ userName }}
        </div>

        <div i-mingcute-align-arrow-right-fill h-6 w-6 text-red-800 group-hover="text-red" />
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
