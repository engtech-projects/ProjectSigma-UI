<script setup>
defineProps(["announcements", "postAnnouncements"])
const newAnnouncement = ref({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
})
</script>

<template>
    <div>
        <form class="space-y-3 " @submit.prevent="postAnnouncement">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b">
                Announcements
            </h5>
            <div>
                <label for="announcement-title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input
                    id="announcement-title"
                    v-model="newAnnouncement.title"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Announcement Title"
                    required
                >
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="announcement-date1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Announcement Starts</label>
                    <input
                        id="announcement-date1"
                        v-model="newAnnouncement.startDate"
                        type="date"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Announcement Title"
                        required
                    >
                </div>
                <div>
                    <label for="announcement-date1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Announcement Ends</label>
                    <input
                        id="announcement-date2"
                        v-model="newAnnouncement.endDate"
                        type="date"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Announcement Title"
                        required
                    >
                </div>
            </div>
            <div>
                <label for="announcement" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Announcement</label>
                <textarea id="announcement" v-model="newAnnouncement.description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Type your announcement here" required />
            </div>

            <div class="flex space-x-1 justify-end">
                <button type="reset" class="w-18 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Clear
                </button>
                <button type="submit" class="w-38 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Post
                    <Icon name="material-symbols:speaker-notes-outline-rounded" color="white" class="w-5 h-5" />
                </button>
            </div>
        </form>
    </div>
</template>
