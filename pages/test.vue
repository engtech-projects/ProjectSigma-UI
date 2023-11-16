<script setup lang="ts">
const accordionItems: { title: string; content: string }[] = [
  {
    title: "Accordion item 01",
    content: "This is the first item accordion body 1",
  },
  {
    title: "Accordion item 02",
    content: "This is the second item accordion body 2",
  },
  {
    title: "Accordion item 03",
    content: "This is the third item accordion body 3",
  },
];
</script>
<template>
  <div class="container mx-auto">
    <div class="w-full lg:max-w-lg">
      <div class="divide-y divide-gray-100">
        <details v-for="(item, index) in accordionItems" :key="index" class="group">
          <summary
            class="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-secondary-900">
            {{ item.title }}
            <div class="text-secondary-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="block h-5 w-5 transition-all duration-300 group-open:rotate-180">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </summary>
          <div class="pb-4 text-secondary-500">{{ item.content }}</div>
        </details>
      </div>
    </div>
  </div>
</template>