<script setup>
import { storeToRefs } from "pinia"
import { usePagibigStore } from "@/stores/pagibig"

const contributions = usePagibigStore()
const { contribution, errorMessage, successMessage } = storeToRefs(contributions)

const addRange = () => {
    contributions.addContribution()

    setTimeout(() => {
        contributions.clearMessages()
    }, 2000)
}
</script>

<template>
    <LayoutBoards title="Pag-IBIG" class="w-96 p-4">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="addRange">
                <label
                    class="text-sm"
                >Add Pag-IBIG Share</label>
                <div>
                    <div>
                        <label
                            for="pagibig_employee"
                            class="text-sm italic"
                        >Employee</label>
                        <input
                            id="pagibig_employee"
                            v-model="contribution.range_to"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>
                <div>
                    <div>
                        <label
                            for="pagibig_employeeShare"
                            class="text-sm italic"
                        >Employee Share</label>
                        <input
                            id="pagibig_employeeShare"
                            v-model="contribution.range_to"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>

                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Add Contribution
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
