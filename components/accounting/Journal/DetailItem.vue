<script setup>
defineProps({
    index: {
        type: Number,
        required: true
    },
    totalDebit: {
        type: Number,
        required: true
    },
    itemCount: {
        type: Number,
        required: true
    }
})
const details = defineModel("details", { required: true, type: Object })
const emit = defineEmits("delete-item")

</script>
<template>
    <div class="flex gap-2">
        <div class="flex-1">
            <label
                for="account"
                class="text-xs italic"
            >Account</label>
            <!-- <AccountingCommonSelectJournalAccounts
                v-model:journal-account-info="details.journalAccountInfo"
                v-model:account-id="details.account_id"
                class="w-full min-w-[300px]"
            /> -->
            <div class="border border-black p-2">
                {{ details.journalAccountInfo }}
            </div>
        </div>
        <div class="flex-1">
            <label
                for="particulars"
                class="text-xs italic"
            >Project/Department</label>
            <div class="border border-black p-2">
                {{ details.stakeholderInformation }}
            </div>
            <!-- <AccountingCommonSelectStakeHolder
                v-model:stakeholder-info="details.stakeholderInformation"
                v-model:selected-type="details.stakeholder_type"
                class="w-full"
                :selected-id="details.stakeholder_id"
                :filter-options="['project', 'department', 'employee']"
            /> -->
        </div>
        <div class="flex-1">
            <label
                for="debit"
                class="text-xs italic"
            >Debit</label>
            <input
                id="debit"
                v-model="details.debit"
                :disabled="details.credit != 0"
                type="number"
                step=".01"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
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
                :disabled="details.debit != 0"
                type="number"
                step=".01"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
            >
            <p v-if="(index === itemCount - 1) && details.debit === 0" class="text-italic text-xs text-blue-500 cursor-pointer" @click="details.credit = totalDebit">
                max : {{ totalDebit }}
            </p>
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
