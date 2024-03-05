<script setup>
import { storeToRefs } from "pinia"
import { useLeaveStore } from "@/stores/hrms/leaves"

const leaves = useLeaveStore()
const { leave, errorMessage, successMessage } = storeToRefs(leaves)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const cancelEdit = () => {
    leaves.reset()
}
const edit = async () => {
    try {
        boardLoading.value = true
        await leaves.editLeaves()
        snackbar.add({
            type: "success",
            text: leaves.successMessage
        })
    } finally {
        boardLoading.value = false
        leaves.clearMessages()
    }
}

</script>

<template>
    <LayoutEditBoards title="Edit Leaves" :loading="boardLoading">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="edit">
                <label
                    class="text-sm italic"
                >Edit Leave Type</label>
                <div>
                    <div>
                        <label
                            for="leaveName"
                            class="text-sm italic"
                        >Leave Name</label>
                        <input
                            id="leaveName"
                            v-model="leave.leave_name"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div>
                        <label
                            for="leaveAmt"
                            class="text-sm italic"
                        >Amount of Leaves</label>
                        <input
                            id="leaveAmt"
                            v-model="leave.amt_of_leave"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div class="grid grid-rows-1 p-px">
                        <label
                            for="employment_type"
                            class="text-sm italic"
                        >Employement Type</label>
                        <select
                            id="edit_employment_type"
                            v-model="leave.employment_type"
                            class="bg-slate-100 border border-slate-300 rounded py-1.5 pl-3 cursor-pointer focus:outline focus:outline-color1 focus:bg-white"
                            required
                            multiple
                        >
                            <option class="italic font-semibold" value="" disabled selected>
                                Choose Employment Type
                            </option>
                            <option v-for="employmentType, index in EMPLOYMENT_TYPE" :key="index" :value="employmentType">
                                {{ employmentType }}
                            </option>
                        </select>
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
            <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class="success-message text-green-600 text-center font-semibold italic"
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
