<script setup lang="ts">
interface User {
  id: string
  name: string
  email: string
  whyWantToJoin: string
  answers?: {
    whyWantToJoin: string
  }
}

const isLoading = ref(true)
const users = ref<User[]>([])

function removeUserFromList(userId: string) {
  users.value = users.value.filter(user => user.id !== userId)
}

async function fetchUsers() {
  isLoading.value = true
  const realmApp = useRealmApp()
  const realmUser = realmApp.currentUser
  if (!realmUser)
    return navigateTo('/login')

  const usersCollection = useCollection('users')
  const usersFromDb: User[] = await usersCollection.find({ approved: null })

  users.value = usersFromDb.filter(user => !!user.answers)
  isLoading.value = false
}

onMounted(async () => {
  await fetchUsers()
})
</script>

<template>
  <div absolute bottom-0 left-0 right-0 top-0 flex flex-col gap-6 p-8>
    <div class="flex items-center gap-2 text-xl font-black">
      <NuxtLink to="/home">
        <div i-mingcute-arrow-left-fill />
      </NuxtLink>
      <div i-ic-outline-local-police h-8 w-8 />
      <span underline underline-teal underline-double>Approval Queue</span>
      <div v-if="isLoading" i-line-md-loading-twotone-loop h-5 w-5 />
    </div>

    <div v-if="isLoading" flex items-center gap-2 px-4 text-zinc-400>
      <div i-line-md-loading-twotone-loop h-8 w-8 />
      Loading...
    </div>
    <div v-else-if="users.length" v-auto-animate class="grid grid-cols-1 gap-4">
      <AdminUserApprovalCard
        v-for="user in users"
        :id="user.id"
        :key="user.id"
        :name="user.name"
        :email="user.email"
        :why-want-to-join="(user as any).answers.whyWantToJoin"
        @remove-user-from-list="removeUserFromList"
      />
    </div>
    <div v-else-if="!users.length" px-4 text-zinc-400>
      No users to approve!
    </div>
  </div>
</template>

<style scoped>

</style>
