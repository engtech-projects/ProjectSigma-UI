<script setup lang="ts">
import { useAccountingEnumStore } from "~/stores/accounting/enums/enum"
const enums = useAccountingEnumStore()
const { journalAccountEnum } = storeToRefs(enums)
onMounted(() => {
    if (!journalAccountEnum.value.isLoaded) {
        enums.searchJournalAccounts()
    }
})
const journalAccountInfo = defineModel("journalAccountInfo", { required: false, type: Object, default: {} })
const accountId = defineModel("accountId", { required: false, type: Number, default: null })
defineProps({
    stakeholderId: { type: Boolean, default: true },
})
watch(journalAccountInfo, (newValue) => {
    journalAccountInfo.value = newValue
})
</script>
<template>
    <div class="relative">
        <LayoutFormPsSelectSearch
            v-model:result="journalAccountInfo"
            v-model:search-input="journalAccountEnum.params.key"
            v-model:result-id="accountId"
            :loading="journalAccountEnum.isLoading"
            :search-list="journalAccountEnum.list"
            title="account_name"
            placeholder="Search Journal Account"
        />
    </div>
</template>
