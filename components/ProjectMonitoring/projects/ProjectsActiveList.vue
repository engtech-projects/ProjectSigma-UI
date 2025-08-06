<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()

const { activeList } = storeToRefs(projectStore)

const changePaginate = (newParams: any) => {
    activeList.value.params.page = newParams.page ?? ""
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
    return activeList.value.list ?? []
})
const projectDetails = (data: any) => {
    navigateTo(`/project-monitoring/projects/timeline?id=${data.id}`)
}
</script>
<template>
    <LayoutBoards class="w-full">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.PROJECTMONITORING_PROJECTS,
            ])"
        >
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutLoadingContainer :loading="activeList.isLoading">
                    <LayoutPsTable
                        :header-columns="headers"
                        :actions="actions"
                        :datas="ddata ?? []"
                        @show-table="projectDetails"
                    />
                </LayoutLoadingContainer>
                <div class="flex justify-center mx-auto">
                    <PsCustomPagination :links="activeList.pagination" @change-params="changePaginate" />
                </div>
            </div>
        </LayoutAcessContainer>
    </LayoutBoards>
</template>
