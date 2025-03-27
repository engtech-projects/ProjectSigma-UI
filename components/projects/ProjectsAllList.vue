<script setup>

const headers = [
    { name: "PROJECT CODE", id: "project_code", style: "text-left" },
    { name: "LOCATION", id: "location", style: "text-left" },
    { name: "AMOUNT", id: "amount", style: "text-left" },
    { name: "CREATED AT", id: "created_at", style: "text-left" },
    { name: "STATUS", id: "status", style: "text-left" },
]
const actions = {
    detail: true,
}

const { projects } = useProjectState()
const showDetail = (data) => {
    navigateTo("/project-monitoring/my-drafts?project_code=" + data.project_code)
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
            <LayoutPsTable :header-columns="headers" :datas="projects" :actions="actions" @detail-row="showDetail" />
        </LayoutAcessContainer>
    </LayoutBoards>
</template>
