<script setup>
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()

const headers = [
    { text: "ID", value: "employee_id" },
    { text: "employee_uploads", value: "employee_uploads" },
    { text: "Action", value: "actions" },
]

const selectedItemDetailsDocs = ref(null)

const viewItemMemo = (item) => {
    selectedItemDetailsDocs.value = item
}

const downloadItemMemo = (item) => {
    const fileUrl = item.file_url // Replace 'file_url' with the actual property name

    const downloadLink = document.createElement("a")
    downloadLink.href = fileUrl
    downloadLink.download = item.document_name // Set the file name for download

    document.body.appendChild(downloadLink)
    downloadLink.click()

    document.body.removeChild(downloadLink)
}

const closeViewModal = () => {
    selectedItemDetailsMemo.value = null
}
</script>

<template>
    <div
        class="shadow-md p-4 bg-white mb-3 border border-gray-200 rounded-lg w-full md:w-1/2"
    >
        <div class="text-lg">
            <p>MEMO</p>
        </div>
        <EasyDataTable
            show-index
            :headers="headers"
            :items="employee.information.memo ?? []"
            class="z-0 mt-7"
        >
            <template #item-actions="item">
                <div class="flex gap-4">
                    <button
                        @click="viewItemMemo(item)"
                    >
                        <Icon name="material-symbols:visibility-rounded" color="teal" class="w-4 h-4 " />
                    </button>
                    <button
                        @click="downloadItemMemo(item)"
                    >
                        <Icon name="ic:sharp-file-download" color="green" class="w-4 h-4 " />
                    </button>
                </div>
            </template>
        </EasyDataTable>

        <div v-if="selectedItemDetailsDocs">
            <Teleport to="body">
                <div class="fixed inset-1 bg-black opacity-70" />
                <div class="fixed inset-1 flex items-center justify-center">
                    <div class="bg-white p-4 max-w-lg rounded-lg border border-slate-300">
                        <h2 class="text-lg font-semibold">
                            Document Details
                        </h2>
                        <hr>
                        <ul class="mt-4 p-4">
                            <li><strong class="text-teal-500">Document Name:</strong> {{ selectedItemDetailsDocs.employee_uploads }}</li>
                            <li><strong class="text-teal-500">Type:</strong> {{ selectedItemDetailsDocs.upload_type }}</li>
                        </ul>
                        <div class="flex gap-2 justify-between">
                            <button
                                @click="downloadItemDocs(item)"
                            >
                                <Icon name="ic:sharp-file-download" color="green" class="w-4 h-4 " />
                                Download
                            </button>
                            <button
                                @click="closeViewModal"
                            >
                                <Icon name="cil:x" color="green" class="w-4 h-4 " />
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </Teleport>
        </div>
    </div>
</template>
