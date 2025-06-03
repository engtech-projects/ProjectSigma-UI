<script setup>
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()

const { awardedList } = storeToRefs(projectStore)

await projectStore.getAwardedProjects()
const changePaginate = (newParams) => {
    awardedList.value.params.page = newParams.page ?? ""
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
    return awardedList.value.list ?? []
})
const draftDetais = (data) => {
    navigateTo(`/project-monitoring/my-drafts?id=${data.id}`)
}
</script>
<template>
    <LayoutBoards class="w-full" :loading="awardedList.isLoading">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.PROJECT_MONITORING_MARKETING_AWARDED_LIST,
            ])"
        >
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutPsTable
                    :header-columns="headers"
                    :actions="actions"
                    :datas="ddata ?? []"
                    @show-table="draftDetais"
                />
                <div class="flex justify-center mx-auto">
                    <CustomPagination :links="awardedList.pagination" @change-params="changePaginate" />
                </div>
            </div>
        </LayoutAcessContainer>
    </LayoutBoards>
</template>
