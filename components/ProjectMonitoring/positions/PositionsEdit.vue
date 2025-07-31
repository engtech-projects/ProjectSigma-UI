<script setup>
import { storeToRefs } from "pinia"
import { usePositionStore } from "@/stores/project-monitoring/positions"

const positionStore = usePositionStore()
const { errorMessage, successMessage } = storeToRefs(positionStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const handleSubmit = async () => {
    try {
        boardLoading.value = true
        await positionStore.editPosition()
        if (positionStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: positionStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: positionStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: positionStore.errorMessage
        })
    } finally {
        boardLoading.value = false
        positionStore.clearMessages()
    }
}

const cancelEdit = () => {
    positionStore.isEdit = false
    positionStore.reset()
}
</script>
<template>
    <LayoutEditBoards title="Position" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="handleSubmit">
                <div class="flex flex-col gap-2">
                    <div>
                        <label
                            for="book_name"
                            class="text-xs italic"
                        >Position Name</label>
                        <input
                            id="bookName"
                            v-model="positionStore.position.name"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div>
                        <label
                            for="description"
                            class="text-xs italic"
                        >Description</label>
                        <textarea
                            id="description"
                            v-model="positionStore.position.description"
                            type="text"
                            class="w-full rounded-lg resize-none h-18"
                        />
                    </div>
                </div>
                <div class="flex justify-end gap-2">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5 hover:bg-teal-500"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        class="flex-1 text-white p-2 rounded bg-gray-700 content-center mt-5 hover:bg-gray-500"
                        @click="cancelEdit"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class="success-message text-green-600 text-center font-semibold italic transition-opacity delay-1000"
            >
                {{ successMessage }}
            </p>
        </div>
    </LayoutEditBoards>
</template>

<style scoped>
.error-message,
.success-message {
    transition: opacity 1s ease;
}

.error-message.fade-out,
.success-message.fade-out {
    animation-duration: 1s;
    opacity: 0;
}
</style>
