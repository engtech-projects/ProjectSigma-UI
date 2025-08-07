<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useRevisionStore } from "@/stores/project-monitoring/revisions"
const revisionStore = useRevisionStore()
const { allRevisionList } = storeToRefs(revisionStore)
const headers = [
    { name: "PROJECT NAME", id: "project_name", style: "text-left" },
    { name: "PROJECT CODE", id: "project_code", style: "text-left" },
]
const actions = {
    showTable: true,
    custom: true,
}
const changePaginate = (newParams) => {
    allRevisionList.value.params.page = newParams.page ?? ""
}
const projectDetails = (data: any) => {
    navigateTo(`/project-monitoring/information/revision-view?id=${data.id}`)
}
const duplicateProject = (data: any) => {
    revisionStore.copyToProjectRevisions(data.id)
}
</script>
<template>
    <LayoutBoards title="Projects List">
        <div class="text-gray-500 flex flex-col gap-4 p-2">
            <BasicSearchBar v-model="allRevisionList.params.project_key" class="w-full my-2" />
            <LayoutLoadingContainer :loading="allRevisionList.isLoading">
                <LayoutPsTable
                    :header-columns="headers"
                    :actions="actions"
                    :datas="allRevisionList.list ?? []"
                    @show-table="projectDetails"
                    @custom-action="duplicateProject"
                />
                <div class="flex justify-center mx-auto">
                    <PsCustomPagination :links="allRevisionList.pagination" @change-params="changePaginate" />
                </div>
            </LayoutLoadingContainer>
        </div>
    </LayoutBoards>
</template>
