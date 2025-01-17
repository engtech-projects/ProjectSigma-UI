<script setup lang="ts">
import { useAccountingEnumStore } from "~/stores/accounting/enums/enum"
const enums = useAccountingEnumStore()
const { usersEnum } = storeToRefs(enums)
const props = defineProps({
    stakeholderId: { type: Boolean, default: true },
    selectType: { type: String, default: "" },
})

const userInfo = defineModel("userInfo", { required: false, type: Object, default: {} })

watch(userInfo, (newValue) => {
    userInfo.value = newValue
})
watch(() => props.selectType, (newValue) => {
    if (!usersEnum.value.isLoaded && newValue === "user") {
        enums.getUsersEnums()
    }
})
</script>
<template>
    <div class="relative">
        <LayoutFormPsSelectSearch
            v-model:result="userInfo"
            v-model:search-input="usersEnum.params.key"
            :loading="usersEnum.isLoading"
            :search-list="usersEnum.list"
            title="name"
            placeholder="Search User"
        />
    </div>
</template>
