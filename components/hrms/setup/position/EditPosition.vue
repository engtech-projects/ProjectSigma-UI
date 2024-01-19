<script setup>
import { storeToRefs } from "pinia"
import { usePositionStore } from "@/stores/position"

const positions = usePositionStore()
const { position, errorMessage, successMessage } = storeToRefs(positions)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const cancelEdit = () => {
    positions.reset()
}
const editPos = async () => {
    try {
        boardLoading.value = true
        await positions.editPosition()
        snackbar.add({
            type: "success",
            text: positions.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: positions.errorMessage
        })
    } finally {
        positions.clearMessages()
        boardLoading.value = false
    }
}

</script>

<template>
    <LayoutEditBoards title="Edit Position Name" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="editPos">
                <label
                    for="position_name"
                    class="text-xs italic"
                >Edit Position Name</label>
                <input
                    id="position_name"
                    v-model="position.name"
                    type="text"
                    class="w-full rounded-lg"
                >

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
