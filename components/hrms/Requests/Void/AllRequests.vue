<script setup>
import { useVoidStore } from "@/stores/hrms/requests/void"

const voidStore = useVoidStore()
const { allRequests } = storeToRefs(voidStore)
onMounted(() => {
    if (!allRequests.value.isLoaded) {
        allRequests.value.isLoaded = true
        voidStore.getAllRequests()
    }
})
onUnmounted(() => {
    allRequests.value.isLoaded = false
})

const changePaginate = (newParams) => {
    allRequests.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "Void Type", id: "void_type" },
    { name: "Requested By", id: "created_by_user_name" },
    { name: "Requested On", id: "created_at_human" },
    { name: "Reason", id: "reason_for_void" },
    { name: "Status", id: "request_status" },
]
const actions = {
    showTable: true,
}
const showInformation = (data) => {
    navigateTo({
        path: "/hrms/requests/void/details",
        query: {
            id: data.id
        },
    })
}

</script>
<template>
    <div class="pb-2 text-gray-500 p-2">
        <LayoutLoadingContainer :loading="allRequests.isLoading">
            <HrmsRequestsVoidListFilters v-model="allRequests" />
            <LayoutPsTable
                :header-columns="headers"
                :datas="allRequests.list"
                :actions="actions"
                @show-table="showInformation"
            />
        </LayoutLoadingContainer>
    </div>
    <div class="flex justify-center mx-auto">
        <CustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
    </div>
</template>
