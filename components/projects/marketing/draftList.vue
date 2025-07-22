<script setup>
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()

const { draftList } = storeToRefs(projectStore)

const changePaginate = (newParams) => {
    draftList.value.params.page = newParams.page ?? ""
}
const headers = [
    { name: "PROJECT NAME", id: "name", style: "text-left" },
    { name: "LOCATION", id: "location", style: "text-left" },
    { name: "AMOUNT", id: "amount", style: "text-left" },
    { name: "DATE CREATED", id: "created_at", style: "text-left" },
    { name: "STATUS", id: "stage", style: "text-left" },
]
const actions = {
    showTable: true,
}
const ddata = computed(() => {
    return draftList.value.list ?? []
})
const projectDetails = (data) => {
    navigateTo(`/project-monitoring/information?id=${data.id}`)
}
</script>
<template>
    <LayoutBoards class="w-full" :loading="draftList.isLoading">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.PROJECTMONITORING_MARKETING_DRAFTLIST,
            ])"
        >
            <div class="w-1/3 hidden">
                <LayoutFormPsTextInput v-model="draftList.params.key" title="PROJECT CODE" class="w-full" />
            </div>
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutPsTable
                    :header-columns="headers"
                    :actions="actions"
                    :datas="ddata ?? []"
                    @show-table="projectDetails"
                />
                <div class="flex justify-center mx-auto">
                    <PsCustomPagination :links="draftList.pagination" @change-params="changePaginate" />
                </div>
            </div>
        </LayoutAcessContainer>
    </LayoutBoards>
    <!-- <AccountingRequestNonPurchaseRequestInfoModal
        v-model:showModal="showInformationModal"
        :fillable="false"
        :payment-data="requestData"
    /> -->
</template>
