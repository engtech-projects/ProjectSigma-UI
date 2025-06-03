<script setup>
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()

const { onHoldList } = storeToRefs(projectStore)

await projectStore.getOnHoldProjects()
const changePaginate = (newParams) => {
    onHoldList.value.params.page = newParams.page ?? ""
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
    return onHoldList.value.list ?? []
})
const draftDetais = (data) => {
    navigateTo(`/project-monitoring/my-drafts?id=${data.id}`)
}
</script>
<template>
    <LayoutBoards class="w-full" :loading="onHoldList.isLoading">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.PROJECT_MONITORING_MARKETING_ON_HOLD_LIST,
            ])"
        >
            <div class="w-1/3 px-4">
                <label for="status" class="block text-sm font-medium text-gray-700">Project Status</label>
                <select v-model="onHoldList.params.key" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option :value="null" disabled selected>
                        - Select -
                    </option>
                    <option :value="ProjectStatus.DRAFT">
                        Draft
                    </option>
                    <option :value="ProjectStatus.PROPOSAL">
                        Proposal
                    </option>
                    <option :value="ProjectStatus.AWARDEED">
                        Awarded
                    </option>
                    <option :value="ProjectStatus.BIDDING">
                        Bidding
                    </option>
                    <option :value="ProjectStatus.ON_HOLD">
                        On Hold
                    </option>
                </select>
            </div>
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutPsTable
                    :header-columns="headers"
                    :actions="actions"
                    :datas="ddata ?? []"
                    @show-table="draftDetais"
                />
                <div class="flex justify-center mx-auto">
                    <CustomPagination :links="onHoldList.pagination" @change-params="changePaginate" />
                </div>
            </div>
        </LayoutAcessContainer>
    </LayoutBoards>
</template>
