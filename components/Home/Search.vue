<script setup lang="ts">
import type { PostEmit } from '~/utils/types'

const realmApp = useRealmApp()
const isLoading = ref(false)
const searchText = ref('')

watch(searchText, async (newVal, oldVal) => {
  if (!newVal.length) {
    isAtlasSearch.value = false
    return
  }

  isAtlasSearch.value = true
  isLoading.value = true
  const foundPosts: PostEmit[] = await realmApp.currentUser?.functions.callFunction('searchPost', searchText.value)
  globalPostState.value = foundPosts

  isLoading.value = false
})
</script>

<template>
  <div h-full flex flex-col justify-between gap-8 px-4>
    <div flex transform items-center gap-2 transition-all duration-700>
      <div v-if="isLoading">
        <div i-line-md-loading-twotone-loop h-5 w-5 />
      </div>

      <input v-model="searchText" type="text" placeholder="Search the platform" w-full border border-zinc-700 rounded-md bg-zinc-800 px-2 py-2>
    </div>

    <div flex flex-col items-center gap-2>
      <div i-devicon-mongodb-wordmark h-12 w-12 />
      <span text-zinc-400>
        Heavily Relies on
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>
