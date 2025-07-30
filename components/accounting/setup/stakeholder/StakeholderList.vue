<script setup>
import { storeToRefs } from "pinia"
import { useStakeHolderStore } from "@/stores/accounting/setup/stakeholder"

const stakeholderStore = useStakeHolderStore()

const { list: stakeholderList, getParams, pagination, errorMessage, successMessage } = storeToRefs(stakeholderStore)

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    stakeholderStore.getStakeholders()
}

const headers = [
    { name: "Name", id: "name", style: "text-left" },
    { name: "Type", id: "stakeholder_type", style: "text-left" },
]

const stakeholderType = (str) => {
    if (str) {
        const parts = str.split("\\")
        return parts[parts.length - 1]
    }
    return "N/A"
}
const stakeholdersList = computed(() => {
    const list = []
    stakeholderList.value.forEach((st) => {
        st.stakeholder_type = stakeholderType(st.stakeholdable_type)
        list.push(st)
    })
    return list
})
</script>
<template>
    <LayoutBoards title="Payee List" class="w-full" :loading="stakeholderStore.isLoading">
        <div class="w-1/2 flex px-4">
            <LayoutFormPsTextInput v-model="stakeholderStore.getParams.key" title="Search Payee" class="w-full" />
        </div>
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="stakeholdersList" class="!text-left" />
        </div>
        <div class="flex justify-center mx-auto my-8">
            <PsCustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
        <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
            {{ errorMessage }}
        </p>
        <p
            v-show="successMessage"
            hidden
            class="success-message text-green-600 text-center font-semibold italic"
        >
            {{ successMessage }}
        </p>
    </LayoutBoards>
</template>
