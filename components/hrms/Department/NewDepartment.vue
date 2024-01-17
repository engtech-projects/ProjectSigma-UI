<script setup>
import { storeToRefs } from "pinia"
import { useDepartmentStore } from "@/stores/departments"

const departments = useDepartmentStore()
const { department, errorMessage, successMessage } = storeToRefs(departments)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const addDepartment = async () => {
    try {
        boardLoading.value = true
        await departments.createDepartment()
        snackbar.add({
            type: "success",
            text: departments.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: departments.errorMessage
        })
    } finally {
        departments.clearMessages()
        boardLoading.value = false
    }
}

</script>

<template>
    <LayoutBoards title="Department Name" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="addDepartment">
                <label
                    for="department_name"
                    class="text-xs italic"
                >Department Name</label>
                <input
                    id="departmentName"
                    v-model="department.department_name"
                    type="text"
                    class="w-full rounded-lg"
                >

                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Add Department
                    </button>
                </div>
            </form>
            <p class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
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
