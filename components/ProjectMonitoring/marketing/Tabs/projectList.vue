<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()

const { myProjectList } = storeToRefs(projectStore)

const changePaginate = (newParams: any) => {
    myProjectList.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "PROJECT NAME", id: "name", style: "text-left" },
    { name: "LOCATION", id: "location", style: "text-left" },
    { name: "AMOUNT", id: "amount", style: "text-left" },
    { name: "DATE CREATED", id: "created_at", style: "text-left" },
    { name: "STATUS", id: "stage", style: "text-left" },
    { name: "TSS Submission", id: "tss_submission", style: "text-left" },
]
const actions = {
    showTable: true,
}
const ddata = computed(() => {
    return myProjectList.value.list ?? []
})
const projectDetails = (data: any) => {
    navigateTo(`/project-monitoring/information?id=${data.id}`)
}
</script>
<template>
    <LayoutBoards class="w-full">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.PROJECTMONITORING_MARKETING_MYPROJECTS,
            ])"
        >
            <div class="flex flex-row justify-items-start items-start">
                <div class="w-1/3 px-4">
                    <ProjectMonitoringProjectStatusSelector v-model="myProjectList.params.stage_status" />
                </div>
                <div class="w-1/3 px-4">
                    <label class="block text-sm font-medium text-gray-700"> Search </label>
                    <BasicSearchBar v-model="myProjectList.params.project_key" class="w-full mb-2" />
                </div>
            </div>
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutLoadingContainer :loading="myProjectList.isLoading">
                    <LayoutPsTable
                        :header-columns="headers"
                        :actions="actions"
                        :datas="ddata ?? []"
                        @show-table="projectDetails"
                    />
                </LayoutLoadingContainer>
                <div class="flex justify-center mx-auto">
                    <PsCustomPagination :links="myProjectList.pagination" @change-params="changePaginate" />
                </div>
            </div>
        </LayoutAcessContainer>
    </LayoutBoards>
</template>
