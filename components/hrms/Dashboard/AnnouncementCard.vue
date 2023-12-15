<template>
  <div class="block max-w-screen p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <div class="flex items-center justify-between mb-1
     text-lg font-semibold text-gray-900 dark:text-white">
      <h3 class="text-lg">{{  title  }}</h3>

      <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">Latest</span>
    </div>

    <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{  date  }}</time>

    <div class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
      {{ content.slice(0, maxContentLength) }}
      <span v-if="content.length > maxContentLength && !isFirstCard" @click="toggleExpand" class="text-blue-700 cursor-pointer hover:underline dark:text-blue-300">... View All</span>
      <!-- {{ content }} -->
    </div>

    <div v-if="expandContent && !isFirstCard" class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
      {{ content }}
      <span @click="toggleExpand" class="text-blue-700 cursor-pointer hover:underline dark:text-blue-300"> Show Less</span>
    </div>
  </div>
  
</template> 

<script setup lang="ts">
import { ref } from 'vue';
import { defineProps } from 'vue';

const { title, date, content, index } = defineProps(['title', 'date', 'content', 'index']);
const maxContentLength = 100; // Adjust the maximum length you want to show initially
const expandContent = ref(false);

const isFirstCard = index === 0;

const toggleExpand = () => {
  expandContent.value = !expandContent.value;
};
</script>