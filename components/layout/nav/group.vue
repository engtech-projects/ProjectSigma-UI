<template>
  <!-- data-collapse-toggle="dropdown-attendance" -->
  <div :class="data.hide">
    <button
    type="button"
    class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group   dark:text-white  "
    aria-controls="dropdown-sales"
    :data-collapse-toggle='data.id'
    @click="dp=!dp"
    >
    <Icon
    :name='icon'
    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
    fill="currentColor"
    />
    <span class="flex-1 ml-3 text-left whitespace-nowrap"
    >{{ data.title }}</span
    >
    
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
    <ul :id='data.id' class="hidden py-2 space-y-2">
      <slot>
      </slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const data = defineProps(['id','title','icon','hide']);
  const dp = ref(true);
</script>