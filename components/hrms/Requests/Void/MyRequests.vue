<script setup>
import { useVoidStore } from "~/stores/hrms/requests/void"

const voidStore = useVoidStore()
const { myRequests } = storeToRefs(voidStore)
onMounted(() => {
    if (!myRequests.value.isLoaded) {
        myRequests.value.isLoaded = true
        voidStore.getMyRequests()
    }
})

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
const changePaginate = (newParams) => {
    myRequests.value.params.page = newParams.page ?? ""
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
    <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
        <LayoutLoadingContainer :loading="myRequests.isLoading">
            <HrmsRequestsVoidListFilters v-model="myRequests" />
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myRequests.list ?? []"
                @show-table="showInformation"
            />
        </LayoutLoadingContainer>
    </div>
    <div class="flex justify-center mx-auto">
        <PsCustomPagination :links="myRequests.pagination" @change-params="changePaginate" />
    </div>
</template>
