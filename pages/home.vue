<script setup lang="ts">
import type { PostEmit } from '~/utils/types'

const postsLoading = ref(true)

async function getAllPosts() {
  postsLoading.value = true
  const postsCollection = useCollection('posts')
  const allPosts = await postsCollection.find({})
  const sortedPosts = computed(() => allPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))

  globalPostState.value = sortedPosts.value
  postsLoading.value = false
}

function addPost(post: PostEmit) {
  globalPostState.value.unshift(post)
}

function addLike(userId: string, postId: string) {
  const post = globalPostState.value.find(post => post.id === postId)
  if (!post)
    return

  post.likedBy.push(userId)
}

function removeLike(userId: string, postId: string) {
  const post = globalPostState.value.find(post => post.id === postId)
  if (!post)
    return

  const index = post.likedBy.indexOf(userId)
  if (index === -1)
    return

  post.likedBy.splice(index, 1)
}

onMounted(async () => {
  await getAllPosts()
})

watch(isAtlasSearch, async (newIsAtlasSearch) => {
  if (!newIsAtlasSearch)
    await getAllPosts()
})
</script>

<template>
  <div vue-auto-animate h-full w-full flex flex-col transform gap-4 transition duration-1000>
    <PostCreate @add-post="addPost" />
    <div w-full border-b border-zinc-700 />
    <div v-if="isAtlasSearch" class="underline underline-teal underline-double">
      Atlas Search Results:
    </div>
    <div v-if="postsLoading" flex items-center justify-center>
      <div i-mingcute-loading-3-line h-6 w-6 animate-spin />
    </div>
    <div v-else-if="globalPostState.length" flex flex-col gap-2 pr-3>
      <PostDisplay v-for="post in globalPostState" :id="post.id" :key="post.id" :text="post.text" :user-id="post.userId" :user-name="post.userName" :user-image="post.userImage" :created-at="new Date(post.createdAt)" :liked-by="post.likedBy" @add-like="addLike" @remove-like="removeLike" @get-all-posts="getAllPosts" />
    </div>
    <div v-else pr-3>
      <div v-if="isAtlasSearch" class="text-center">
        No results found.
      </div>
      <div v-else class="text-center">
        No posts found.
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
