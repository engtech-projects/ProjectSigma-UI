<template>
  <LayoutBoards title="Announcement Form" class="mb-5">
    <form class="space-y-3 mt-5" @submit.prevent="postAnnouncement">
        <div>
          <label for="announcement-title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input v-model="newAnnouncement.title" type="text" id="announcement-title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Announcement Title" required>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="announcement-date1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Announcement Starts</label>
            <input v-model="newAnnouncement.startDate" type="date" id="announcement-date1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Announcement Title" required>
          </div>
          <div>
            <label for="announcement-date1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Announcement Ends</label>
            <input v-model="newAnnouncement.endDate" type="date" id="announcement-date2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Announcement Title" required>
          </div>
        </div>
        <div>
          <label for="announcement" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Announcement</label>
          <textarea v-model="newAnnouncement.description" id="announcement" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Type your announcement here" required></textarea>
        </div>
  
        <div class="flex space-x-1 justify-end">
          <button type="reset" class="w-18 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Clear</button>
          <button type="submit" class="w-38 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post 
            <Icon name="material-symbols:speaker-notes-outline-rounded" color="white" class="w-5 h-5"/>
          </button>
          
        </div>
      </form>
  </LayoutBoards>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const announcements = ref([]);
const newAnnouncement = ref({
  title: "",
  startDate: "",
  endDate: "",
  description: "",
  editing: false,
});

const postAnnouncement = () => {
  if (
    newAnnouncement.value.title &&
    newAnnouncement.value.description &&
    newAnnouncement.value.startDate &&
    newAnnouncement.value.endDate
  ) {
    newAnnouncement.value.title = "";
    newAnnouncement.value.startDate = "";
    newAnnouncement.value.endDate = "";
    newAnnouncement.value.description = "";
  }
};

</script>