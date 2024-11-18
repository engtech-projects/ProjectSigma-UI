<script setup lang="ts">
import { useAccountingEnumStore } from "~/stores/accounting/enums/enum"
const enums = useAccountingEnumStore()
const { usersEnum } = storeToRefs(enums)
onMounted(() => {
    if (!usersEnum.value.isLoaded) {
        enums.getUsersEnums()
    }
})
const userInfo = defineModel("userInfo", { required: false, type: Object, default: {} })
defineProps({
    stakeholderId: { type: Boolean, default: true },
})
watch(userInfo, (newValue) => {
    userInfo.value = newValue
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
