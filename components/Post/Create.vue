<script setup lang="ts">
const emit = defineEmits(['addPost'])
const realmApp = useRealmApp()
const userName = realmApp.currentUser?.profile.name
const userImage = getGravatarImageURL(realmApp.currentUser?.profile.email || '')
const chirpText = ref('')
const isCreatingPost = ref(false)

const { Ctrl_enter } = useMagicKeys()

async function post() {
  if (chirpText.value.length === 0)
    return

  isCreatingPost.value = true
  const realm = useRealmApp()
  const id = nanoid()

  await realmApp.currentUser?.functions.callFunction('addPost', { id, text: chirpText.value, userId: realm.currentUser?.id, userName, userImage, likedBy: [], createdAt: new Date() }, userName)
  emit('addPost', {
    id,
    text: chirpText.value,
    userId: realm.currentUser?.id,
    userName,
    userImage,
    likedBy: [],
    createdAt: new Date(),
  })
  chirpText.value = ''
  isCreatingPost.value = false
}

watch(Ctrl_enter, async (value) => {
  if (value)
    await post()
})
</script>

<template>
  <div flex flex-col px-4 py-4>
    <div flex flex-col items-center gap-4>
      <div flex items-center gap-4>
        <img h-10 w-10 rounded-full :src="userImage" :alt="userName"> {{ userName }}
      </div>
      <textarea v-model="chirpText" placeholder="Chirp about something" w-full resize-none border border-zinc-700 rounded-lg bg-zinc-800 px-2 py-2 focus:outline-none />

      <button vue-auto-animate transform self-end rounded-md bg-teal bg-opacity-30 px-4 py-2 @click="post">
        <div :class="{ hidden: !isCreatingPost }" i-mingcute-loading-3-line h-6 w-6 animate-spin />
        <div :class="{ hidden: isCreatingPost }">
          Chirp
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
