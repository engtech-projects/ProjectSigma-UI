<script setup>

import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
const manpowers = useManpowerStore()
const { forHiringRequests, manpower, isDetail } = storeToRefs(manpowers)
const debouncedGetData = useDebouncedFn(() => {
    manpowers.getManpowerHiringRequests()
}, 500)
onMounted(() => {
    if (!forHiringRequests.value.isLoaded) {
        debouncedGetData()
    }
})
watch(
    () => ({ ...forHiringRequests.value.params }),
    (newParams, oldParams) => {
        if (newParams.page === oldParams.page) {
            forHiringRequests.value.params.page = 1
        }
        debouncedGetData()
    },
    { deep: true }
)
const changePaginate = (newParams) => {
    forHiringRequests.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "Position/Title", id: "position.name" },
    { name: "Requesting Department", id: "requesting_department_name" },
    { name: "Employment Type", id: "employment_type" },
    { name: "Nature of Request", id: "nature_of_request" },
    { name: "Requested By", id: "requested_by_user_name" },
]
const actions = {
    showTable: false,
    edit: false,
    detail: true
}

const setDetail = (jobapp) => {
    isDetail.value = true
    manpower.value = jobapp
    if (jobapp && typeof jobapp === "object") {
        // const applicantCount = jobapp.job_applicants.length
        manpower.value = jobapp
    }
}
</script>
<template>
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <LayoutBoards title="Open Positions" class="w-full" :loading="forHiringRequests.isLoading">
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2 ">
                <LayoutPsTable
                    :header-columns="headers"
                    :datas="forHiringRequests.list ?? []"
                    :actions="actions"
                    @detail-row="setDetail"
                />
            </div>
            <div class="flex justify-center mx-auto p-2">
                <PsCustomPagination :links="forHiringRequests.pagination" @change-params="changePaginate" />
            </div>
        </LayoutBoards>
        <HrmsEmployeeJobHiringDetails v-show="isDetail" :manpower-data="manpower" class="w-full" />
    </div>
</template>
