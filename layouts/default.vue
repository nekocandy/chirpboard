<script setup lang="ts">

</script>

<template>
  <div bg-zinc-900 font-mono>
    <div max-w-8xl grid grid-cols-1 mx-auto h-screen gap-4 overflow-y-hidden px-4 py-6 text-white lg:grid-cols-12>
      <div col-span-3 border-r border-zinc-700 pr-4>
        <HomePlatformInfo />
      </div>
      <div col-span-6 overflow-y-auto>
        <slot />
      </div>

      <div col-span-3 border-l border-zinc-700 pr-4>
        <HomeSearch />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
