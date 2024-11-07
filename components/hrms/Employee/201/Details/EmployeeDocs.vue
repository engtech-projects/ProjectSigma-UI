<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const config = useRuntimeConfig()
const employee = useEmployeeInfo()
const snackbar = useSnackbar()
const boardLoading = ref(false)

const { information } = storeToRefs(employee)

const headers = [
    { text: "File", value: "employee_uploads" },
    { text: "Type", value: "upload_type" },
    { text: "Action", value: "actions" },
]
const selectedItemDetailsDocs = ref(null)

const viewItemDocs = (item) => {
    selectedItemDetailsDocs.value = item
}

const closeViewModal = () => {
    selectedItemDetailsDocs.value = null
}

const handleDocumentUpload = async (event) => {
    try {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append("employee_uploads", event.target.files[0].name)
        formData.append("employee_id", employee.information.id)
        formData.append("upload_type", "Documents")
        formData.append("file", file)
        await employee.uploadDoc(formData)
        snackbar.add({
            type: "success",
            text: employee.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    } finally {
        boardLoading.value = false
    }
}
</script>
<template>
    <div
        class="shadow-md p-4 bg-white mb-3 border border-gray-200 rounded-lg w-full md:w-1/2"
    >
        <div class="pb-2 text-black font-medium text-lg">
            <div class="flex gap-2 items-center">
                <p>
                    DOCUMENT
                </p>
                <span class="content-center">
                    <label for="floating_application_letter_attachment" class="block  text-sm font-medium dark:text-white border rounded-xl p-1 px-2 bg-green-500 text-gray-50 hover:bg-green-700">
                        <Icon name="material-symbols:upload-file-sharp" />
                        new
                    </label>
                </span>
                <input
                    id="floating_application_letter_attachment"
                    class="hidden w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    type="file"
                    accept=".doc, .docx, .pdf"
                    required
                    @change="handleDocumentUpload"
                >
            </div>
        </div>
        <EasyDataTable
            show-index
            :headers="headers"
            :items=" information.docs ?? []"
            class="mt-5 z-0"
        >
            <template #item-actions="item">
                <div class="flex gap-4">
                    <button
                        @click="viewItemDocs(item)"
                    >
                        <Icon name="material-symbols:visibility-rounded" color="teal" class="w-4 h-4 " />
                    </button>
                    <a
                        :href="config.public.HRMS_API_URL + '/storage/' + item.file_location"
                        target="_blank"
                    >
                        <Icon name="ic:sharp-file-download" color="green" class="w-4 h-4 " />

                    </a>
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
