<script setup lang="ts">
import { useAccountingEnumStore } from "~/stores/accounting/enums/enum"
const enums = useAccountingEnumStore()
const { payeeEnum } = storeToRefs(enums)
onMounted(() => {
    if (!payeeEnum.value.isLoaded) {
        enums.getPayeesEnum()
    }
})
const payeeInfo = defineModel("payeeInfo", { required: false, type: Object, default: {} })
defineProps({
    stakeholderId: { type: Boolean, default: true },
})
watch(payeeInfo, (newValue) => {
    payeeInfo.value = newValue
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
