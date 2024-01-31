<script setup>
import { storeToRefs } from "pinia"
import { usePhilhealthStore, SHARE_TYPES } from "@/stores/philhealth"

const contributions = usePhilhealthStore()
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
    <LayoutBoards title="PhilHealth" :loading="boardLoading">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="addRange">
                <label
                    class="text-sm"
                >Add Contribution Record</label>

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
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2 ">
                    <div>
                        <label
                            for="empShare"
                            class="text-sm italic"
                        >Employee Share</label>
                        <input
                            id="empShare"
                            v-model="contribution.employee_share"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div>
                        <label
                            for="empShare"
                            class="text-sm italic"
                        >Employer Share</label>
                        <input
                            id="empShare"
                            v-model="contribution.employer_share"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>
                <div class="grid grid-rows-1 mt-1">
                    <label for="share_type" class="text-sm italic">Share Type</label>
                    <select
                        id="share_type"
                        v-model="contribution.share_type"
                        class="bg-slate-100 border border-slate-300 rounded py-1.5 pl-3 cursor-pointer focus:outline focus:outline-color1 focus:bg-white"
                    >
                        <option value="" disabled selected>
                            Choose Share Type
                        </option>
                        <option v-for="shareType, index in SHARE_TYPES" :key="index" :value="shareType">
                            {{ shareType }}
                        </option>
                    </select>
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
