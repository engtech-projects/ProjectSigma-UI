<template>
  <LayoutBoards title="Announcement">
    <HrmsDashboardAnnouncementHeadline
      v-for="data in datas"
      class="mb-4 mt-2"
      :key="data.id"
      :title="data.title"
      :date="formatDate(data.date)"
      :content="data.content"
    />

    <HrmsDashboardAnnouncementCard
      v-for="(data, index) in cardDatas"
      :key="index"
      :title="data.title"
      :date="formatDate(data.date)"
      :content="data.content"
    />
  </LayoutBoards>


</template>

<script setup>
const datas = ref([

  {
    id: 1,
    title: "Happy New Year!",
    date: "2024-01-01",
    content: "A prosperous New Year. Wish everyone success, health and happiness!",
  },

]);

const cardDatas = ref([
  {
    id: 1,
    title: "Important Update",
    date: "2024-01-05",
    content: "We have an important update regarding our upcoming projects. Please stay tuned!",
  },
  {
    id: 2,
    title: "Welcome New Team Members",
    date: "2024-01-10",
    content: "Let's welcome our new team members who joined us this month. Exciting times ahead!",
  },
  // Add more card announcements as needed
]);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
</script>
