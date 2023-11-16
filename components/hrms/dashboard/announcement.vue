<template>
  <div class="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700 h-96 overflow-auto">
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

    
    <!-- Announcement Timeline -->
    <div v-if="announcements.length > 0" class="max-h-80 overflow-auto p-2">
      <hr class="my-3">
      <ol class="relative border-l border-gray-200 dark:border-gray-700 p-2">
        <li v-for="(announcement, index) in announcements" :key="index" class="mb-2 border-2 p-1 rounded-md">
          <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <div class="mb-1 text-md font-bold leading-none text-green-500 dark:text-gray-500">{{ formatMonthYear(announcement.startDate) }}</div>
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-4 mb-4">
              <h3 class="text-md font-medium text-cyan-600 dark:text-white" v-if="!announcement.editing">{{ announcement.title }}</h3>
              <input v-else v-model="announcement.title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
              <div class="text-[10px] text-gray-500 dark:text-gray-500">
                {{ formatDate(announcement.startDate) }} - {{ formatDate(announcement.endDate) }}
              </div>
              
            </div>
            <div>
              <button @click="editAnnouncement(index)" v-if="!announcement.editing" class="text-blue-700 dark:text-blue-300 hover:underline cursor-pointer"><Icon name="material-symbols:edit-square-outline-rounded" color="gray" class="w-5 h-5"/></button>
              <button @click="saveAnnouncement(index)" v-else class="text-blue-700 dark:text-blue-300 hover:underline cursor-pointer"><Icon name="material-symbols:save-outline-rounded" color="green" class="w-5 h-5"/></button>
              <button @click="deleteAnnouncement(index)" class="text-red-700 dark:text-red-300 hover:underline cursor-pointer"><Icon name="material-symbols:auto-delete-outline-rounded" color="red" class="w-5 h-5"/></button>
            </div>
          </div>
          <p class="text-gray-500 dark:text-gray-400" v-if="!announcement.editing">{{ announcement.description }}</p>
          <textarea v-else v-model="announcement.description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></textarea>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      announcements: [],
      newAnnouncement: {
        title: "",
        startDate: "",
        endDate: "",
        description: "",
        editing: false,
      },
    };
  },
  methods: {
    postAnnouncement() {
      if (this.newAnnouncement.title && this.newAnnouncement.description && this.newAnnouncement.startDate && this.newAnnouncement.endDate) {
        this.announcements.push({ ...this.newAnnouncement });
        this.newAnnouncement.title = "";
        this.newAnnouncement.startDate = "";
        this.newAnnouncement.endDate = "";
        this.newAnnouncement.description = "";
      }
    },
    editAnnouncement(index) {
      this.announcements[index].editing = true;
    },
    saveAnnouncement(index) {
      this.announcements[index].editing = false;
    },
    deleteAnnouncement(index) {
      this.announcements.splice(index, 1);
    },
    formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
    },
    formatMonthYear(date) {
    const options = { year: "numeric", month: "long" };
    return new Date(date).toLocaleDateString(undefined, options);
    }

  },
};
</script>
