<script setup>
import { storeToRefs } from "pinia"
import { useTermsStore } from "@/stores/accounting/setup/terms"

const termsStore = useTermsStore()
const { errorMessage, successMessage } = storeToRefs(termsStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const account = ref({})

const handleSubmit = async () => {
    try {
        boardLoading.value = true
        termsStore.term.name = formatTermName(termsStore.term.name)
        await termsStore.createTerm()
        if (termsStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: termsStore.errorMessage
            })
        } else {
            termsStore.reset()
            snackbar.add({
                type: "success",
                text: termsStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: termsStore.errorMessage
        })
    } finally {
        boardLoading.value = false
        termsStore.clearMessages()
        account.value = {}
    }
}
const formatTermName = (name) => {
    return name.toUpperCase().replace(/\s+/g, "_")
}
</script>
<template>
    <LayoutBoards title="Term" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="handleSubmit">
                <div class="flex flex-col gap-2">
                    <div>
                        <label
                            for="term_name"
                            class="text-xs italic"
                        >Term Name</label>
                        <input
                            id="termName"
                            v-model="termsStore.term.name"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div>
                        <label
                            for="term_name"
                            class="text-xs italic"
                        >Account</label>
                        <AccountingCommonSelectJournalAccounts
                            v-model:journal-account-info="account"
                            v-model:account-id="termsStore.term.account_id"
                            class="w-full min-w-[300px]"
                        />
                    </div>
                    <div>
                        <label
                            for="term_name"
                            class="text-xs italic"
                        >Debit/Credit</label>
                        <select
                            v-model="termsStore.term.debit_credit"
                            class="w-full rounded-lg"
                        >
                            <option
                                v-for="balance in termsStore.balanceType"
                                :key="balance"
                                :value="balance"
                            >
                                {{ upperFirst(balance) }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label
                            for="description"
                            class="text-xs italic"
                        >Description</label>
                        <textarea
                            id="description"
                            v-model="termsStore.term.description"
                            type="text"
                            class="w-full rounded-lg resize-none h-18"
                        />
                    </div>
                </div>
                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Add Term
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
