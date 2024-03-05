<script setup>

import { storeToRefs } from "pinia"
import { useAnnouncements } from "@/stores/announcements"

const mains = useAnnouncements()

const { announcement } = storeToRefs(mains)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const cancelEdit = () => {
    mains.reset()
}

const edit = async () => {
    try {
        boardLoading.value = true
        await mains.editone()
        snackbar.add({
            type: "success",
            text: mains.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        mains.clearMessages()
        boardLoading.value = false
    }
}

</script>
<template>
    <LayoutBoards title="Edit Announcement Form" class="mb-5" :loading="boardLoading">
        <form class="space-y-3 mt-5" @submit.prevent="edit">
            <div>
                <label for="announcement-title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Title
                </label>
                <input
                    id="announcement-title"
                    v-model="announcement.title"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Announcement Title"
                    required
                >
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="announcement-date1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Announcement Starts
                    </label>
                    <input
                        id="announcement-date1"
                        v-model="announcement.start_date"
                        type="date"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Announcement Title"
                        required
                    >
                </div>
                <div>
                    <label for="announcement-date1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Announcement Ends
                    </label>
                    <input
                        id="announcement-date2"
                        v-model="announcement.end_date"
                        type="date"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Announcement Title"
                        required
                    >
                </div>
            </div>
            <div>
                <label for="announcement" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Announcement
                </label>
                <textarea id="announcement" v-model="announcement.content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Type your announcement here" required />
            </div>
            <div class="flex space-x-1 justify-end">
                <button type="button" class="w-18 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="cancelEdit">
                    Cancel
                </button>
                <button type="submit" class="w-38 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Save
                    <Icon name="material-symbols:speaker-notes-outline-rounded" color="white" class="w-5 h-5" />
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>
