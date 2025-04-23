<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()

const draftProjects = computed(() => {
    return projectStore.list.filter(item => item.stage === props.status)
})
const props = defineProps({
    status: {
        type: String,
        default: "Drafts"
    }
})
const headers = [
    { name: "PROJECT CODE", id: "code", style: "text-left" },
    { name: "LOCATION", id: "location", style: "text-left" },
    { name: "AMOUNT", id: "amount", style: "text-left" },
    { name: "CREATED AT", id: "contract_date", style: "text-left" },
    { name: "STATUS", id: "stage", style: "text-left" },
]
const actions = {
    detail: true,
}

const showDetail = (data) => {
    navigateTo("/project-monitoring/my-drafts?id=" + data.id)
}
</script>
<template>
    <LayoutBoards class="w-full">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_ALL,
            ])"
        >
            <div class="w-1/3 flex flex-col mb-4">
                <label for="" class="text-black text-md">
                    Project Code / Project Name
                </label>
                <input type="text" class="w-full rounded-lg h-10 border border-gray-300">
            </div>
            <LayoutPsTable :header-columns="headers" :datas="draftProjects" :actions="actions" @detail-row="showDetail" />
        </LayoutAcessContainer>
    </LayoutBoards>
</template>
