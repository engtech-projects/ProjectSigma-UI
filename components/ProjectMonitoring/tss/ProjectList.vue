<script setup>
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()

const { projectTssList } = storeToRefs(projectStore)

const changePaginate = (newParams) => {
    projectTssList.value.params.page = newParams.page ?? ""
}
const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    showSearch: {
        type: Boolean,
        default: false,
    }
})
const headers = [
    { name: "PROJECT NAME", id: "name", style: "text-left" },
    { name: "PROJECT CODE", id: "code", style: "text-left" },
    { name: "LOCATION", id: "location", style: "text-left" },
    { name: "AMOUNT", id: "amount", style: "text-left" },
    { name: "DATE CREATED", id: "created_at", style: "text-left" },
    { name: "STATUS", id: "stage", style: "text-left" },
]
const actions = {
    showTable: true,
}
const projectDetails = (data) => {
    navigateTo(`/project-monitoring/technical-service/project-details?id=${data.id}`)
}
</script>
<template>
    <LayoutBoards class="w-full" :title="props.title">
        <template v-if="props.showSearch" #header-options>
            <BasicSearchBar v-model="projectTssList.params.project_key" class="w-1/3 mb-2" />
        </template>
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.PROJECTMONITORING_MARKETING_AWARDEDLIST,
            ])"
        >
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutLoadingContainer :loading="projectTssList.isLoading">
                    <LayoutPsTable
                        :header-columns="headers"
                        :actions="actions"
                        :datas="projectTssList.list ?? []"
                        @show-table="projectDetails"
                    />
                </LayoutLoadingContainer>
                <div class="flex justify-center mx-auto">
                    <PsCustomPagination :links="projectTssList.pagination" @change-params="changePaginate" />
                </div>
            </div>
        </LayoutAcessContainer>
    </LayoutBoards>
</template>
