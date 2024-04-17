<script setup>
import { storeToRefs } from "pinia"
import { usePagibigStore } from "@/stores/hrms/setup/pagibig"

const pagibig = usePagibigStore()
const { contribution, errorMessage, successMessage } = storeToRefs(pagibig)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const cancelEdit = () => {
    pagibig.reset()
}
const editCont = async () => {
    try {
        boardLoading.value = true
        await pagibig.editContribution()
        snackbar.add({
            type: "success",
            text: pagibig.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: pagibig.errorMessage || "something went wrong."
        })
    } finally {
        pagibig.clearMessages()
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
                            id="rangeTo"
                            v-model="contribution.range_to"
                            v-oninput="handleInput(contribution, 'range_to')"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                        >
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2 ">
                    <div>
                        <label
                            for="pagibig_employerShare"
                            class="text-sm italic"
                        >Employer Share Percent (%)</label>
                        <input
                            id="pagibig_employerShare"
                            v-model="contribution.employer_share_percent"
                            v-oninput="handleInput(contribution, 'employer_share_percent')"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >

                        <label
                            for="emprMaxCont"
                            class="text-sm italic"
                        >Employer Maximum Contribution</label>
                        <input
                            id="emprMaxCont"
                            v-model="contribution.employer_maximum_contribution"
                            v-oninput="handleInput(contribution, 'employer_maximum_contribution')"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >

                        <label
                            for="emprComp"
                            class="text-sm italic"
                        >Employer Compensation</label>
                        <input
                            id="emprComp"
                            v-model="contribution.employer_compensation"
                            v-oninput="handleInput(contribution, 'employer_compensation')"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >
                    </div>
                    <div>
                        <label
                            for="pagibig_employeeShare"
                            class="text-sm italic"
                        >Employee Share Percent (%)</label>
                        <input
                            id="pagibig_employeeShare"
                            v-model="contribution.employee_share_percent"
                            v-oninput="handleInput(contribution, 'employee_share_percent')"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >

                        <label
                            for="empMaxCont"
                            class="text-sm italic"
                        >Employee Maximum Contribution</label>
                        <input
                            id="empMaxCont"
                            v-model="contribution.employee_maximum_contribution"
                            v-oninput="handleInput(contribution, 'employee_maximum_contribution')"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                        >

                        <label
                            for="empConp"
                            class="text-sm italic"
                        >Employee Compensation</label>
                        <input
                            id="empConp"
                            v-model="contribution.employee_compensation"
                            v-oninput="handleInput(contribution, 'employee_compensation')"
                            employee_maximum_contribution
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
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
