<script setup>
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()

const { archivedList } = storeToRefs(projectStore)

const changePaginate = (newParams) => {
    archivedList.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "PROJECT NAME", id: "name", style: "text-left" },
    { name: "LOCATION", id: "location", style: "text-left" },
    { name: "AMOUNT", id: "amount", style: "text-left" },
    { name: "CREATED AT", id: "created_at", style: "text-left" },
    { name: "STATUS", id: "stage", style: "text-left" },
]
const actions = {
    showTable: true,
}
const ddata = computed(() => {
    return archivedList.value.list ?? []
})
const projectDetails = (data) => {
    navigateTo(`/project-monitoring/information?id=${data.id}`)
}
</script>
<template>
    <LayoutBoards class="w-full" :loading="archivedList.isLoading">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.PROJECT_MONITORING_MARKETING_ARCHIVED_LIST,
            ])"
        >
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutPsTable
                    :header-columns="headers"
                    :actions="actions"
                    :datas="ddata ?? []"
                    @show-table="projectDetails"
                />
                <div class="flex justify-center mx-auto">
                    <CustomPagination :links="archivedList.pagination" @change-params="changePaginate" />
                </div>
            </div>
        </LayoutAcessContainer>
    </LayoutBoards>
</template>
