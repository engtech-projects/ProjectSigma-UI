<script setup>
import { storeToRefs } from "pinia"
import { usePositionStore } from "@/stores/position"

const positions = usePositionStore()
const { position, errorMessage, successMessage } = storeToRefs(positions)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const addPosition = async () => {
    try {
        boardLoading.value = true
        await positions.createPosition()
        if (positions.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: positions.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: positions.successMessage
            })
        }
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
    <LayoutBoards title="Position Name" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="addPosition">
                <label
                    for="position_name"
                    class="text-xs italic"
                >New Position Name</label>
                <input
                    id="position_name"
                    v-model="position.name"
                    type="text"
                    class="w-full rounded-lg"
                >

                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Add Position
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
    </LayoutBoards>
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
