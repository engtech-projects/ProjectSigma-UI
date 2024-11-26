<script setup>
import { storeToRefs } from "pinia"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const { journal } = storeToRefs(useJournalStore())
defineProps({
    index: {
        type: Number,
        required: true
    }
})
const details = defineModel("details", { required: true, type: Object })
const emit = defineEmits("delete-item")
const totalDebit = defineModel("totalDebit", { required: true, type: Number })
const totalCredit = defineModel("totalCredit", { required: true, type: Number })
const entryBalance = defineModel("entryBalance", { required: true, type: Number })

const setCreditDebit = () => {
    let sumDebit = 0
    let sumCredit = 0

    journal.value.details.forEach((detail) => {
        sumDebit += Number(detail.debit || 0)
        sumCredit += Number(detail.credit || 0)
    })

    totalDebit.value = sumDebit
    totalCredit.value = sumCredit
    entryBalance.value = sumDebit - sumCredit
}

</script>
<template>
    <div class="flex gap-2">
        <div class="flex-1">
            <label
                for="account"
                class="text-xs italic"
            >Account</label>
            <AccountingCommonSelectJournalAccounts
                v-model:journal-account-info="details.journalAccountInfo"
                class="w-full min-w-[300px]"
            />
        </div>
        <div class="flex-1">
            <label
                for="particulars"
                class="text-xs italic"
            >Project/Department</label>
            <AccountingCommonSelectStakeHolder
                v-if="!details.id"
                v-model:stakeholder-info="details.stakeholderInformation"
                class="w-full"
                :selected-id="details.stakeholder_id"
                :filter-options="['project', 'department', 'employee']"
            />
            <p v-else>
                {{ details.stakeholder.name }}
            </p>
        </div>
        <div class="flex-1">
            <label
                for="debit"
                class="text-xs italic"
            >Debit</label>
            <input
                id="debit"
                v-model="details.debit"
                type="number"
                step=".01"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
                @change="setCreditDebit()"
            >
        </div>
        <div class="flex-1">
            <label
                for="credit"
                class="text-xs italic"
            >Credit</label>
            <input
                id="credit"
                v-model="details.credit"
                type="number"
                step=".01"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
                @change="setCreditDebit()"
            >
        </div>
        <div class="flex-1">
            <label
                for="remarks"
                class="text-xs italic"
            >Remarks/Description</label>
            <input
                id="remarks"
                v-model="details.description"
                type="text"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
            >
        </div>
        <div>
            <button
                class="text-white p-2 bg-red-500 content-center mt-5 rounded-md w-fit"
                @click.prevent="emit('delete-item', index)"
            >
                <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-8 w-8 p-1" />
            </button>
        </div>
    </div>
</template>
