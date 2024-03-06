<script setup>
import { useEmployeeInfo } from "@/stores/hrms/employee"
const { token } = useAuth()
const employee = useEmployeeInfo()
const config = useRuntimeConfig()
const snackbar = useSnackbar()
const boardLoading = ref(false)

const headers = [
    { text: "employee_uploads", value: "employee_uploads" },
    { text: "Type", value: "upload_type" },
]

const selectedItemDetailsDocs = ref(null)

const viewItemDocs = (item) => {
    // console.log('Selected Item Details:', item);
    selectedItemDetailsDocs.value = item
}

const downloadItemDocs = (item) => {
    const fileUrl = item.file_url // Replace 'file_url' with the actual property name

    const downloadLink = document.createElement("a")
    downloadLink.href = fileUrl
    downloadLink.download = item.document_name // Set the file name for download

    document.body.appendChild(downloadLink)
    downloadLink.click()

    document.body.removeChild(downloadLink)
}
const closeViewModal = () => {
    selectedItemDetailsDocs.value = null
}

const handleDocumentUpload = async (event) => {
    boardLoading.value = true
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append("employee_uploads", files[0].name)
    formData.append("employee_id", employee.information.id)
    formData.append("upload_type", "Documents")
    formData.append("file", file)
    await useFetch(
        "/api/employee-uploads",
        {
            baseURL: config.public.HRMS_API_URL,
            method: "POST",
            headers: {
                Authorization: token.value + "",
                Accept: "application/json"
            },
            body: formData,
            watch: false,
            onResponse: ({ response }) => {
                if (response.status >= 200 && response.status <= 299) {
                    docsList.value = response._data?.data
                    snackbar.add({
                        type: "success",
                        text: response._data.message
                    })
                } else {
                    snackbar.add({
                        type: "danger",
                        text: "Error Extracting Data" + response._data.message
                    })
                    throw new Error(response._data.message)
                }
            },
        }
    )
    selectedEmployeeDetails.value = true
    boardLoading.value = false
}
</script>

<template>
    <div
        class="shadow-md p-4 bg-white mb-3 border border-gray-200 rounded-lg w-full md:w-1/2"
    >
        <div class="pb-2 text-black font-medium text-lg">
            <div>
                <p>DOCUMENT</p>
            </div>
            <div class="relative z-0 w-full mb-5 group col-span-2">
                <label for="floating_application_letter_attachment" class="block  text-sm font-medium text-gray-900 dark:text-white">Application Document Attachment</label>
                <input
                    id="floating_application_letter_attachment"
                    class="block w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    type="file"
                    accept=".doc, .docx, .pdf"
                    required
                    @change="handleDocumentUpload"
                >
                <p class="flex justify-center mx-auto text-xs text-gray-500 dark:text-gray-300 uppercase">
                    doc/docx/pdf
                </p>
            </div>
        </div>
        <EasyDataTable
            show-index
            :headers="headers"
            :items="employee.information.docs ?? []"
            class="mt-5 z-0"
        >
            <template #item-actions="item">
                <div class="flex gap-4">
                    <button
                        @click="viewItemDocs(item)"
                    >
                        <Icon name="material-symbols:visibility-rounded" color="teal" class="w-4 h-4 " />
                    </button>
                    <button
                        @click="downloadItemDocs(item)"
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
                            Item Details
                        </h2>
                        <hr>
                        <ul class="mt-4">
                            <li><strong class="text-teal-500">Document Name:</strong> {{ selectedItemDetailsDocs.document_name }}</li>
                            <li><strong class="text-teal-500">Action Taken:</strong> {{ selectedItemDetailsDocs.action_taken }}</li>
                        </ul>
                        <button class="mt-4 bg-gray-600 px-2 rounded text-white" @click="closeViewModal">
                            Close
                        </button>
                    </div>
                </div>
            </Teleport>
        </div>
    </div>
</template>
