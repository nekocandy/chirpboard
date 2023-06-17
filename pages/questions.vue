<script setup lang="ts">
definePageMeta({
  layout: 'login',
})
const realmApp = useRealmApp()
const user = realmApp.currentUser

const isLoading = ref(true)
const answeredQuestions = ref(false)
const isApproved = ref<null | boolean>(null)
const isSubmitting = ref(false)

const whyWantToJoin = ref('')

if (!user)
  navigateTo('/')

const userName = user!.profile.name
const userImage = `https://www.gravatar.com/avatar/${md5(user?.profile.email || '')}.jpg?z=2048`

const usersCollection = useCollection('users')

async function checkQuestionsAndStatus() {
  try {
    const userData = await usersCollection.findOne({
      id: user!.id,
    })

    if (!userData)
      return navigateTo('/')

    if (!userData.answers)
      answeredQuestions.value = false
    else
      answeredQuestions.value = true

    isApproved.value = userData.approved
    isLoading.value = false
  }
  catch (error) {
    consola.error('Failed to get user data', error)
  }
}

async function submitAnswers() {
  if (!whyWantToJoin.value) {
    // eslint-disable-next-line no-alert
    return prompt('Please enter a reason to join the platform')
  }

  isSubmitting.value = true

  await usersCollection.findOneAndUpdate(
    {
      id: user!.id,
    },
    {
      $set: {
        answers: {
          whyWantToJoin: whyWantToJoin.value,
        },
      },
    },
  )

  answeredQuestions.value = true
  isApproved.value = null
  isSubmitting.value = false
}

onMounted(async () => {
  await checkQuestionsAndStatus()
})

watch(isApproved, (newValue) => {
  if (newValue === true) {
    const { $toast } = useNuxtApp()
    $toast.info('Welcome! Redirecting you to home!')
    navigateTo('/home')
  }
})
</script>

<template>
  <div relative flex flex-col justify-center gap-4 rounded-md bg-zinc-950 p-8>
    <div absolute bottom-0 left-0 right-0 top-0 z-10 items-center justify-center rounded-md bg-zinc-950 :class="{ flex: isLoading, hidden: !isLoading }">
      <div class="h-8 w-8 text-white" i-line-md-loading-twotone-loop />
    </div>
    <!-- user avatar and info -->
    <div class="flex">
      <div flex items-center gap-4>
        <img class="h-12 w-12 rounded-full" :src="userImage" :alt="`${userName}'s Profile'`">
        <div>{{ userName }}</div>
      </div>
    </div>

    <!-- questions if not answered -->
    <div v-if="!answeredQuestions" flex flex-col gap-3>
      <textarea v-model="whyWantToJoin" placeholder="Why do you want to join the platform?" h-24 w-45vh resize-none border-2 border-zinc-600 rounded-md bg-zinc-900 px-2 py-2 focus:outline-none />

      <button class="relative rounded-full bg-teal-600 px-4 py-2 text-center" @click="submitAnswers">
        <div v-if="isSubmitting" absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-full bg-teal-600>
          <div class="h-8 w-8 text-white" i-line-md-loading-twotone-loop />
        </div>
        Submit!
      </button>
    </div>
    <div v-else relative>
      Approval Status: <span class="font-bold"> {{ isApproved === null ? 'Under Review' : (isApproved ? 'Approved' : 'Denied') }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
