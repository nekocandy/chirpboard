<script setup lang="ts">
import type { PostEmit } from '~/utils/types'

const props = defineProps<PostEmit>()
const emit = defineEmits(['getAllPosts', 'addLike', 'removeLike'])
const realmApp = useRealmApp()
const { $toast } = useNuxtApp()

const liked = ref(props.likedBy.includes(realmApp.currentUser?.id || 'nothisIDwontbethere'))
const isLikedLoading = ref(false)
const isDeleteLoading = ref(false)

async function handleLike() {
  isLikedLoading.value = true
  if (liked.value) {
    await realmApp.currentUser?.callFunction('unlikePost', props.id)
    emit('removeLike', realmApp.currentUser?.id, props.id)
  }

  else {
    await realmApp.currentUser?.callFunction('likePost', props.id, props.userId)
    emit('addLike', realmApp.currentUser?.id, props.id)
  }

  $toast.success(`${liked.value ? 'Unlike\'d' : 'Liked'} the post!`)
  liked.value = !liked.value
  isLikedLoading.value = false
}

async function deletePost() {
  isDeleteLoading.value = true
  const res = await realmApp.currentUser?.callFunction('deletePost', props.id)
  if (res === true) {
    $toast.success('Deleted the post!')
    emit('getAllPosts')
  }
  else {
    $toast.error('Failed to delete the post!')
  }

  isDeleteLoading.value = false
}
</script>

<template>
  <div flex flex-col gap-3 border border-zinc-600 rounded-md px-4 py-4>
    <div flex items-center justify-between gap-2>
      <NuxtLink :to="`/profile/${userId}`" flex items-center gap-2 hover="underline underline-wavy">
        <img h-6 w-6 rounded-full :src="$props.userImage" alt="pfp">
        <span>{{ $props.userName }}</span>
      </NuxtLink>

      <div flex gap-2>
        <div v-if="realmApp.currentUser?.id === $props.userId">
          <div v-if="isDeleteLoading" i-mingcute-loading-3-line animate-spin text-red />
          <div v-else title="Delete Post" i-mingcute-delete-2-line cursor-pointer text-red hover="text-red i-mingcute-delete-2-fill" @click="deletePost" />
        </div>
        <div flex transform cursor-pointer items-center gap-1 transition-all @click="handleLike">
          <div v-if="isLikedLoading" i-mingcute-loading-3-line animate-spin />
          <div v-else-if="!liked" title="Like Post" i-mingcute-heart-line text-pink />
          <div v-else title="Unlike Post" i-mingcute-heart-fill text-pink />

          <span text-xs text-zinc-400>{{ $props.likedBy.length }}</span>
        </div>
      </div>
    </div>
    {{ $props.text }}
  </div>
</template>

<style scoped>

</style>
