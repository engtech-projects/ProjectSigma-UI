<script setup>
import { storeToRefs } from "pinia"
import { useDepartmentStore } from "@/stores/departments"

const departments = useDepartmentStore()
const { department, errorMessage, successMessage } = storeToRefs(departments)

const addDepartment = () => {
    departments.createDepartment()

    setTimeout(() => {
        departments.clearMessages()
    }, 2000)
}

</script>

<template>
    <LayoutBoards title="Department Name" class="w-96 h-64 p-4">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="addDepartment">
                <div class="space-y-2">
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
                </div>

                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        <Icon name="mingcute:department-fill" class="mr-2" />Add Department
                    </button>
                </div>
            </form>
            <p class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                class="success-message text-green-600 text-center font-semibold italic"
            >
                {{ successMessage }}
            </p>
        </div>
    </LayoutBoards>
</template>

<style scoped>
.error-message,
.success-message {
    transition: opacity 0.5s ease-out;
}

.fade-out {
    opacity: 0;
}
</style>
