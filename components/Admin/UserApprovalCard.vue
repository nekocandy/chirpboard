<script setup lang="ts">
const props = defineProps({
  id: String,
  name: String,
  email: String,
  whyWantToJoin: String,
})

const emit = defineEmits(['removeUserFromList'])

const { $toast } = useNuxtApp()
const isUserApproved = ref<boolean | null>(null)

const imageURL = computed(() => {
  return `https://www.gravatar.com/avatar/${md5(props.email)}.jpg?z=2048`
})

async function setApprovalStatus() {
  const realmApp = useRealmApp()
  const realmUser = realmApp.currentUser
  if (!realmUser)
    return navigateTo('/login')

  await realmUser.functions.approveUser(props.id, isUserApproved.value)

  if (isUserApproved.value)
    $toast.success(`${(props.name ?? 'John Doe').split(' ')[0]} has been approved!`)
  else
    $toast.error(`${(props.name ?? 'John Doe').split(' ')[0]} has been denied!`)

  emit('removeUserFromList', props.id)
}

watch(isUserApproved, async (newValue) => {
  if (newValue === null)
    return

  await setApprovalStatus()
})
</script>

<template>
  <div flex flex-col gap-6 border-2 border-zinc-700 rounded-md px-4 py-4>
    <div flex items-center gap-4>
      <img :src="imageURL" class="h-8 w-8 rounded-full">
      {{ name }}
    </div>

    <div>
      {{ whyWantToJoin }}
    </div>

    <div class="w-full flex items-center gap-4">
      <button w-full flex items-center justify-center gap-2 rounded-full bg-teal-600 px-4 py-1 @click="isUserApproved = true">
        <div i-ion-md-checkmark-circle-outline />
        Approve
      </button>
      <button w-full flex items-center justify-center gap-2 rounded-full bg-red-900 px-4 py-1 @click="isUserApproved = false">
        <div i-streamline-interface-user-block-actions-block-close-denied-deny-geometric-human-person-single-up-user />
        Deny
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
