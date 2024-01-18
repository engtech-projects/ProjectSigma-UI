<script setup>
import { storeToRefs } from "pinia"
import { useWtaxStore } from "@/stores/wtax"

const withholdings = useWtaxStore()
const { withholding, errorMessage, successMessage } = storeToRefs(withholdings)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const edit = async () => {
    try {
        boardLoading.value = true
        await withholdings.editWithholdings()
        snackbar.add({
            type: "success",
            text: withholdings.successMessage
        })
    } finally {
        boardLoading.value = false
        withholdings.clearMessages()
    }
}

</script>

<template>
    <LayoutEditBoards title="Withholding Tax" :loading="boardLoading">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="edit">
                <label
                    class="text-sm"
                >Create Withholding Record</label>
                <div class="grid grid-rows-1 p-px">
                    <label
                        for="wtaxTerm"
                        class="text-sm italic"
                    >Term</label>
                    <select
                        id="wtaxTerm"
                        v-model="withholding.term"
                        class="bg-slate-100 border border-slate-300 rounded py-1.5 pl-3 cursor-pointer focus:outline focus:outline-color1 focus:bg-white"
                        required
                    >
                        <option class="italic font-semibold" value="" disabled selected>
                            Choose Term
                        </option>
                        <option v-for="wtaxTerm, index in TERM" :key="index" :value="wtaxTerm">
                            {{ wtaxTerm }}
                        </option>
                    </select>
                </div>
                <div class="grid grid-cols-2 gap-2 ">
                    <div>
                        <label
                            for="salaryRangeFrom"
                            class="text-sm italic"
                        >Salary Range From</label>
                        <input
                            id="salaryRangeFrom"
                            v-model="withholding.range_from"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div>
                        <label
                            for="salaryRangeTo"
                            class="text-sm italic"
                        >Salary Range From</label>
                        <input
                            id="salaryRangeTo"
                            v-model="withholding.range_to"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div>
                        <label
                            for="taxBase"
                            class="text-sm italic"
                        >Tax Base</label>
                        <input
                            id="taxBase"
                            v-model="withholding.tax_base"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div>
                        <label
                            for="taxAmount"
                            class="text-sm italic"
                        >Tax Amount</label>
                        <input
                            id="taxAmount"
                            v-model="withholding.tax_amount"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>
                <div>
                    <label
                        for="taxPerOverBase"
                        class="text-sm italic"
                    >Tax Percent Over Base</label>
                    <input
                        id="taxPerOverBase"
                        v-model="withholding.tax_percent_over_base"
                        type="number"
                        class="w-full rounded-lg"
                    >
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
