<script setup lang="ts">
import { useSupplierStore } from "@/stores/inventory/suppliers"
const mainStore = useSupplierStore()
const items = defineModel({ required: true, type: Object, default: null })
const config = useRuntimeConfig()
const snackbar = useSnackbar()
const route = useRoute()
const boardLoading = ref(false)
const updateAttachmentIndex = ref(null)
const showModalAttachment = ref(false)
const headers = [
    { name: "Attachment" },
    { name: "Action" },
]
const addAttachment = () => {
    items.value.attachments.push(
        {
            attachment_name: null,
            file: null,
        }
    )
}
const removeUploadsAttachment = (index:any) => {
    updateAttachmentIndex.value = index
    showModalAttachment.value = true
}
const cancelDeleteAttachment = () => {
    showModalAttachment.value = false
}
const removePresentAttachment = (index:number) => {
    items.value.attachments.splice(index, 1)
}
const doDeleteAttachment = async () => {
    await mainStore.deleteAttachment(updateAttachmentIndex.value)
    if (mainStore.errorMessage !== "") {
        snackbar.add({
            type: "error",
            text: mainStore.errorMessage
        })
    } else {
        snackbar.add({
            type: "success",
            text: mainStore.successMessage
        })
    }
    showModalAttachment.value = false
    updateAttachmentIndex.value = null
}
const handleDocumentUpload = (event:any, data:any) => {
    try {
        const file = event.target.files[0]
        data.file = file
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}
const saveAttachment = async () => {
    try {
        const formData = new FormData()
        items.value.uploads.forEach((item:any, index:number) => {
            formData.append(`attachments[${index}][attachment_name]`, item.attachment_name)
            formData.append(`attachments[${index}][file]`, item.file)
        })
        let lengthAttachment = items.value.uploads.length
        items.value.attachments.forEach((item:any) => {
            lengthAttachment += 1
            items.value.uploads[lengthAttachment] = {
                attachment_name: item.attachment_name,
                file: item.file,
            }
        })
        if (route.query.key) {
            formData.append("request_supplier_id", route.query.key)
        }
        await mainStore.updateAttachments(formData)
        if (mainStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: mainStore.errorMessage
            })
        } else if (mainStore.successMessage !== "") {
            snackbar.add({
                type: "success",
                text: mainStore.successMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}
</script>
<template>
    <PsModal v-model:show-modal="showModalAttachment" :is-loading="boardLoading" title="Delete Attachment">
        <template #body>
            <div class="flex flex-col gap-4 justify-center items-center h-full mt-5">
                <div class="flex justify-center h-full">
                    <h2 class="text-lg">
                        Are your sure you want to delete the attachment?
                    </h2>
                </div>
                <div class="p-2 flex flex-row gap-4">
                    <button type="button" @click="doDeleteAttachment">
                        <Icon name="material-symbols:check" class="hover:border-green-600 bg-green-600 h-8 w-8 p-1 text-white" />
                    </button>
                    <button type="button" @click="cancelDeleteAttachment">
                        <Icon name="material-symbols:close" color="white" class="bg-red-500 rounded h-8 w-8 p-1 text-white" />
                    </button>
                </div>
            </div>
        </template>
    </PsModal>
    <div class="flex flex-row full gap-2">
        <label class="block mb-1 text-sm font-medium text-gray-900">Attachments:</label>
        <button type="button" class="px-3 py-1 bg-green-600 text-white text-xs font-bold" @click="addAttachment">
            Add
        </button>
    </div>
    <div class="pb-2 text-gray-500 overflow-x-auto mb-4">
        <table class="table-auto w-full border-collapse">
            <thead>
                <tr>
                    <th v-for="(dataHeader, index) in headers" :key="index" scope="col" class="p-2 border-0 border-b text-sm">
                        {{ dataHeader.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data, itemIndex in items.attachments" :key="data" class="border text-center">
                    <td class="p-3">
                        <div class="flex flex-row gap-4 justify-center items-start">
                            <LayoutFormPsSelect
                                v-model="items.attachments[itemIndex].attachment_name"
                                :options-list="[
                                    'BANK DETAILS',
                                    'CERTIFICATE OF REGISTRATION WITH SEC/DTI REGISTRATION',
                                    'CITY/MUNICIPAL PERMIT',
                                    'BIR 2303 CERTIFICATE OF REGISTRATION',
                                    'CERTIFICATE OF PRODUCT/MSDS',
                                    'CERTIFICATE OF DELEARSHIP/DISTRIBUTORSHIP',
                                    'DENR PERMITS',
                                    'TRADE TEST RESULTS',
                                    'PRICE LIST/QUOTATION',
                                    'OTHERS',
                                ]"
                                class="w-full"
                                title="Attachment Type"
                            />
                            <LayoutFormPsTextInput v-show="items.attachments[itemIndex].attachment_name == 'OTHERS'" v-model="items.attachments[itemIndex].other_type" class="w-full" title="File Name" />
                            <div class="w-full">
                                <label class="block mb-1 text-sm font-medium text-gray-900">
                                    File
                                </label>
                                <input
                                    class="w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    aria-describedby="file_input_help"
                                    type="file"
                                    accept=".doc, .docx, .pdf"
                                    placeholder="Please Specify Attachment Type"
                                    title="File"
                                    @change="handleDocumentUpload($event, items.attachments[itemIndex])"
                                >
                            </div>
                        </div>
                    </td>
                    <td>
                        <button type="button" @click="removePresentAttachment(itemIndex)">
                            <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-8 w-8 p-1" />
                        </button>
                    </td>
                </tr>
                <tr v-for="data, index in items.uploads" :key="index" class="border text-center">
                    <td class="p-3">
                        {{ items.uploads[index].attachment_name }}
                    </td>
                    <td class="p-2 flex gap-2 justify-center">
                        <div class="flex flex-row gap-2">
                            <a target="_blank" :href="config.public.INVENTORY_API_URL + items.uploads[index].file_location" class="block text-sm font-medium text-gray-100 text-center cursor-pointer border rounded">
                                <Icon name="mage:file-download-fill" class="hover:border-green-600 bg-green-600 h-8 w-8 p-1" />
                            </a>
                            <button type="button" @click="removeUploadsAttachment(index)">
                                <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-8 w-8 p-1" />
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="flex justify-end w-full">
        <button type="button" class="flex-1 text-white p-2 rounded-lg bg-teal-600 content-center mt-5 max-w-max" @click="saveAttachment">
            Save
        </button>
    </div>
</template>
