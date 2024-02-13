<script setup>

import { storeToRefs } from "pinia"
import { useMain } from "@/stores/settings"

const mains = useMain()

const { updateSettings, errorMessage } = storeToRefs(mains)

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
            text: mains.successMessage,
        })
    } catch {
        snackbar.add({
            type: "error",
            text: errorMessage || "something went wrong."
        })
    } finally {
        mains.clearMessages()
        boardLoading.value = false
    }
}

</script>
<template>
    <LayoutBoards title="Edit Setting Form" class="mb-5">
        <form class="space-y-3 mt-5" @submit.prevent="edit">
            <div class="grid grid-cols-2 gap-4 mb-3 mt-3">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Setting Name
                    </label>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Setting Value
                    </label>
                </div>
            </div>
            <div v-for="item, index in updateSettings" :key="index">
                <div class="grid grid-cols-2 gap-4 mb-3 mt-3">
                    <div>
                        <input
                            v-model="item.setting_name"
                            type="text"
                            class="bg-gray-50 border disabled border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Setting Name"
                            disabled
                            required
                        >
                    </div>
                    <div>
                        <input
                            v-model="item.value"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Setting Value"
                            required
                        >
                    </div>
                </div>
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
