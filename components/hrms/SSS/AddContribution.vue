<script setup>
import { storeToRefs } from "pinia"
import { useContributionStore } from "@/stores/hrms/sss"

const contributions = useContributionStore()
const { contribution, errorMessage, successMessage } = storeToRefs(contributions)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const addRange = async () => {
    try {
        boardLoading.value = true
        await contributions.addContribution()
        if (contributions.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: contributions.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: contributions.successMessage
            })
        }
    } catch {
        snackbar.add({
            type: "error",
            text: contributions.errorMessage
        })
    } finally {
        contributions.clearMessages()
        boardLoading.value = false
    }
}

</script>

<template>
    <LayoutBoards title="SSS" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="addRange">
                <label
                    class="text-sm"
                >Add SSS Contribution Range</label>

                <div class="grid grid-cols-2 gap-2 ">
                    <div>
                        <label
                            for="rangeFrom"
                            class="text-sm italic"
                        >Range From</label>
                        <input
                            id="rangeFrom"
                            v-model="contribution.range_from"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >
                    </div>
                    <div>
                        <label
                            for="rangeTo"
                            class="text-sm italic"
                        >Range To</label>
                        <input
                            id="rangeFrom"
                            v-model="contribution.range_to"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2 ">
                    <div>
                        <label
                            for="employerShare"
                            class="text-sm italic"
                        >Employer Share</label>
                        <input
                            id="employerShare"
                            v-model="contribution.employer_share"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >
                        <label
                            for="employerContrib"
                            class="text-sm italic"
                        >Employer Contribution</label>
                        <input
                            id="employerContrib"
                            v-model="contribution.employer_contribution"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >
                    </div>
                    <div>
                        <label
                            for="employeeShare"
                            class="text-sm italic"
                        >Employee Share</label>
                        <input
                            id="employeeShare"
                            v-model="contribution.employee_share"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >
                        <label
                            for="employeeContrib"
                            class="text-sm italic"
                        >Employee Contribution</label>
                        <input
                            id="employeeContrib"
                            v-model="contribution.employee_contribution"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
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
            <p hidden class=" text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class=" text-green-600 text-center font-semibold italic transition-opacity delay-1000"
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
