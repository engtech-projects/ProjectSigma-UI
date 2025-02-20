<script setup>
import { storeToRefs } from "pinia"
import { useWithholdingTaxStore } from "@/stores/accounting/setup/withholdingtax"

const withholdingTaxStore = useWithholdingTaxStore()
const { errorMessage, successMessage } = storeToRefs(withholdingTaxStore)
const snackbar = useSnackbar()
const boardLoading = ref(false)

const handleSubmit = async () => {
    if (withholdingTaxStore.withholdingTax.vat_type !== "VAT") {
        withholdingTaxStore.withholdingTax.wtax_percentage = 0
    }
    try {
        boardLoading.value = true
        await withholdingTaxStore.editWithholdingTax()
        if (withholdingTaxStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: withholdingTaxStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: withholdingTaxStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: withholdingTaxStore.errorMessage
        })
    } finally {
        withholdingTaxStore.clearMessages()
        boardLoading.value = false
    }
}
const cancelEdit = () => {
    withholdingTaxStore.isEdit = false
    withholdingTaxStore.reset()
}
</script>
<template>
    <LayoutEditBoards title="Edit Withholding Tax" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="handleSubmit">
                <div class="flex flex-col gap-2">
                    <div>
                        <label
                            for="withholding_tax_name"
                            class="text-xs italic"
                        >Withholding Tax Name</label>
                        <input
                            id="withholdingTaxName"
                            v-model="withholdingTaxStore.withholdingTax.wtax_name"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div>
                        <label
                            for="account_name"
                            class="text-xs italic"
                        >Account Name</label>
                        <AccountingCommonSelectJournalAccounts
                            v-model:journal-account-info="withholdingTaxStore.withholdingTax.account"
                            v-model:account-id="withholdingTaxStore.withholdingTax.account_id"
                            class="w-full min-w-[300px]"
                        />
                    </div>
                    <div>
                        <label
                            for="vat_type"
                            class="text-xs italic"
                        >Vat Type</label>
                        <select id="vatType" v-model="withholdingTaxStore.withholdingTax.vat_type" class="w-full rounded-lg" required>
                            <option value="VAT">
                                VAT
                            </option>
                            <option value="NON-VAT">
                                NON-VAT
                            </option>
                        </select>
                    </div>
                    <div v-if="withholdingTaxStore.withholdingTax.vat_type === 'VAT'">
                        <label
                            for="percentage"
                            class="text-xs italic"
                        >Percentage</label>
                        <input
                            id="percentage"
                            v-model="withholdingTaxStore.withholdingTax.wtax_percentage"
                            type="number"
                            class="w-full rounded-lg"
                            step=".01"
                            min="0"
                            required
                        >
                    </div>
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
