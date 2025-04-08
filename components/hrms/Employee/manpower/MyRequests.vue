<script setup>

import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
const manpowers = useManpowerStore()
const { myRequests } = storeToRefs(manpowers)
onMounted(() => {
    if (!myRequests.value.isLoaded) {
        manpowers.getMyRequests()
    }
})
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    navigateTo({
        path: "/hrms/employee/position-details",
        query: {
            key: data.id
        },
    })
}

const changePaginate = (newParams) => {
    myRequests.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "Requesting Department", id: "requesting_department_name" },
    { name: "Position/Title", id: "position.name" },
    { name: "Date Requested", id: "date_requested" },
    { name: "Date Required", id: "date_required" },
    { name: "Employment Type", id: "employment_type" },
    { name: "Nature of Request", id: "nature_of_request" },
    { name: "Requested by", id: "requested_by_user_name" },
    { name: "Fill Status", id: "fill_status" },
    { name: "Request Status", id: "request_status" },
]
const actions = {
    showTable: true,
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="myRequests.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <table class="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th
                                v-for="header in headers"
                                :key="header.name+'headerRow'"
                                class="p-2"
                                :class="header.style ?? ''"
                            >
                                {{ header.name }}
                            </th>
                            <th v-if="actions" class="p-2">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="!myRequests.list">
                            <td :colspan="headers.length + 1" class="text-center">
                                NO DATA
                            </td>
                        </tr>
                        <template v-else>
                            <tr v-for="dataValue, index in myRequests.list" :key="index" class="border text-center">
                                <td
                                    class="p-2"
                                >
                                    {{ dataValue.requesting_department_name }}
                                </td>
                                <td
                                    class="p-2"
                                >
                                    {{ dataValue.position ? dataValue.position.name : "" }}
                                </td>
                                <td
                                    class="p-2"
                                >
                                    {{ dataValue.date_requested }}
                                </td>
                                <td
                                    class="p-2"
                                >
                                    {{ dataValue.date_required }}
                                </td>
                                <td
                                    class="p-2"
                                >
                                    {{ dataValue.employment_type }}
                                </td>
                                <td
                                    class="p-2"
                                >
                                    {{ dataValue.nature_of_request }}
                                </td>
                                <td
                                    class="p-2"
                                >
                                    {{ dataValue.requested_by_user_name }}
                                </td>
                                <td
                                    class="p-2"
                                >
                                    {{ dataValue.fill_status }}
                                </td>
                                <td
                                    class="p-2"
                                >
                                    {{ dataValue.request_status }}
                                </td>
                                <td v-if="actions" class=" p-2 flex gap-2 justify-center">
                                    <button v-if="actions.showTable" @click="showInformation(dataValue)">
                                        <Icon name="material-symbols:visibility-rounded" color="white" class="bg-teal-700 rounded h-8 w-8 p-1" />
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="flex justify-center mx-auto p-2">
            <CustomPagination :links="myRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
    <HrmsEmployeeManpowerInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
