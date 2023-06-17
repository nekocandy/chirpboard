import type { PostEmit } from './types'

export const globalPostState = ref<PostEmit[]>([])

export const isAtlasSearch = ref(false)
