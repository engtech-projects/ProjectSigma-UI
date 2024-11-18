<script setup>
import { storeToRefs } from "pinia"
import { useBOMStore } from "@/stores/inventory/bom"
const BOMStore = useBOMStore()
const { myRequests: List } = storeToRefs(BOMStore)
onMounted(() => {
    if (!List.value.isLoaded) {
        BOMStore.getMyRequests()
    }
})
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    navigateTo({
        path: "/inventory/bom/request-details",
        query: {
            key: data.id
        },
        replace: true
    })
}

const headers = [
    { name: "Item Summary", id: "profile_summary" },
    { name: "Request Status", id: "request_status" },
]
const actions = {
    showTable: true,
}

const changePaginate = (newParams) => {
    List.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="List.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <div class="flex flex-col gap-4 mb-5">
                <div class="flex flex-row gap-4 justify-start items-center">
                    <div class="flex flex-row justify-center items-center">
                        <label class="text-">Assignment :</label>
                    </div>
                    <div>
                        <HrmsCommonDepartmentSelector v-model="List.params.assignment_id" />
                    </div>
                </div>
                <InventoryCommonLayoutBOMTable
                    :header-columns="headers"
                    :actions="actions"
                    :datas="List.list ?? []"
                    @show-table="showInformation"
                />
            </div>
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="List.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
    <InventoryItemProfileInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
