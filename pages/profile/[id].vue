<script setup lang="ts">
import type { PostEmit } from '~/utils/types'

const route = useRoute()
const userId = route.params.id!

const usersCollection = useCollection('users')
const postsCollection = useCollection('posts')
const { $toast } = useNuxtApp()

const userInfo = await usersCollection.findOne({ id: userId })
if (!userInfo) {
  $toast.error('User not found!')
  navigateTo('/home')
}

const userName = ref(userInfo.name)
const userImage = getGravatarImageURL(userInfo.email || 'giveussomerandomavatar')
const isPostsLoading = ref(true)
const posts = ref<PostEmit[]>([])

async function getAllUserPosts() {
  isPostsLoading.value = true

  try {
    const databasePosts: PostEmit[] = await postsCollection.find({ userId })
    posts.value = databasePosts
  }
  catch (error) {
    $toast.error('Failed to get posts!')
    consola.error('[PROFILE PAGE]', error)
  }
  finally {
    isPostsLoading.value = false
  }
}

onMounted(async () => {
  await getAllUserPosts()
})
</script>

<template>
  <div h-full flex flex-col gap-4 overflow-y-hidden>
    <div class="h-1/3 bg-[url(/bg.gif)]" w-full flex items-end justify-start gap-2 rounded-xl bg-cover bg-center px-2 py-4>
      <div flex items-center gap-2>
        <img h-16 w-16 rounded-full :src="userImage" alt="">

        <div flex flex-col gap-1>
          <h1 class="text-2xl font-bold text-white shadow-2xl" underline="~ wavy">
            {{ userName }}
          </h1>
          <p class="text-white/70">
            Posts: {{ posts.length }}
          </p>
        </div>
      </div>
    </div>
    <div flex flex-1 flex-col gap-3 overflow-y-auto pb-4>
      <div underline="~ double teal" text-2xl>
        Posts
      </div>
      <div v-if="isPostsLoading" flex items-center justify-center>
        <div i-mingcute-loading-3-line h-6 w-6 animate-spin />
      </div>
      <div v-else-if="posts.length" class="flex flex-col gap-2">
        <PostDisplay v-for="post in posts" :id="post.id" :key="post.id" :text="post.text" :user-id="post.userId" :user-name="post.userName" :user-image="post.userImage" :created-at="new Date(post.createdAt)" :liked-by="post.likedBy" @get-all-posts="getAllUserPosts" />
      </div>
      <div v-else class="text-center">
        You haven't posted anything, start now!
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
