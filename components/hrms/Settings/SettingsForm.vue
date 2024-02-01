<script setup>
import { storeToRefs } from "pinia"
import { useMain } from "@/stores/settings"

const mains = useMain()

const { settings, errorMessage } = storeToRefs(mains)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const addMain = async () => {
    try {
        boardLoading.value = true
        await mains.createone()
        if (errorMessage !== "") {
            snackbar.add({
                type: "success",
                text: mains.successMessage
            })
        } else {
            snackbar.add({
                type: "error",
                text: errorMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: errorMessage
        })
    } finally {
        mains.clearMessages()
        boardLoading.value = false
    }
}

</script>

<template>
    <LayoutBoards title="Setting Form" class="mb-5">
        <form class="space-y-3 mt-5" @submit.prevent="addMain">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="setting-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Setting Name
                    </label>
                    <input
                        id="setting-name"
                        v-model="settings.setting_name"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Setting Name"
                        required
                    >
                </div>
                <div>
                    <label for="setting-value" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Value
                    </label>
                    <input
                        id="setting-value"
                        v-model="settings.value"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Setting Value"
                        required
                    >
                </div>
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
    </LayoutBoards>
</template>
