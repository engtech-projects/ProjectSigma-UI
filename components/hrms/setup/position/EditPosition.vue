<script setup>
import { storeToRefs } from "pinia"
import { usePositionStore, POSITION_TYPES } from "@/stores/hrms/position"
import { useDepartmentStore } from "@/stores/hrms/departments"

const departments = useDepartmentStore()
const { departmentsList } = storeToRefs(departments)

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
                    required
                >

                <div class="grid grid-rows-1 mt-1">
                    <label for="share_type" class="text-sm italic">Department</label>
                    <select
                        id="department"
                        v-model="position.department_id"
                        class="bg-slate-100 border border-slate-300 rounded py-1.5 pl-3 cursor-pointer focus:outline focus:outline-color1 focus:bg-white"
                    >
                        <option value="" disabled selected>
                            Choose Department
                        </option>
                        <option v-for="dpt, index in departmentsList" :key="index" :value=" dpt.id">
                            {{ dpt.department_name }}
                        </option>
                    </select>
                </div>
                <label for="positionType" class="text-sm italic">Position Type</label>
                <div class="grid md:grid-cols-2 justify-items-center">
                    <div v-for="(positionType, index) in POSITION_TYPES" :key="index">
                        <input
                            id="positionType"
                            v-model="position.position_type"
                            :value="positionType"
                            type="radio"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        >
                        <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ positionType }}</label>
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
