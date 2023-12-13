<template>
    <NuxtLink
        :to = "data.linkarea"
        class="flex items-center p-2 stext-base font-medium text-gray-900 rounded-lg dark:text-white group"
        >
        <Icon
          :name="icon"
          class="flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
        />
        <span class="ml-3">{{  data.singleNavTitle   }}</span>
    </NuxtLink>
</template>

<script setup lang="ts">
  const data = defineProps(['singleNavTitle','linkarea','icon']);
</script>