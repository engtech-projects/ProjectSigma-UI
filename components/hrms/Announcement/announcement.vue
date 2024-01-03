<template>
  <div class="flex gap-6">
    <div class="w-full md:max-w-screen-lg max-w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700 h-96 overflow-auto">
  
      <form class="space-y-3 " @submit.prevent="postAnnouncement">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b">Announcements</h5>
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
  
    </div>
  
    <div class="w-full md:max-w-screen-lg max-w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700 h-96 overflow-auto">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b">Announcement List</h5>
      <div v-if="announcements.length > 0" class="max-h-80 overflow-auto p-2">

        <ol class="border-gray-200 dark:border-gray-700">
          <li v-for="(announcement, index) in announcements" :key="index" class="mb-4 border-2 p-2 rounded-lg">
            <div class="grid grid-cols-2">

              <div class="flex flex-col mb-4 text-md font-medium leading-none text-black dark:text-gray-500">
                <div class="mb-5">{{ formatMonthYear(announcement.startDate) }}</div>
                <div  v-if="!announcement.editing">{{ announcement.title }}</div>
                <input v-else v-model="announcement.title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
              </div>

              <div class="flex flex-col justify-start ml-auto">
                <div class="mb-5 text-xs text-gray-600 dark:text-gray-500">
                  {{ formatDate(announcement.startDate) }} - {{ formatDate(announcement.endDate) }}
                </div>
                <div class="flex justify-end ml-auto">
                  <button @click="editAnnouncement(index)" v-if="!announcement.editing" class="text-blue-700 dark:text-blue-300 hover:underline cursor-pointer"><Icon name="material-symbols:edit-square-outline-rounded" color="gray" class="w-5 h-5"/></button>
                  <button @click="saveAnnouncement(index)" v-else class="text-blue-700 dark:text-blue-300 hover:underline cursor-pointer"><Icon name="material-symbols:save-outline-rounded" color="green" class="w-5 h-5"/></button>
                  <button @click="deleteAnnouncement(index)" class="text-red-700 dark:text-red-300 hover:underline cursor-pointer"><Icon name="material-symbols:auto-delete-outline-rounded" color="red" class="w-5 h-5"/></button>
                </div>
              </div>
            </div>
            <p class="mt-5 text-gray-500 dark:text-gray-400" v-if="!announcement.editing">{{ announcement.description }}</p>
            <textarea v-else v-model="announcement.description" class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></textarea>
          </li>
        </ol>
      </div>
    </div>
  </div>
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
    announcements.value.push({ ...newAnnouncement.value });
    newAnnouncement.value.title = "";
    newAnnouncement.value.startDate = "";
    newAnnouncement.value.endDate = "";
    newAnnouncement.value.description = "";
  }
};

const editAnnouncement = (index) => {
  announcements.value[index].editing = true;
};

const saveAnnouncement = (index) => {
  announcements.value[index].editing = false;
};

const deleteAnnouncement = (index) => {
  announcements.value.splice(index, 1);
};

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const formatMonthYear = (date) => {
  const options = { year: "numeric", month: "long" };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>