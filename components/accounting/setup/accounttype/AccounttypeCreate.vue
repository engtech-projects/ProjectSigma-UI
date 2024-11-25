<script setup>
import { storeToRefs } from "pinia"
import { useAccountTypeStore } from "@/stores/accounting/setup/accounttype"

const accountTypeStore = useAccountTypeStore()
const { accountType, categories, errorMessage, successMessage } = storeToRefs(accountTypeStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const emit = defineEmits("saved")

const handleSubmit = async () => {
    try {
        boardLoading.value = true
        await accountTypeStore.createAccountType()
        if (accountTypeStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: accountTypeStore.errorMessage
            })
        } else {
            emit("saved")
            snackbar.add({
                type: "success",
                text: accountTypeStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: accountTypeStore.errorMessage
        })
    } finally {
        accountTypeStore.clearMessages()
        boardLoading.value = false
    }
}
const setNotation = () => {
    accountTypeStore.accountType.notation = accountTypeStore.accountType.balance_type === "debit" ? "+" : "-"
}
</script>
<template>
    <LayoutBoards title="Account Type" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="handleSubmit">
                <div class="flex flex-col gap-2">
                    <div>
                        <label
                            for="account_type"
                            class="text-xs italic"
                        >Account Type</label>
                        <input
                            id="accountType"
                            v-model="accountType.account_type"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div>
                        <label
                            for="account_category"
                            class="text-xs italic"
                        >Category</label>
                        <select id="accountCategory" v-model="accountType.account_category" class="w-full rounded-lg" required>
                            <option v-for="cat, i in categories" :key="i" :value="cat">
                                {{ upperFirst(cat) }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label
                            for="balance_type"
                            class="text-xs italic"
                        >Balance Type</label>
                        <select id="balanceType" v-model="accountType.balance_type" class="w-full rounded-lg" required @change="setNotation">
                            <option value="debit">
                                Debit
                            </option>
                            <option value="credit">
                                Credit
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label
                            for="account_type"
                            class="text-xs italic"
                        >Notation</label>
                        <span v-if="accountType.notation.length > 0" class="text-3xl font-bold">
                            {{ accountType.notation }}
                        </span>
                    </div>
                </div>
                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Add Account Type
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
