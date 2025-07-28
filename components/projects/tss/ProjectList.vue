<script setup>
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()

const { awardedTssList } = storeToRefs(projectStore)

const changePaginate = (newParams) => {
    awardedTssList.value.params.page = newParams.page ?? ""
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
const emit = defineEmits([
    "search"
])
const search = (value) => {
    emit("search", value)
}
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
    navigateTo(`/project-monitoring/information?id=${data.id}`)
}
</script>
<template>
    <LayoutBoards class="w-full" :title="props.title" :loading="awardedTssList.isLoading">
        <template v-if="props.showSearch" #header-options>
            <BasicSearchBar class="w-1/3 mb-2" @search="search" />
        </template>
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.PROJECTMONITORING_MARKETING_AWARDEDLIST,
            ])"
        >
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutPsTable
                    :header-columns="headers"
                    :actions="actions"
                    :datas="awardedTssList.list ?? []"
                    @show-table="projectDetails"
                />
                <div class="flex justify-center mx-auto">
                    <PsCustomPagination :links="awardedTssList.pagination" @change-params="changePaginate" />
                </div>
            </div>
        </LayoutAcessContainer>
    </LayoutBoards>
</template>
