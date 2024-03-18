<script setup>
import { storeToRefs } from "pinia"
import { usePersonelActionNotice } from "@/stores/hrms/pan"
const pan = usePersonelActionNotice()

const { myPanList } = storeToRefs(pan)
const boardLoading = ref(false)

const panData = ref(null)
const showInformationModal = ref(false)

const showInformation = (data) => {
    panData.value = data
    showInformationModal.value = true
}
const closeViewModal = () => {
    showInformationModal.value = false
}

const headers = [
    { name: "REQUEST TYPE", id: "type" },
    { name: "NAME", id: "fullname" },
    { name: "DATE EFFECTIVITY", id: "date_of_effictivity" },
]

const actions = {
    showTable: true,
}

</script>

<template>
    <LayoutBoards title="MY PERSONEL NOTICE REQUEST" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myPanList"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <div v-if="showInformationModal">
        <Teleport to="body">
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                <div class="bg-white p-4 w-8/12 h-4/5 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute">
                    <div class="flex gap-2 justify-between p-2">
                        <p>Personel Action Notice (<span class="text-blue-500">{{ panData.type }}</span>)</p>
                        <button
                            @click="closeViewModal"
                        >
                            <Icon name="cil:x" color="green" class="w-4 h-4 " />
                            Close
                        </button>
                    </div>
                    <div class="p-2">
                        <HrmsEmployeePanPersonalActionFormInfo :pan-data="panData" :type="'myPan'" />
                    </div>
                    <div class="flex gap-2 p-2 justify-end">
                        <button
                            class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                            @click="approvedRequest(employeeData.id)"
                        >
                            Approved Request
                        </button>
                        <button
                            class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                            @click="deniedRequest(employeeData.id)"
                        >
                            Denied Request
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>
