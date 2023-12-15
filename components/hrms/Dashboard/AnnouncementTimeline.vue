<template>
  <LayoutBoards title="Announcement">
    <HrmsDashboardAnnouncementCard
      v-for="data in datas"
      class="mb-4 mt-2"
      :key="data.id"
      :title="data.title"
      :date="formatDate(data.date)"
      :content="data.content"
    />
  </LayoutBoards>


</template>

<script setup>

const datas = ref([
  { id: 1, title: 'Announcement 1', date: '2023-01-13', content: 'Road Concreting worth 31M - Agusan Del Norte' },
  { id: 2, title: 'Announcement 2', date: '2023-01-14', content: 'Another announcement content' },
  { id: 3, title: 'Announcement 3', date: '2023-01-14', content: 'Another announcement content' },

]);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};


</script>
