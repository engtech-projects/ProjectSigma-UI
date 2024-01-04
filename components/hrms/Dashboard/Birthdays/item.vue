<template>
  <div class="flex flex-col items-center">
    <img class="rounded w-32 h-28 p-1" :src="data.avatar" alt="Avatar" />
    <h3 class="text-sm sm:text-xs font-medium">{{ data.name }}</h3>
    <h3 class="text-xs font-thin">{{ formatDate(data.birthday) }}</h3>
  </div>
</template>

<script setup>
const data = defineProps(["name", "avatar", "birthday"]);

const formatDate = (date) => {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>
