<template>
  <li>
    <button
      type="button"
      class="flex items-center w-full uppercase text-xs font-bold text-gray-900 rounded-lg transition duration-75 group dark:text-white  "
      :data-collapse-toggle="data.id"
      aria-expanded="true"
      @click="dp=!dp"
    >
      <span class="flex-1 text-left whitespace-nowrap">
        {{ data.title }} 
      </span>
      <Icon
        v-if="dp"
        name="mdi:chevron-up"
        class="w-6 h-6"
        fill="currentColor"
      />
      <Icon
        v-else
        name="mdi:chevron-down"
        class="w-6 h-6"
        fill="currentColor"
      />
    </button>
    <ul :id="data.id" class="py-2 space-y-2">
      <slot>
      </slot>
    </ul>
  </li>
</template>

<script setup lang="ts">
  const data = defineProps(['title','id']);
  const dp = ref(true);
</script>