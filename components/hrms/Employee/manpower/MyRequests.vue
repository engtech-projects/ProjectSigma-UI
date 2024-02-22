<script setup>

import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/employee/manpower"
const manpowers = useManpowerStore()
const { myRequestList: manpowerList } = storeToRefs(manpowers)

const headers = [
    { name: "Requesting Department", id: "requesting_department" },
    { name: "Position/Title", id: "position" },
    { name: "Date Requested", id: "date_requested" },
    { name: "Date Required", id: "date_required" },
    { name: "Employment Type", id: "employment_type" },
    { name: "Nature of Request", id: "nature_of_request" },
    { name: "Requested by", id: "requested_by" },
    { name: "Request Status", id: "request_status" },
]

const boardLoading = ref(false)

</script>

<template>
    <LayoutBoards title="My Requests" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable :header-columns="headers" :datas="manpowerList" @edit-row="setEdit" @delete-row="deleteManpwr" />
        </div>
    </LayoutBoards>
</template>
