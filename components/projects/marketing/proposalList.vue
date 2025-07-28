<script setup>
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()

const { proposalList } = storeToRefs(projectStore)

const requestData = ref(null)
const showInformationModal = ref(false)

const draftDetails = (data) => {
    navigateTo(`/project-monitoring/information?id=${data.id}`)
}
const changePaginate = (newParams) => {
    proposalList.value.params.page = newParams.page ?? ""
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
    return proposalList.value.list ?? []
})
</script>
<template>
    <LayoutBoards class="w-full" :loading="proposalList.isLoading">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.PROJECTMONITORING_MARKETING_PROPOSALLIST,
            ])"
        >
            <div class="w-1/3 hidden">
                <LayoutFormPsTextInput v-model="proposalList.params.key" title="PROJECT CODE" class="w-full" />
            </div>
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutPsTable
                    :header-columns="headers"
                    :actions="actions"
                    :datas="ddata ?? []"
                    @show-table="draftDetails"
                />
                <div class="flex justify-center mx-auto">
                    <PsCustomPagination :links="proposalList.pagination" @change-params="changePaginate" />
                </div>
            </div>
        </LayoutAcessContainer>
    </LayoutBoards>
    <AccountingRequestNonPurchaseRequestInfoModal
        v-model:showModal="showInformationModal"
        :fillable="false"
        :payment-data="requestData"
    />
</template>
