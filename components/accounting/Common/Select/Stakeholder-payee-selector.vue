<script setup lang="ts">
import { useAccountingEnumStore } from "~/stores/accounting/enums/enum"
const enums = useAccountingEnumStore()
const { payeeEnum } = storeToRefs(enums)
const props = defineProps({
    stakeholderId: { type: Boolean, default: true },
    selectType: { type: String, default: "" },
})
const payeeInfo = defineModel("payeeInfo", { required: false, type: Object, default: {} })

watch(payeeInfo, (newValue) => {
    payeeInfo.value = newValue
})
watch(() => props.selectType, (newValue) => {
    if (!payeeEnum.value.isLoaded && newValue === "payee") {
        enums.getPayeesEnum()
    }
})
</script>
<template>
    <div class="relative">
        <LayoutFormPsSelectSearch
            v-model:result="payeeInfo"
            v-model:search-input="payeeEnum.params.key"
            :loading="payeeEnum.isLoading"
            :search-list="payeeEnum.list"
            title="name"
            placeholder="Search Payee"
        />
    </div>
</template>
