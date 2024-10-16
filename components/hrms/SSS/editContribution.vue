<script setup>
import { storeToRefs } from "pinia"
import { useContributionStore } from "@/stores/hrms/setup/sss"

const contributions = useContributionStore()
const { contribution, errorMessage, successMessage } = storeToRefs(contributions)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const cancelEdit = () => {
    contributions.reset()
}
const editCont = async () => {
    try {
        boardLoading.value = true
        await contributions.editContribution()
        snackbar.add({
            type: "success",
            text: contributions.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: contributions.errorMessage || "something went wrong."
        })
    } finally {
        contributions.clearMessages()
        boardLoading.value = false
    }
}
const handleInput = (model, field) => {
    model[field] = Math.abs(model[field])
}
</script>
<template>
    <LayoutEditBoards title="Edit Contribution" :loading="boardLoading">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="editCont">
                <div class="space-y-2">
                    <label
                        class="text-md italic"
                    >Edit Contribution Range</label>
                </div>

                <div class="grid grid-cols-2 gap-2 ">
                    <div>
                        <label
                            for="rangeFrom"
                            class="text-sm italic"
                        >Range From</label>
                        <input
                            id="rangeFrom"
                            v-model="contribution.range_from"
                            v-oninput="handleInput(contribution, 'range_from')"
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
                            v-oninput="handleInput(contribution, 'range_to')"
                            type="number"
                            step=".01"
                            min="0"
                            class="w-full rounded-lg"
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
                            v-oninput="handleInput(contribution, 'employer_share')"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >
                        <label
                            for="employerContrib"
                            class="text-sm italic"
                        >Employer Compensation</label>
                        <input
                            id="employerContrib"
                            v-model="contribution.employer_compensation"
                            v-oninput="handleInput(contribution, 'employer_compensation')"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >
                        <label
                            for="employerWisp"
                            class="text-sm italic"
                        >Employer WISP</label>
                        <input
                            id="employerWisp"
                            v-model="contribution.employer_wisp"
                            v-oninput="handleInput(contribution, 'employer_wisp')"
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
                            v-oninput="handleInput(contribution, 'employee_share')"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >
                        <label
                            for="employeeContrib"
                            class="text-sm italic"
                        >Employee Compensation</label>
                        <input
                            id="employeeContrib"
                            v-model="contribution.employee_compensation"
                            v-oninput="handleInput(contribution, 'employee_compensation')"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >
                        <label
                            for="employeeWisp"
                            class="text-sm italic"
                        >Employee WISP</label>
                        <input
                            id="employeeWisp"
                            v-model="contribution.employee_wisp"
                            v-oninput="handleInput(contribution, 'employee_wisp')"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >
                    </div>
                </div>

                <div class="flex justify-end gap-4">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
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
            <p hidden class="text-red-600 text-center font-semibold">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class="text-green-600 text-center font-semibold"
            >
                {{ successMessage }}
            </p>
        </div>
    </LayoutEditBoards>
</template>
