<script setup>
import { storeToRefs } from "pinia"
import { useDepartmentStore } from "@/stores/hrms/setup/departments"

const departments = useDepartmentStore()
const { department, errorMessage, successMessage } = storeToRefs(departments)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const cancelEdit = () => {
    departments.reset()
}
const editDepartment = async () => {
    try {
        boardLoading.value = true
        await departments.editDepartmentName()
        snackbar.add({
            type: "success",
            text: departments.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: departments.errorMessage || "something went wrong."
        })
    } finally {
        departments.clearMessages()
        boardLoading.value = false
    }
}

</script>
<template>
    <LayoutEditBoards :loading="boardLoading">
        <div class="flex items-center justify-between mb-4">
            <h1 class="text-lg font-semibold text-gray-900">
                Edit Department
            </h1>
            <PsButton
                button-title=""
                button-icon="mdi:close"
                class="text-gray-500 hover:text-white hover:bg-red-600"
                @click="$emit('close')"
            >
                <Icon name="mdi:close" class="h-5 w-5" />
            </PsButton>
        </div>

        <div class="text-gray-500 mt-2">
            <form @submit.prevent="editDepartment">
                <div class="space-y-2">
                    <label
                        for="department_name"
                        class="text-xs italic"
                    >New Department Name</label>
                    <input
                        id="departmentName"
                        v-model="department.department_name"
                        type="text"
                        class="w-full rounded-lg"
                    >
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
